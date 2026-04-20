"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { Stethoscope, Loader2, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const params   = useSearchParams();
  const router   = useRouter();
  const token    = params.get("token") || "";
  const email    = params.get("email") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showP, setShowP]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters"); return; }
    setLoading(true); setError("");
    try {
      await authApi.resetPassword(email, token, password);
      setDone(true);
    } catch (err: any) { setError(err.message); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3A] p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-teal-400 text-lg">Medical Exam UCAT</span>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {done ? (
            <div className="text-center">
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Password reset!</h2>
              <p className="text-gray-500 mb-6">Your password has been updated successfully.</p>
              <Link href="/login" className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-colors text-center">
                Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-1">New password</h2>
              <p className="text-gray-500 text-sm mb-6">Choose a strong password for your account</p>
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
                  <AlertCircle className="h-4 w-4" /> {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                  <div className="relative">
                    <input type={showP?"text":"password"} required minLength={8} value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors pr-10"
                      placeholder="Min. 8 characters" />
                    <button type="button" onClick={() => setShowP(s=>!s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showP ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                  <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="Repeat password" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Reset Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
