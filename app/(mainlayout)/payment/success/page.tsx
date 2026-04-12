"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPayment } from "@/lib/api/payment";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!sessionId) { setStatus("error"); return; }
    verifyPayment(sessionId)
      .then(result => setStatus(result.paid ? "success" : "error"))
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="size-10 animate-spin text-teal-400" />
      <p className="text-muted-foreground">Confirming your payment...</p>
    </div>
  );

  if (status === "error") return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <XCircle className="size-16 text-destructive" />
      <div>
        <h1 className="text-2xl font-bold mb-2">Payment Not Confirmed</h1>
        <p className="text-muted-foreground">We could not verify your payment. If you were charged, please contact support.</p>
      </div>
      <Button variant="outline" asChild><Link href="/pricing">Return to Pricing</Link></Button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center max-w-lg mx-auto">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-teal-500/10">
        <CheckCircle className="size-12 text-teal-400" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-3">You are all set!</h1>
        <p className="text-muted-foreground text-lg">Your Medical Exam UCAT subscription is now active. Full access for 12 months.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {[
          { label: "2,000+ Questions", desc: "Across all 5 subtests" },
          { label: "Unlimited Mocks", desc: "Full timed simulations" },
          { label: "Score Analytics", desc: "Track your progress" },
          { label: "12 Month Access", desc: "No recurring charges" },
        ].map(item => (
          <div key={item.label} className="rounded-xl border bg-muted/30 p-4 text-left">
            <p className="font-semibold text-teal-400">{item.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>
      <Button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold w-full h-11" asChild>
        <Link href="/explore">Start Practising Now</Link>
      </Button>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="size-10 animate-spin text-teal-400" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
