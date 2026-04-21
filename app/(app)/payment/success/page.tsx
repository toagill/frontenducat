import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PaymentSuccessContent from "./payment-success-content";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
