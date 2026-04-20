"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, Brain, Calculator, Eye, Users, Trophy, Clock, Target } from "lucide-react";

export const dynamic = "force-dynamic";

interface Result {
  resultId: string;
  examType: string;
  scores: Record<string, { scaled?: number; band?: number; correct: number; attempted: number; total: number }>;
  totalCognitiveScore: number;
  timeStarted: number;
  timeCompleted: number;
  durationMinutes: number;
}

const SUBTEST_CONFIG: Record<string, { name: string; color: string; icon: JSX.Element }> = {
  VR:  { name: "Verbal Reasoning",       color: "#1B4F72", icon: <BookOpen className="size-4" />    },
  DM:  { name: "Decision Making",        color: "#117A65", icon: <Brain className="size-4" />        },
  QR:  { name: "Quantitative Reasoning", color: "#784212", icon: <Calculator className="size-4" />   },
  AR:  { name: "Abstract Reasoning",     color: "#512E5F", icon: <Eye className="size-4" />           },
  SJT: { name: "Situational Judgement",  color: "#922B21", icon: <Users className="size-4" />         },
};

export default function AnalyticsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("medexam_token");
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const res = await fetch(`${base}/exam/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data.data?.results || []);
        }
      } catch {}
      finally { setLoading(false); }
    };
    fetchResults();
  }, []);

  const totalExams = results.length;
  const avgScore = totalExams > 0
    ? Math.round(results.reduce((sum, r) => sum + (r.totalCognitiveScore || 0), 0) / totalExams)
    : 0;

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("medexam_user") || "{}")
    : {};

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-teal-500/10">
          <BarChart3 className="h-6 w-6 text-teal-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Analytics</h1>
          <p className="text-muted-foreground text-sm">
            {user.firstName ? `Welcome back, ${user.firstName}` : "Track your UCAT progress"}
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Exams Taken",    value: totalExams,           icon: <Target className="h-5 w-5" />,  color: "#00A896" },
          { label: "Avg Score",      value: avgScore || "—",      icon: <Trophy className="h-5 w-5" />,  color: "#F4A261" },
          { label: "Questions Done", value: user.examsTaken ? user.examsTaken * 44 : 0, icon: <BookOpen className="h-5 w-5" />, color: "#1B4F72" },
          { label: "Study Streak",   value: "—",                  icon: <Clock className="h-5 w-5" />,   color: "#922B21" },
        ].map(({ label, value, icon, color }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center gap-2 mb-2" style={{ color }}>
              {icon}
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
            </div>
            <p className="text-3xl font-bold">{value}</p>
          </Card>
        ))}
      </div>

      {/* Subtest breakdown */}
      <h2 className="text-lg font-bold mb-4">Subtest Performance</h2>
      <div className="grid gap-3 mb-8">
        {Object.entries(SUBTEST_CONFIG).map(([code, config]) => {
          const subtestResults = results.filter(r => r.scores?.[code]);
          const latestScore = subtestResults.length > 0
            ? subtestResults[0].scores[code]?.scaled || 0 : 0;
          const attempts = subtestResults.length;

          return (
            <Card key={code} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg text-white" style={{ backgroundColor: config.color }}>
                    {config.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{config.name}</p>
                    <p className="text-xs text-muted-foreground">{attempts} attempt{attempts !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="text-right">
                  {latestScore > 0 ? (
                    <>
                      <p className="text-2xl font-bold" style={{ color: config.color }}>{latestScore}</p>
                      <p className="text-xs text-muted-foreground">Latest score</p>
                    </>
                  ) : (
                    <Button size="sm" variant="outline"
                      onClick={() => router.push(`/quiz/subtest-${code}/play`)}>
                      Practice Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent exams */}
      <h2 className="text-lg font-bold mb-4">Recent Exams</h2>
      {loading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading results...</Card>
      ) : results.length === 0 ? (
        <Card className="p-8 text-center">
          <Trophy className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
          <p className="font-semibold mb-1">No exams yet</p>
          <p className="text-sm text-muted-foreground mb-4">Complete a practice test to see your results here</p>
          <Button onClick={() => router.push("/explore")} className="bg-teal-500 hover:bg-teal-600 text-white">
            Start Practising
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {results.slice(0, 10).map((r) => (
            <Card key={r.resultId} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold capitalize">{r.examType === "full" ? "Full Mock Exam" : `${r.examType} Practice`}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.timeCompleted).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}
                    {" · "}{r.durationMinutes} min
                  </p>
                </div>
                {r.totalCognitiveScore > 0 && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-teal-500">{r.totalCognitiveScore}</p>
                    <p className="text-xs text-muted-foreground">Total score</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
