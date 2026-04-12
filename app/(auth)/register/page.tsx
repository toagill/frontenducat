"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Eye, EyeOff, Stethoscope, Zap, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/lib/api/auth";

const TRIAL_BENEFITS = [
  "Full access to all 5 UCAT subtests",
  "50 practice questions included",
  "1 complete timed mock exam",
  "Performance summary and analytics",
  "No credit card required",
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    try {
      await register(form);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden flex-col justify-center items-center p-12">
        <div className="relative z-10 max-w-md text-white">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-teal-400 text-lg">Medical Exam</div>
              <div className="text-xs text-white/50 uppercase tracking-widest font-semibold">UCAT</div>
            </div>
          </div>
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border border-teal-500/30 text-sm">
            <Zap className="size-3 mr-1" /> 2-Day Free Trial, No Card Needed
          </Badge>
          <h2 className="text-4xl font-bold mb-4 leading-tight">Everything you need to ace the UCAT.</h2>
          <p className="text-white/60 mb-8">Get instant access to 2,000+ questions, full timed simulations, and detailed feedback.</p>
          <div className="space-y-3">
            {TRIAL_BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                  <Check className="size-3 text-white" />
                </div>
                <span className="text-sm text-white/80">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 mb-1">After your trial, unlock everything for</p>
            <p className="text-3xl font-bold text-teal-400">19.99 <span className="text-lg font-normal text-white/60">GBP / year</span></p>
            <p className="text-xs text-white/40 mt-1">One-time payment, 365 days access, 7-day refund</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
            <CardDescription>Start your free 2-day trial, no card required</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="size-4 flex-shrink-0" />{error}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Alex" className="h-11" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Smith" className="h-11" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-11" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" className="h-11 pr-10" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 bg-teal-500 hover:bg-teal-600 text-white font-semibold mt-2">
                {loading ? <><Loader2 className="size-4 mr-2 animate-spin" />Creating account...</> : "Start Free Trial"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By creating an account you agree to our Terms of Service and Privacy Policy.
              </p>
              <p className="text-center text-sm text-muted-foreground pt-2 border-t">
                Already have an account? <Link href="/login" className="text-teal-500 font-semibold">Sign in</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
