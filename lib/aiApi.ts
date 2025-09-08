import { AI_BASE } from "./../constants/api";

export async function summarize(event: any) {
  const res = await fetch(`${AI_BASE}/ai/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: event }),
  });
  if (!res.ok) throw new Error("AI error");
  return res.json();
}

export async function insights(events: any[]) {
  const res = await fetch(`${AI_BASE}/ai/insights`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ events }),
  });
  if (!res.ok) throw new Error("AI error");
  return res.json();
}
