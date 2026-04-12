"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Calculator, Eye, Users, Zap } from "lucide-react";

const subtests = [
  { name: "Verbal Reasoning", abbr: "VR", questions: 44, time: "22 min", icon: <BookOpen className="size-4" />, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { name: "Decision Making", abbr: "DM", questions: 29, time: "31 min", icon: <Brain className="size-4" />, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { name: "Quantitative Reasoning", abbr: "QR", questions: 36, time: "25 min", icon: <Calculator className="size-4" />, color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { name: "Abstract Reasoning", abbr: "AR", questions: 50, time: "12 min", icon: <Eye className="size-4" />, color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  { name: "Situational Judgement", abbr: "SJT", questions: 69, time: "26 min", icon: <Users className="size-4" />, color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-6 text-white md:p-10 xl:py-12">
      {/* Decorative blobs */}
      <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        {/* Left: headline */}
        <div className="max-w-xl space-y-5">
          <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30">
            🎓 UK's #1 UCAT Mock Exam Platform
          </Badge>

          <h1 className="text-3xl font-bold xl:text-5xl leading-tight tracking-tight">
            Ace Your UCAT.<br />
            <span className="text-teal-400">Get into Medical School.</span>
          </h1>

          <p className="text-base text-white/70 leading-relaxed">
            Realistic mock exams built to match the actual UCAT format. Practice all 5 subtests with full timed simulations, instant feedback, and detailed score analytics.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold" asChild>
              <Link href="/register">Start Free Trial <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="/explore">Browse Exams</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 pt-2 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><Zap className="size-4 text-teal-400" /> 2-day free trial</span>
            <span className="flex items-center gap-1.5"><BookOpen className="size-4 text-teal-400" /> 2,000+ questions</span>
            <span className="flex items-center gap-1.5"><Brain className="size-4 text-teal-400" /> Full UCAT format</span>
          </div>
        </div>

        {/* Right: subtest cards */}
        <div className="w-full md:max-w-xs space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">5 UCAT Subtests</p>
          {subtests.map((s) => (
            <div key={s.abbr} className={`flex items-center justify-between rounded-lg border px-4 py-3 ${s.color} bg-opacity-10`}>
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-7 h-7 rounded-md border ${s.color}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{s.abbr}</p>
                  <p className="text-xs text-white/50">{s.name}</p>
                </div>
              </div>
              <div className="text-right text-xs text-white/50">
                <p>{s.questions}Q</p>
                <p>{s.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Students Trained", value: "12,400+" },
          { label: "Practice Questions", value: "2,000+" },
          { label: "Avg Score Improvement", value: "+127pts" },
          { label: "Medical School Offers", value: "94%" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-bold text-teal-400">{stat.value}</p>
            <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
