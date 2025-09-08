"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

export default function NotificationPanel() {
  const notifications = useSelector((s: RootState) => s.notifications.list);

  const [mounted, setMounted] = useState(false);
  const [clientTimes, setClientTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);

    const mapped: Record<string, string> = {};
    notifications.forEach((n) => {
      mapped[n.id] = new Date(n.timestamp).toLocaleString();
    });
    setClientTimes(mapped);
  }, [notifications]);

  if (!mounted) {
    return (
      <div className="bg-white p-4 rounded shadow max-h-96 overflow-y-auto">
        <h3 className="font-bold mb-2">Notifications</h3>
        <p className="text-sm text-gray-500">Loading notifications…</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-2">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-2 rounded ${
                n.type === "warning"
                  ? "bg-yellow-50"
                  : n.type === "ai_insight"
                  ? "bg-blue-50"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <div className="text-sm">{n.message}</div>
                  <div className="text-xs text-gray-500">
                    {clientTimes[n.id] || "…"}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="text-xs text-gray-600">Mark Read</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
