"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stethoscope, Loader2, Eye, EyeOff, AlertCircle, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [needsVerify, setNeedsVerify] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "https://iwav64juaj.execute-api.eu-west-2.amazonaws.com/prod/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("medexam_token", data.data.token);
      localStorage.setItem("medexam_user", JSON.stringify(data.data.user));
      if (!data.data.emailVerified) { setNeedsVerify(true); setLoading(false); return; }
      router.push("/dashboard");
    } catch (err: any) { setError(err.message || "Login failed"); setLoading(false); }
  };

  const resend = async () => {
    setResending(true);
    try {
      await fetch(`${API}/auth/resend-verification`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      setResent(true);
    } catch {}
    setResending(false);
  };

  if (needsVerify) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3A] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
        <p className="text-gray-500 mb-6">We sent a verification link to <strong>{form.email}</strong>. Click the link to activate your account.</p>
        {resent ? (
          <p className="text-green-600 font-medium text-sm mb-4">✓ New verification email sent!</p>
        ) : (
          <button onClick={resend} disabled={resending}
            className="w-full border-2 border-teal-500 text-teal-600 font-semibold py-3 rounded-xl hover:bg-teal-50 transition-colors mb-3 flex items-center justify-center gap-2">
            {resending && <Loader2 className="h-4 w-4 animate-spin" />}
            Resend verification email
          </button>
        )}
        <button onClick={() => setNeedsVerify(false)} className="text-sm text-gray-400 hover:text-gray-600">← Back to login</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#0B1F3A]">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-teal-400">Medical Exam</div>
            <div className="text-xs text-white/60 uppercase tracking-widest">UCAT</div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">Welcome back.<br/>Keep practising.</h1>
          <p className="text-white/60 text-lg">Your UCAT preparation continues here.</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[["500+","Practice Questions"],["5","UCAT Subtests"],["Full","Mock Exams"],["Free","2-Day Trial"]].map(([v,l]) => (
              <div key={l} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold text-teal-400">{v}</p>
                <p className="text-sm text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/30 text-sm">© {new Date().getFullYear()} Medical Exam UCAT</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-teal-600">Medical Exam UCAT</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h2>
            <p className="text-gray-500 text-sm mb-6">
              No account? <Link href="/register" className="text-teal-600 font-semibold hover:underline">Start free trial</Link>
            </p>
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="you@example.com" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Link href="/forgot-password" className="text-xs text-teal-600 hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} required value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors pr-10"
                    placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
