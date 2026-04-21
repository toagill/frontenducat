"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentApi } from "@/lib/api";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessContent() {
  const params    = useSearchParams();
  const router    = useRouter();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState<"loading"|"success"|"error">("loading");

  useEffect(() => {
    if (!sessionId) { setStatus("error"); return; }
    paymentApi.verify(sessionId)
      .then((r: any) => setStatus(r.data?.paid ? "success" : "error"))
      .catch(() => setStatus("success"));
  }, [sessionId]);

  if (status === "loading") return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B1F3A] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
        <p className="text-gray-500 mb-6">Your annual subscription is now active. Check your email for confirmation.</p>
        <Link href="/dashboard" className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-colors">
          Start Practising →
        </Link>
      </div>
    </div>
  );
}
