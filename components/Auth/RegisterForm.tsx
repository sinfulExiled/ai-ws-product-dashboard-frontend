"use client";
import { useState } from "react";

export default function RegisterForm(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const submit = async (e:any) => {
    e.preventDefault();
    await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002") + "/auth/register", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ email, password })});
    alert("Registered (demo). Now login.");
  };
  return (
    <div className="flex flex-col items-center mt-16">
      <form onSubmit={submit} className="w-80 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Register</h3>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 mb-2" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 mb-4" />
        <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
