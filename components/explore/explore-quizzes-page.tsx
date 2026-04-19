"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Calculator, Clock, Eye, Users, Zap, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const UCAT_SUBTESTS = [
  {
    id: "VR",
    label: "Verbal Reasoning",
    icon: <BookOpen className="w-8 h-8" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    description: "Read passages and answer questions testing your ability to understand and evaluate written information.",
    questions: 44,
    time: "21 mins",
    playHref: "/quiz/subtest-VR/play",
  },
  {
    id: "DM",
    label: "Decision Making",
    icon: <Brain className="w-8 h-8" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    description: "Apply logic and reasoning to solve problems using statistical and non-statistical information.",
    questions: 29,
    time: "31 mins",
    playHref: "/quiz/subtest-DM/play",
  },
  {
    id: "QR",
    label: "Quantitative Reasoning",
    icon: <Calculator className="w-8 h-8" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    description: "Use numerical skills and data interpretation to solve problems under timed conditions.",
    questions: 36,
    time: "25 mins",
    playHref: "/quiz/subtest-QR/play",
  },
  {
    id: "AR",
    label: "Abstract Reasoning",
    icon: <Eye className="w-8 h-8" />,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    description: "Identify patterns and relationships between shapes and figures under strict time pressure.",
    questions: 55,
    time: "12 mins",
    playHref: "/quiz/subtest-AR/play",
  },
  {
    id: "SJT",
    label: "Situational Judgement",
    icon: <Users className="w-8 h-8" />,
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
    description: "Assess how to respond to real-world medical scenarios based on professional values and ethics.",
    questions: 69,
    time: "26 mins",
    playHref: "/quiz/subtest-SJT/play",
  },
];

const PRACTICE_MODES = [
  {
    id: "full",
    label: "Full Mock Exam",
    icon: <FileText className="w-6 h-6" />,
    description: "Simulate the real UCAT with all 5 subtests under timed conditions.",
    duration: "~2 hrs",
    href: "/battle",
    highlight: true,
  },
  {
    id: "timed",
    label: "Timed Practice",
    icon: <Clock className="w-6 h-6" />,
    description: "Practice individual subtests with a countdown timer to build speed.",
    duration: "Varies",
    href: "/tournaments",
    highlight: false,
  },
  {
    id: "daily",
    label: "Daily Challenge",
    icon: <Zap className="w-6 h-6" />,
    description: "A short set of questions refreshed every day to keep your skills sharp.",
    duration: "~10 mins",
    href: "/daily-challenge",
    highlight: false,
  },
];

export function ExploreQuizzesPage() {
  const searchParams = useSearchParams();
  const activeSubtest = searchParams.get("subtest");

  // If a subtest is selected, show it highlighted at the top
  const activeSubtestData = activeSubtest
    ? UCAT_SUBTESTS.find((s) => s.id === activeSubtest)
    : null;

  return (
    <div className="space-y-10 pb-10">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Mock Exams</h1>
        <p className="text-muted-foreground mt-1">Choose a subtest to practise or start a full mock exam</p>
      </div>

      {/* Active Subtest CTA — shown when navigating from sidebar */}
      {activeSubtestData && (
        <Card className={`border-2 ${activeSubtestData.bg}`}>
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className={activeSubtestData.color}>{activeSubtestData.icon}</span>
              <div>
                <p className={`text-xl font-bold ${activeSubtestData.color}`}>{activeSubtestData.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{activeSubtestData.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {activeSubtestData.questions} questions</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeSubtestData.time}</span>
                </div>
              </div>
            </div>
            <Link href={activeSubtestData.playHref}>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white whitespace-nowrap">
                Start {activeSubtestData.id} Practice <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Practice Modes */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Practice Modes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRACTICE_MODES.map((mode) => (
            <Link key={mode.id} href={mode.href}>
              <Card className={`h-full cursor-pointer transition-all hover:shadow-md hover:border-teal-500/50 ${mode.highlight ? "border-teal-500 bg-teal-500/5" : ""}`}>
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${mode.highlight ? "bg-teal-500/20 text-teal-400" : "bg-muted text-muted-foreground"}`}>
                      {mode.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">{mode.duration}</Badge>
                  </div>
                  <div>
                    <p className="font-semibold">{mode.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{mode.description}</p>
                  </div>
                  <Button size="sm" className={mode.highlight ? "bg-teal-500 hover:bg-teal-600 text-white mt-auto" : "mt-auto"} variant={mode.highlight ? "default" : "outline"}>
                    Start
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* UCAT Subtests */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Practise by Subtest</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {UCAT_SUBTESTS.map((subtest) => (
            <Card
              key={subtest.id}
              className={`h-full border transition-all hover:shadow-md hover:scale-[1.01] ${subtest.bg} ${activeSubtest === subtest.id ? "ring-2 ring-teal-500" : ""}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className={subtest.color}>{subtest.icon}</span>
                  <Badge variant="outline" className="text-xs font-bold">{subtest.id}</Badge>
                </div>
                <CardTitle className={`text-lg mt-2 ${subtest.color}`}>{subtest.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{subtest.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {subtest.questions} questions</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {subtest.time}</span>
                </div>
                <Link href={subtest.playHref}>
                  <Button size="sm" variant="outline" className="w-full hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-colors">
                    Start {subtest.id} Practice <ChevronRight className="ml-1 w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
