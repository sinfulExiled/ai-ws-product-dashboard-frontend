import { API_BASE } from "../constants/api";

function token() {
  return typeof window !== "undefined"
    ? localStorage.getItem("auth_token")
    : null;
}

export async function apiRequest(path: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((opts.headers && typeof opts.headers === "object" && !Array.isArray(opts.headers) ? opts.headers : {}) as Record<string, string>),
  };

  console.log("API Request", path, opts);
  const t = token();
  if (t) headers["Authorization"] = `Bearer ${t}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("API error", res.status, body);
    throw new Error(body || `HTTP ${res.status}`);
  }
  return res.json();
}
