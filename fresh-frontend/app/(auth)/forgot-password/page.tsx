"use client";
import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";
import { Stethoscope, Loader2, Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await authApi.forgotPassword(email);
      setSent(true);
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
          {sent ? (
            <div className="text-center">
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
              <p className="text-gray-500 mb-6">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link. Check your spam folder if you don't see it.
              </p>
              <Link href="/login" className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-colors text-center">
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mx-auto mb-4">
                <Mail className="h-6 w-6 text-teal-500" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-1">Reset password</h2>
              <p className="text-gray-500 text-sm text-center mb-6">Enter your email and we'll send a reset link</p>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
                  <AlertCircle className="h-4 w-4" /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="you@example.com" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Send Reset Link
                </button>
              </form>

              <div className="text-center mt-4">
                <Link href="/login" className="text-sm text-gray-400 hover:text-gray-600">← Back to login</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
