"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Calculator, Eye, Stethoscope, Users, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
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
          <h2 className="text-4xl font-bold mb-4 leading-tight">Your UCAT success starts here.</h2>
          <p className="text-white/70 leading-relaxed mb-8">Join 12,000+ students preparing for UCAT with full-format mock exams, detailed analytics, and expert-crafted questions.</p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: <BookOpen className="size-4 text-blue-400" />, label: "Verbal Reasoning" },
              { icon: <Brain className="size-4 text-purple-400" />, label: "Decision Making" },
              { icon: <Calculator className="size-4 text-amber-400" />, label: "Quantitative R." },
              { icon: <Eye className="size-4 text-rose-400" />, label: "Abstract Reasoning" },
              { icon: <Users className="size-4 text-teal-400" />, label: "Situational J." },
              { icon: <Stethoscope className="size-4 text-green-400" />, label: "Full Simulations" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white/80">
                {item.icon} {item.label}
              </div>
            ))}
          </div>
          <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30">Free 2-day trial, no credit card needed</Badge>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your UCAT preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="size-4 flex-shrink-0" />{error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-11" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="password" className="h-11" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 bg-teal-500 hover:bg-teal-600 text-white font-semibold">
                {loading ? <><Loader2 className="size-4 mr-2 animate-spin" />Signing in...</> : "Sign In"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                No account? <Link href="/register" className="text-teal-500 font-semibold">Start free trial</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
