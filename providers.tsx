"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { connectRealtime } from "./lib/realtime";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // connect realtime once
    const ws = connectRealtime();
    return () => ws && ws.close();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
