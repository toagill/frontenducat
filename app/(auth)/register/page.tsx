"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stethoscope, Loader2, Eye, EyeOff, AlertCircle, CheckCircle, Mail } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "https://iwav64juaj.execute-api.eu-west-2.amazonaws.com/prod/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("medexam_token", data.data.token);
      localStorage.setItem("medexam_user", JSON.stringify(data.data.user));
      setSuccess(true);
    } catch (err: any) { setError(err.message || "Registration failed"); setLoading(false); }
  };

  if (success) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3A] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <Mail className="h-14 w-14 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Check your inbox! 📬</h2>
        <p className="text-gray-500 mb-6">We sent a verification link to <strong>{form.email}</strong>. Click it to activate your account and start your free trial.</p>
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-left mb-6">
          <p className="text-sm font-semibold text-teal-700 mb-2">Your free trial includes:</p>
          <ul className="space-y-1 text-sm text-teal-600">
            {["20 practice questions per day","All 5 UCAT subtests","Full explanations for every answer","Performance analytics"].map(i => (
              <li key={i} className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />{i}</li>
            ))}
          </ul>
        </div>
        <button onClick={() => router.push("/dashboard")}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl text-sm transition-colors">
          Continue to Dashboard →
        </button>
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
          <h1 className="text-4xl font-bold leading-tight mb-4">Start your journey<br/>to medical school.</h1>
          <div className="space-y-3 mt-8">
            {["2-day free trial — no commitment","20 practice questions per day on trial","All 5 UCAT subtests covered","Full mock exams with scoring","Detailed explanations for every question"].map(t => (
              <div key={t} className="flex items-center gap-3">
                <span className="text-teal-400 font-bold">✓</span>
                <span className="text-white/80 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/30 text-sm">© {new Date().getFullYear()} Medical Exam UCAT</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-2 mb-4 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-teal-600">Medical Exam UCAT</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              🎓 2-Day Free Trial
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
            <p className="text-gray-500 text-sm mb-6">
              Already have an account? <Link href="/login" className="text-teal-600 font-semibold hover:underline">Sign in</Link>
            </p>
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />{error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input type="text" required value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                    placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input type="text" required value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                    placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} required minLength={8} value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 pr-10"
                    placeholder="Min. 8 characters" />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Start Free Trial
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
