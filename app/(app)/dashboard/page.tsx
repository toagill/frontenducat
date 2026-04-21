"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Brain, Calculator, Eye, Users, FileText, Clock, Zap, BarChart3, ChevronRight, AlertCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://iwav64juaj.execute-api.eu-west-2.amazonaws.com/prod/api";

const SUBTESTS = [
  { code:"vr",  name:"Verbal Reasoning",       color:"#1B4F72", icon:BookOpen,   q:44,  t:"22 min" },
  { code:"dm",  name:"Decision Making",         color:"#117A65", icon:Brain,      q:29,  t:"31 min" },
  { code:"qr",  name:"Quantitative Reasoning",  color:"#784212", icon:Calculator, q:36,  t:"25 min" },
  { code:"ar",  name:"Abstract Reasoning",      color:"#512E5F", icon:Eye,        q:50,  t:"12 min" },
  { code:"sjt", name:"Situational Judgement",   color:"#922B21", icon:Users,      q:69,  t:"26 min" },
];

export default function DashboardPage() {
  const [user, setUser]     = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem("medexam_user");
      if (u) setUser(JSON.parse(u));
      const token = localStorage.getItem("medexam_token");
      if (!token) return;
      fetch(`${API}/auth/status`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(r => setStatus(r.data)).catch(() => {});
      fetch(`${API}/exam/results?limit=5`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(r => setResults(r.data?.results || [])).catch(() => {});
    } catch {}
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}{user ? `, ${user.firstName}` : ""}! 👋</h1>
          <p className="text-gray-500 mt-1">Ready to ace your UCAT? Let us practise.</p>
        </div>
        <Link href="/practice/full-mock"
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          <FileText className="h-4 w-4" /> Start Full Mock
        </Link>
      </div>

      {/* Trial warning */}
      {status && !status.isSubscribed && status.isTrialActive && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-700 text-sm">Free Trial Active</p>
            <p className="text-sm text-gray-600 mt-0.5">
              You have <strong>{status.dailyQuestionsRemaining ?? 20} questions</strong> remaining today.
              Trial expires in <strong>{status.trialHoursLeft ?? 48}h</strong>.
            </p>
          </div>
          <Link href="/pricing" className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
            Upgrade
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:"Exams Taken",  value:results.length || 0,       color:"text-teal-500"   },
          { label:"Avg Score",    value:results.length > 0 ? Math.round(results.reduce((s,r)=>s+(r.totalCognitiveScore||0),0)/results.length) : "—", color:"text-yellow-500" },
          { label:"Questions",    value:results.length > 0 ? results.length * 44 : "—",    color:"text-blue-500"   },
          { label:"Best Score",   value:results.length > 0 ? Math.max(...results.map(r=>r.totalCognitiveScore||0)) : "—", color:"text-green-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Subtests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">UCAT Subtests</h2>
          <Link href="/practice/timed" className="text-sm text-teal-500 hover:underline flex items-center gap-1">
            Timed Practice <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBTESTS.map(s => (
            <Link key={s.code} href={`/practice/${s.code}`}
              className="group block bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg text-white" style={{backgroundColor:s.color}}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full text-white uppercase" style={{backgroundColor:s.color}}>
                  {s.code}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-1 text-gray-800">{s.name}</h3>
              <p className="text-xs text-gray-400">{s.q} questions · {s.t}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{color:s.color}}>
                Practice Now <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
          <Link href="/practice/full-mock"
            className="group block bg-[#0B1F3A] border border-[#0B1F3A] rounded-xl p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-teal-500 text-white"><FileText className="h-5 w-5" /></div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-teal-500 text-white">FULL</span>
            </div>
            <h3 className="font-semibold text-sm mb-1 text-white">Full Mock Exam</h3>
            <p className="text-xs text-white/50">228 questions · 2h 16min</p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-teal-400">
              Start Mock <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href:"/daily-challenge", icon:Zap,       label:"Daily Challenge",  desc:"Today's UCAT questions",         color:"bg-yellow-500" },
          { href:"/practice/timed",  icon:Clock,     label:"Timed Practice",   desc:"Practise under exam conditions", color:"bg-cyan-500"   },
          { href:"/analytics",       icon:BarChart3, label:"My Analytics",     desc:"Track your progress",            color:"bg-green-500"  },
        ].map(({ href, icon:Icon, label, desc, color }) => (
          <Link key={href} href={href}
            className="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all">
            <div className={`p-2.5 rounded-xl ${color} text-white flex-shrink-0`}><Icon className="h-5 w-5" /></div>
            <div>
              <p className="font-semibold text-sm text-gray-800">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-300 group-hover:text-teal-500 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
