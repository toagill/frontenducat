// ─── Base API client ──────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("medexam_token");
}

export function setToken(token: string) {
  localStorage.setItem("medexam_token", token);
}

export function clearToken() {
  localStorage.removeItem("medexam_token");
  localStorage.removeItem("medexam_user");
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
  rawBody?: boolean;
}

export async function apiRequest<T = unknown>(
  path: string,
  { method = "GET", body, auth = true }: RequestOptions = {}
): Promise<{ success: boolean; data: T; message: string }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || `HTTP ${res.status}`);
  }

  return json;
}
