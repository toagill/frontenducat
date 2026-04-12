import { apiRequest, setToken, clearToken } from "./client";

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: number;
  trialExpiresAt: number;
  subscriptionStatus: "trial" | "active" | "expired";
  subscriptionExpiresAt: number | null;
  examsTaken: number;
  averageScore: number;
}

export interface AccountStatus {
  status: "trial" | "active" | "expired";
  isTrialActive: boolean;
  isSubscribed: boolean;
  trialHoursLeft: number;
  trialExpiresAt: number;
  subscriptionExpiresAt: number | null;
  canAccess: boolean;
}

export async function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{ token: string; user: User }> {
  const res = await apiRequest<{ token: string; user: User }>("/auth/register", {
    method: "POST",
    body: data,
    auth: false,
  });
  setToken(res.data.token);
  if (typeof window !== "undefined") {
    localStorage.setItem("medexam_user", JSON.stringify(res.data.user));
  }
  return res.data;
}

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await apiRequest<{ token: string; user: User }>("/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
  setToken(res.data.token);
  if (typeof window !== "undefined") {
    localStorage.setItem("medexam_user", JSON.stringify(res.data.user));
  }
  return res.data;
}

export async function logout() {
  clearToken();
  window.location.href = "/login";
}

export async function getMe(): Promise<{ user: User; status: AccountStatus }> {
  const res = await apiRequest<{ user: User; status: AccountStatus }>("/auth/me");
  return res.data;
}

export async function getAccountStatus(): Promise<AccountStatus> {
  const res = await apiRequest<AccountStatus>("/auth/status");
  return res.data;
}

export function getCachedUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("medexam_user");
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("medexam_token");
}
