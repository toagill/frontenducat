"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Brain, Calculator, Eye, Users, Clock, ArrowRight, Search, CheckCircle } from "lucide-react";
import Link from "next/link";

const subtests = [
  {
    id: "VR",
    name: "Verbal Reasoning",
    description: "Assess your ability to critically evaluate written information. Read passages and answer True, False or Can't Tell questions.",
    icon: <BookOpen className="size-8" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    questions: 44,
    time: "22 min",
    score: "300-900",
    difficulty: "Hard",
    topics: ["True / False / Can't Tell", "Reading Comprehension", "Critical Reasoning", "Inference"],
    tips: "Most time-pressured subtest. Aim for under 30 seconds per question.",
    href: "/explore?subtest=VR",
  },
  {
    id: "DM",
    name: "Decision Making",
    description: "Test your ability to make sound decisions using complex information including syllogisms, statistical reasoning and logic.",
    icon: <Brain className="size-8" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    questions: 29,
    time: "31 min",
    score: "300-900",
    difficulty: "Hard",
    topics: ["Syllogisms", "Statistical Reasoning", "Logical Puzzles", "Venn Diagrams"],
    tips: "Read all information carefully before selecting your answer.",
    href: "/explore?subtest=DM",
  },
  {
    id: "QR",
    name: "Quantitative Reasoning",
    description: "Evaluate your ability to solve numerical problems. No advanced maths required — focus on data interpretation and problem solving.",
    icon: <Calculator className="size-8" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    questions: 36,
    time: "25 min",
    score: "300-900",
    difficulty: "Medium",
    topics: ["Data Interpretation", "Rate & Ratio", "Percentages", "Unit Conversions"],
    tips: "Use the on-screen calculator. Always check units in your answer.",
    href: "/explore?subtest=QR",
  },
  {
    id: "AR",
    name: "Abstract Reasoning",
    description: "Assess your ability to identify patterns and relationships between shapes. The fastest-paced subtest with only 14 seconds per question.",
    icon: <Eye className="size-8" />,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    questions: 50,
    time: "12 min",
    score: "300-900",
    difficulty: "Medium",
    topics: ["Set A / Set B", "Next Shape", "Shape Completion", "Pattern Recognition"],
    tips: "Check number, size, colour, position and orientation of shapes.",
    href: "/explore?subtest=AR",
  },
  {
    id: "SJT",
    name: "Situational Judgement",
    description: "Measure your capacity to understand real-world medical scenarios and identify the most appropriate responses.",
    icon: <Users className="size-8" />,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    badge: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    questions: 69,
    time: "26 min",
    score: "Band 1-4",
    difficulty: "Medium",
    topics: ["Appropriateness Rating", "Importance Rating", "Clinical Ethics", "Teamwork Scenarios"],
    tips: "Band 1 is highest. Focus on patient safety and professional integrity.",
    href: "/explore?subtest=SJT",
  },
];

const stats = [
  { label: "Total Questions", value: "228" },
  { label: "Total Time", value: "2h 16m" },
  { label: "Score Range", value: "300-900" },
  { label: "Subtests", value: "5" },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = subtests.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.topics.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-6 md:p-10 text-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative z-10">
          <Badge className="mb-4 bg-teal-500/20 text-teal-300 border border-teal-500/30">UCAT Subtests</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Browse All Subtests</h1>
          <p className="text-white/60 max-w-xl mb-6">Practice each UCAT subtest individually or take a full timed mock exam. All questions are written to match the real UCAT format.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-teal-400">{s.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search subtests or topics..."
          className="pl-10 h-11"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Subtest cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(s => (
          <Card key={s.id} className={`border ${s.border} hover:shadow-lg transition-all`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${s.bg} ${s.color}`}>
                  {s.icon}
                </div>
                <Badge className={`text-xs ${s.badge}`}>{s.id}</Badge>
              </div>
              <CardTitle className="text-lg mt-3">{s.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>

              {/* Stats row */}
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="size-3" /> {s.questions} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" /> {s.time}
                </span>
                <span className={`font-semibold ${s.color}`}>{s.score}</span>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5">
                {s.topics.map(t => (
                  <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${s.bg} ${s.color} border ${s.border}`}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Tip */}
              <div className="flex items-start gap-2 bg-muted/50 rounded-lg p-3">
                <CheckCircle className={`size-4 mt-0.5 flex-shrink-0 ${s.color}`} />
                <p className="text-xs text-muted-foreground">{s.tips}</p>
              </div>

              <Button size="sm" className="w-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
                <Link href={s.href}>
                  Practice {s.id} <ArrowRight className="ml-2 size-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full mock exam CTA */}
      <div className="rounded-xl bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready for the Full Exam?</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Take a complete timed UCAT mock exam with all 5 subtests. 228 questions. 2 hours 16 minutes. Mirrors real exam conditions.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold" asChild>
            <Link href="/battle">Start Full Mock Exam <ArrowRight className="ml-2 size-4" /></Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/explore">Browse Individual Questions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
