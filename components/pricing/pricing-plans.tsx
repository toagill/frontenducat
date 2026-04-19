"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { redirectToCheckout } from "@/lib/api/payment";
import { isLoggedIn } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const FREE_FEATURES = [
  "2-day full access trial",
  "All 5 UCAT subtests",
  "50 practice questions",
  "Basic performance summary",
  "1 timed mock exam",
  "Card required — cancel before 2 days to pay nothing",
];

const PRO_FEATURES = [
  "Full 12-month access",
  "2,000+ UCAT questions",
  "Unlimited mock exams",
  "Full timed exam simulator",
  "Detailed subtest analytics",
  "Score percentile tracking",
  "Worked solutions and explanations",
  "Progress over time charts",
  "Leaderboard access",
  "Email support",
];

export function PricingPlans() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpgrade() {
    if (!isLoggedIn()) { router.push("/register?plan=annual"); return; }
    setLoading(true);
    try {
      await redirectToCheckout();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <section className="py-10 xl:py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-teal-500/10 text-teal-400 border-teal-500/20">Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Start free for 2 days — card required, cancel anytime before the trial ends. Then just £29.99 for a full year of unlimited UCAT preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="relative flex flex-col border-2 border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-5 text-amber-400" />
                <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Free Trial</span>
              </div>
              <CardTitle className="text-3xl font-bold">Free</CardTitle>
              <p className="text-muted-foreground text-sm">2-day full access — card required to start</p>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Check className="size-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/register?plan=trial">Start Free Trial — Card Required</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative flex flex-col border-2 border-teal-500 shadow-xl shadow-teal-500/10">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="bg-teal-500 text-white border-0 px-4 py-1 text-sm">
                <Star className="size-3 mr-1" /> Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="size-5 text-teal-400" />
                <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Annual Plan</span>
              </div>
              <div className="flex items-baseline gap-2">
                <CardTitle className="text-4xl font-bold">£29.99</CardTitle>
                <span className="text-muted-foreground text-sm">/ year</span>
              </div>
              <p className="text-muted-foreground text-sm">One-time payment, 12 months full access</p>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              {PRO_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Check className="size-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold">
                {loading ? <><Loader2 className="size-4 mr-2 animate-spin" />Redirecting to checkout...</> : "Get Full Access"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-full text-sm text-muted-foreground">
            Secure payment via Stripe · 7-day money-back guarantee · Instant access
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-1">Do I need a card for the trial?</p>
            <p>Yes. A card is required to start the 2-day free trial. You will not be charged if you cancel before the trial ends.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Is it a one-time payment?</p>
            <p>Yes. £29.99 gives you 365 days of full access. No recurring charges, no hidden fees.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">What if I am not satisfied?</p>
            <p>Email us within 7 days of payment for a full refund, no questions asked.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
