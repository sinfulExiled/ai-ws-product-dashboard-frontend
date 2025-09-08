"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/modules/auth/auth.slice";

export default function Navbar() {
  const auth = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold">Product Management</div>
      <div className="flex gap-4 items-center">
        <Link href="/analytics">Analytics</Link>
        {auth.token ? (
          <>
            <span className="text-sm">{auth.user?.email || "seller"}</span>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
