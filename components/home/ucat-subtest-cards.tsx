import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Calculator, Clock, Eye, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const subtests = [
  {
    name: "Verbal Reasoning",
    abbr: "VR",
    icon: <BookOpen className="size-6" />,
    questions: 44,
    time: "22 min",
    score: "300–900",
    description: "Assess your ability to critically evaluate written information. 11 passages with 4 questions each.",
    topics: ["True/False/Can't Tell", "Reading Comprehension", "Critical Reasoning"],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    href: "/categories?subtest=vr",
  },
  {
    name: "Decision Making",
    abbr: "DM",
    icon: <Brain className="size-6" />,
    questions: 29,
    time: "31 min",
    score: "300–900",
    description: "Test your ability to make sound decisions using complex information. Includes syllogisms and statistical reasoning.",
    topics: ["Logical Reasoning", "Statistical Reasoning", "Syllogisms"],
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    href: "/categories?subtest=dm",
  },
  {
    name: "Quantitative Reasoning",
    abbr: "QR",
    icon: <Calculator className="size-6" />,
    questions: 36,
    time: "25 min",
    score: "300–900",
    description: "Evaluate your ability to solve problems using numerical information. No advanced maths required.",
    topics: ["Data Interpretation", "Numerical Problems", "Rate & Ratio"],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    href: "/categories?subtest=qr",
  },
  {
    name: "Abstract Reasoning",
    abbr: "AR",
    icon: <Eye className="size-6" />,
    questions: 50,
    time: "12 min",
    score: "300–900",
    description: "Assess your ability to identify patterns and relationships between shapes. The most time-pressured subtest.",
    topics: ["Set A / Set B", "Next Shape", "Shape Completion"],
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    href: "/categories?subtest=ar",
  },
  {
    name: "Situational Judgement",
    abbr: "SJT",
    icon: <Users className="size-6" />,
    questions: 69,
    time: "26 min",
    score: "Band 1–4",
    description: "Measure your capacity to understand real-world medical scenarios and identify appropriate responses.",
    topics: ["Appropriateness", "Importance Rating", "Clinical Scenarios"],
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    badge: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    href: "/categories?subtest=sjt",
  },
];

export function UCATSubtestCards() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">UCAT Subtests</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Practice each section individually or take a full mock exam</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/explore">View All Exams <ArrowRight className="ml-2 size-4" /></Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {subtests.map((s) => (
          <Card key={s.abbr} className={`border ${s.border} hover:shadow-md transition-shadow`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${s.bg} ${s.color}`}>
                  {s.icon}
                </div>
                <Badge className={`text-xs ${s.badge}`}>{s.abbr}</Badge>
              </div>
              <CardTitle className="text-base mt-3">{s.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>

              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><BookOpen className="size-3" /> {s.questions} questions</span>
                <span className="flex items-center gap-1"><Clock className="size-3" /> {s.time}</span>
                <span className={`font-semibold ${s.color}`}>{s.score}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {s.topics.map((t) => (
                  <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${s.bg} ${s.color} border ${s.border}`}>{t}</span>
                ))}
              </div>

              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link href={s.href}>Practice {s.abbr} <ArrowRight className="ml-2 size-3" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Full mock exam card */}
        <Card className="border-2 border-teal-500/40 bg-gradient-to-br from-teal-500/5 to-slate-900/50 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-500 text-white">
              <Clock className="size-5" />
            </div>
            <CardTitle className="text-base mt-3">Full Mock Exam</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sit a complete, timed UCAT mock exam replicating the real exam conditions. All 5 subtests. 2 hours.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen className="size-3" /> 228 questions</span>
              <span className="flex items-center gap-1"><Clock className="size-3" /> 2h 16min</span>
            </div>
            <div className="text-xs text-teal-400 font-semibold">Includes all 5 subtests</div>
            <Button size="sm" className="w-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
              <Link href="/battle">Start Full Mock <ArrowRight className="ml-2 size-3" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
