const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("medexam_token");
}
export function setToken(t: string) { localStorage.setItem("medexam_token", t); }
export function clearToken() {
  localStorage.removeItem("medexam_token");
  localStorage.removeItem("medexam_user");
}
export function getUser() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem("medexam_user") || "null"); } catch { return null; }
}
export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("medexam_token");
}

export async function api<T = unknown>(
  path: string,
  { method = "GET", body, auth = true }: { method?: string; body?: unknown; auth?: boolean } = {}
): Promise<{ success: boolean; data: T; message: string }> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) { const t = getToken(); if (t) headers["Authorization"] = `Bearer ${t}`; }
  const res = await fetch(`${BASE_URL}${path}`, {
    method, headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
  return json;
}

// Auth
export const authApi = {
  register: (d: { firstName: string; lastName: string; email: string; password: string }) =>
    api("/auth/register", { method: "POST", body: d, auth: false }),
  login: (email: string, password: string) =>
    api("/auth/login", { method: "POST", body: { email, password }, auth: false }),
  me: () => api("/auth/me"),
  status: () => api("/auth/status"),
  verifyEmail: (token: string, email: string) =>
    api(`/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`, { auth: false }),
  resendVerification: (email: string) =>
    api("/auth/resend-verification", { method: "POST", body: { email }, auth: false }),
  forgotPassword: (email: string) =>
    api("/auth/forgot-password", { method: "POST", body: { email }, auth: false }),
  resetPassword: (email: string, token: string, newPassword: string) =>
    api("/auth/reset-password", { method: "POST", body: { email, token, newPassword }, auth: false }),
};

// Exam
export const examApi = {
  questions: (subtest: string, limit?: number) =>
    api(`/exam/questions/${subtest}${limit ? `?limit=${limit}` : ""}`),
  startSession: (examType: string) =>
    api("/exam/session", { method: "POST", body: { examType } }),
  submit: (sessionId: string, answers: Record<string, Record<string, string>>) =>
    api(`/exam/submit/${sessionId}`, { method: "POST", body: { answers } }),
  results: (limit = 20) => api(`/exam/results?limit=${limit}`),
};

// Payment
export const paymentApi = {
  checkout: () => api("/payment/checkout", { method: "POST" }),
  portal: () => api("/payment/portal", { method: "POST" }),
  verify: (sessionId: string) => api(`/payment/verify/${sessionId}`),
};
