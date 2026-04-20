"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, getUser } from "@/lib/api";
import { BookOpen, Brain, Calculator, Eye, Users, FileText, Clock, Zap, ChevronRight, Trophy, Target, TrendingUp, AlertCircle } from "lucide-react";

const SUBTESTS = [
  { code: "VR",  name: "Verbal Reasoning",       color: "#1B4F72", bg: "bg-blue-500/10",    border: "border-blue-500/20",   icon: BookOpen,    q: 44,  t: "22 min" },
  { code: "DM",  name: "Decision Making",         color: "#117A65", bg: "bg-green-500/10",   border: "border-green-500/20",  icon: Brain,       q: 29,  t: "31 min" },
  { code: "QR",  name: "Quantitative Reasoning",  color: "#784212", bg: "bg-amber-500/10",   border: "border-amber-500/20",  icon: Calculator,  q: 36,  t: "25 min" },
  { code: "AR",  name: "Abstract Reasoning",      color: "#512E5F", bg: "bg-purple-500/10",  border: "border-purple-500/20", icon: Eye,         q: 50,  t: "12 min" },
  { code: "SJT", name: "Situational Judgement",   color: "#922B21", bg: "bg-red-500/10",     border: "border-red-500/20",    icon: Users,       q: 69,  t: "26 min" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser]     = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    setUser(getUser());
    api("/auth/status").then((r: any) => setStatus(r.data)).catch(() => {});
    api("/exam/results?limit=5").then((r: any) => setResults(r.data?.results || [])).catch(() => {});
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">

      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{greeting}{user ? `, ${user.firstName}` : ""}! 👋</h1>
          <p className="text-muted-foreground mt-1">Ready to ace your UCAT? Let's practise.</p>
        </div>
        <Link href="/quiz/full-mock"
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
          <FileText className="h-4 w-4" /> Start Full Mock
        </Link>
      </div>

      {/* Trial warning */}
      {status && !status.isSubscribed && status.isTrialActive && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-600 text-sm">Free Trial Active</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              You have <strong>{status.dailyQuestionsRemaining ?? 20} questions</strong> remaining today.
              Trial expires in <strong>{status.trialHoursLeft}h</strong>.
            </p>
          </div>
          <Link href="/pricing"
            className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
            Upgrade
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Exams Taken",    value: results.length,                                icon: Target,     color: "text-teal-500"   },
          { label: "Avg Score",      value: results.length > 0 ? Math.round(results.reduce((s,r) => s + (r.totalCognitiveScore||0), 0) / results.length) : "—", icon: Trophy, color: "text-yellow-500" },
          { label: "Questions Done", value: results.length * 44 || "—",                   icon: BookOpen,   color: "text-blue-500"   },
          { label: "Best Score",     value: results.length > 0 ? Math.max(...results.map(r => r.totalCognitiveScore||0)) : "—", icon: TrendingUp, color: "text-green-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border rounded-xl p-4">
            <div className={`${color} mb-2`}><Icon className="h-5 w-5" /></div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* UCAT Subtests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">UCAT Subtests</h2>
          <Link href="/practice/timed" className="text-sm text-teal-500 hover:underline flex items-center gap-1">
            Timed Practice <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBTESTS.map(s => (
            <Link key={s.code} href={`/practice/${s.code.toLowerCase()}`}
              className={`group block bg-card border-2 ${s.border} ${s.bg} rounded-xl p-5 hover:scale-[1.02] transition-all duration-200`}>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg text-white" style={{ backgroundColor: s.color }}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: s.color }}>
                  {s.code}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-1">{s.name}</h3>
              <p className="text-xs text-muted-foreground">{s.q} questions · {s.t}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: s.color }}>
                Practice Now <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}

          {/* Full Mock Card */}
          <Link href="/quiz/full-mock"
            className="group block bg-card border-2 border-teal-500/30 bg-teal-500/5 rounded-xl p-5 hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-teal-500 text-white">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-teal-500 text-white">FULL</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">Full Mock Exam</h3>
            <p className="text-xs text-muted-foreground">228 questions · 2h 16min</p>
            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-teal-500">
              Start Mock <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href: "/daily-challenge", icon: Zap,   label: "Daily Challenge",  desc: "Today's UCAT questions",          color: "bg-yellow-500" },
          { href: "/practice/timed",  icon: Clock,  label: "Timed Practice",   desc: "Practise under exam conditions",  color: "bg-cyan-500"   },
          { href: "/analytics",       icon: TrendingUp, label: "My Analytics", desc: "Track your progress",             color: "bg-green-500"  },
        ].map(({ href, icon: Icon, label, desc, color }) => (
          <Link key={href} href={href}
            className="group flex items-center gap-4 bg-card border rounded-xl p-4 hover:border-teal-500/50 transition-all">
            <div className={`p-2.5 rounded-xl ${color} text-white flex-shrink-0`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-teal-500 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Recent results */}
      {results.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Recent Results</h2>
          <div className="space-y-3">
            {results.slice(0, 3).map((r: any) => (
              <div key={r.resultId} className="bg-card border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm capitalize">
                    {r.examType === "full" ? "Full Mock Exam" : `${r.examType} Practice`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.timeCompleted).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    {" · "}{r.durationMinutes}min
                  </p>
                </div>
                {r.totalCognitiveScore > 0 && (
                  <div className="text-right">
                    <p className="text-xl font-bold text-teal-500">{r.totalCognitiveScore}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
