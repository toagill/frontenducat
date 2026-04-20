"use client";
import { useRouter } from "next/navigation";
import { Clock, BookOpen, Brain, Calculator, Eye, Users, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SUBTESTS = [
  { code: "VR",  name: "Verbal Reasoning",       icon: <BookOpen className="size-6" />,    color: "#1B4F72", bg: "bg-blue-500/10",    border: "border-blue-500/30",   questions: 44, time: "22 min" },
  { code: "DM",  name: "Decision Making",         icon: <Brain className="size-6" />,        color: "#117A65", bg: "bg-green-500/10",   border: "border-green-500/30",  questions: 29, time: "31 min" },
  { code: "QR",  name: "Quantitative Reasoning",  icon: <Calculator className="size-6" />,   color: "#784212", bg: "bg-amber-500/10",   border: "border-amber-500/30",  questions: 36, time: "25 min" },
  { code: "AR",  name: "Abstract Reasoning",      icon: <Eye className="size-6" />,           color: "#512E5F", bg: "bg-purple-500/10",  border: "border-purple-500/30", questions: 50, time: "12 min" },
  { code: "SJT", name: "Situational Judgement",   icon: <Users className="size-6" />,         color: "#922B21", bg: "bg-red-500/10",     border: "border-red-500/30",    questions: 69, time: "26 min" },
];

export default function TimedPracticePage() {
  const router = useRouter();

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-teal-500/10">
            <Clock className="h-6 w-6 text-teal-500" />
          </div>
          <h1 className="text-3xl font-bold">Timed Practice</h1>
        </div>
        <p className="text-muted-foreground">
          Practise each UCAT subtest under real exam time conditions. Select a subtest to begin.
        </p>
      </div>

      {/* Subtest cards */}
      <div className="grid gap-4">
        {SUBTESTS.map((s) => (
          <Card
            key={s.code}
            className={`p-5 border-2 ${s.border} ${s.bg} hover:scale-[1.01] transition-all duration-200 cursor-pointer`}
            onClick={() => router.push(`/quiz/subtest-${s.code}/play`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl text-white" style={{ backgroundColor: s.color }}>
                  {s.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold">{s.name}</h2>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: s.color }}>
                      {s.code}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>📝 {s.questions} questions</span>
                    <span>⏱ {s.time}</span>
                    <span>🎯 Timed conditions</span>
                  </div>
                </div>
              </div>
              <Button
                className="text-white hidden sm:flex items-center gap-2"
                style={{ backgroundColor: s.color }}
                onClick={(e) => { e.stopPropagation(); router.push(`/quiz/subtest-${s.code}/play`); }}
              >
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 p-5 rounded-xl bg-muted/50 border">
        <h3 className="font-semibold mb-3 text-teal-500">⚡ Timed Practice Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Each subtest runs under real UCAT exam time conditions</li>
          <li>• You can navigate between questions and flag them for review</li>
          <li>• There is no negative marking — always attempt every question</li>
          <li>• Abstract Reasoning is the most time-pressured: ~14 seconds per question</li>
          <li>• Aim to complete at least 2 full timed practices per subtest before your exam</li>
        </ul>
      </div>
    </div>
  );
}
