"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token  = params.get("token");
  const email  = params.get("email");
  const [status, setStatus]     = useState<"loading"|"success"|"error"|"resent">("loading");
  const [message, setMessage]   = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token || !email) { setStatus("error"); setMessage("Invalid verification link."); return; }
    authApi.verifyEmail(token, email)
      .then((r: any) => { setStatus("success"); setMessage(r.message || "Email verified!"); })
      .catch((e: any) => { setStatus("error"); setMessage(e.message || "Verification failed."); });
  }, [token, email]);

  const resend = async () => {
    if (!email) return;
    setResending(true);
    try { await authApi.resendVerification(email); setStatus("resent"); } catch {}
    setResending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3A] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-14 w-14 animate-spin text-teal-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold">Verifying your email...</h2>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Email Verified! 🎉</h2>
            <p className="text-gray-500 mb-6">{message}</p>
            <Link href="/dashboard" className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-colors">
              Start Practising →
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
            <p className="text-gray-500 mb-6">{message}</p>
            {email && (
              <button onClick={resend} disabled={resending}
                className="w-full border-2 border-teal-500 text-teal-600 font-semibold py-3 rounded-xl hover:bg-teal-50 transition-colors mb-3 flex items-center justify-center gap-2">
                {resending && <Loader2 className="h-4 w-4 animate-spin" />}
                <Mail className="h-4 w-4" /> Resend verification email
              </button>
            )}
            <Link href="/login" className="text-sm text-gray-400 hover:text-gray-600">← Back to login</Link>
          </>
        )}
        {status === "resent" && (
          <>
            <Mail className="h-14 w-14 text-teal-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Email Sent!</h2>
            <p className="text-gray-500 mb-6">Check your inbox at <strong>{email}</strong></p>
            <Link href="/login" className="block w-full border border-gray-200 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors text-sm">
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
