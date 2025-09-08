"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/modules/auth/auth.slice";
import { RootState } from "../../store";

export default function LoginForm() {
  const dispatch = useDispatch();
  const auth = useSelector((s: RootState) => s.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (e: any) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };
  return (
    <div className="flex flex-col items-center mt-16">
      <form onSubmit={submit} className="w-80 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Login</h3>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 mb-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border p-2 mb-4"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          {auth.loading ? "Logging..." : "Login"}
        </button>
        {auth.error && <div className="text-red-600 mt-2">{auth.error}</div>}
      </form>
    </div>
  );
}
