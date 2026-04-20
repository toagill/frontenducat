"use client";
import { useState } from "react";
import { paymentApi } from "@/lib/api";
import { CheckCircle, Loader2, Stethoscope } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  "Unlimited practice questions",
  "All 5 UCAT subtests",
  "Full timed mock exams",
  "Detailed explanations",
  "Performance analytics",
  "Daily challenges",
  "12 months access",
  "Cancel anytime",
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleCheckout = async () => {
    setLoading(true); setError("");
    try {
      const res: any = await paymentApi.checkout();
      window.location.href = res.data.url;
    } catch (e: any) {
      setError(e.message || "Failed to start checkout");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center">
          <Stethoscope className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-teal-400 text-lg">Medical Exam UCAT</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Badge */}
        <div className="text-center mb-6">
          <span className="inline-block bg-teal-500/20 border border-teal-500/30 text-teal-400 text-sm font-semibold px-4 py-1.5 rounded-full">
            Most Popular
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-1">Annual Plan</h1>
            <p className="text-teal-100 mb-6">Full access for 12 months</p>
            <div className="flex items-end justify-center gap-1">
              <span className="text-6xl font-bold">£29</span>
              <div className="mb-2">
                <span className="text-2xl font-bold">.99</span>
                <p className="text-sm text-teal-100">/year</p>
              </div>
            </div>
            <p className="text-teal-100 text-sm mt-2">That's just £2.50/month</p>
          </div>

          <div className="p-8">
            <ul className="space-y-3 mb-8">
              {FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm text-center">
                {error}
              </div>
            )}

            <button onClick={handleCheckout} disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              Get Full Access — £29.99
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              Secure payment via Stripe · Cancel anytime
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/dashboard" className="text-white/60 hover:text-white text-sm transition-colors">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
