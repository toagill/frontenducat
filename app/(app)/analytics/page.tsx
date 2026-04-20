"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { examApi, getUser } from "@/lib/api";
import { BarChart3, BookOpen, Brain, Calculator, Eye, Users, Target, Trophy, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

const SUBTESTS = [
  { code: "VR",  name: "Verbal Reasoning",       color: "#1B4F72", icon: BookOpen    },
  { code: "DM",  name: "Decision Making",         color: "#117A65", icon: Brain       },
  { code: "QR",  name: "Quantitative Reasoning",  color: "#784212", icon: Calculator  },
  { code: "AR",  name: "Abstract Reasoning",      color: "#512E5F", icon: Eye         },
  { code: "SJT", name: "Situational Judgement",   color: "#922B21", icon: Users       },
];

export default function AnalyticsPage() {
  const router  = useRouter();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    examApi.results(20).then((r: any) => {
      setResults(r.data?.results || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const total   = results.length;
  const avgScore = total > 0 ? Math.round(results.reduce((s,r) => s+(r.totalCognitiveScore||0),0)/total) : 0;
  const best    = total > 0 ? Math.max(...results.map(r => r.totalCognitiveScore||0)) : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-teal-500" /> My Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          {user ? `${user.firstName}'s` : "Your"} UCAT performance overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Exams Taken", v: total,     icon: Target,      c: "#00A896" },
          { l: "Avg Score",   v: avgScore||"—", icon: Trophy,  c: "#F4A261" },
          { l: "Best Score",  v: best||"—", icon: TrendingUp,  c: "#16a34a" },
          { l: "Subtests",    v: 5,          icon: BookOpen,   c: "#1B4F72" },
        ].map(({ l, v, icon: Icon, c }) => (
          <div key={l} className="bg-card border rounded-xl p-5">
            <Icon className="h-5 w-5 mb-2" style={{ color: c }} />
            <p className="text-2xl font-bold" style={{ color: c }}>{v}</p>
            <p className="text-xs text-muted-foreground mt-1">{l}</p>
          </div>
        ))}
      </div>

      {/* Subtest performance */}
      <div>
        <h2 className="text-lg font-bold mb-4">Subtest Performance</h2>
        <div className="space-y-3">
          {SUBTESTS.map(s => {
            const subtestResults = results.filter(r => r.scores?.[s.code]);
            const latest = subtestResults[0]?.scores?.[s.code]?.scaled || 0;
            const attempts = subtestResults.length;
            return (
              <div key={s.code} className="bg-card border rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg text-white" style={{ backgroundColor: s.color }}>
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{attempts} attempt{attempts!==1?"s":""}</p>
                  </div>
                </div>
                {latest > 0 ? (
                  <div className="text-right">
                    <p className="text-xl font-bold" style={{ color: s.color }}>{latest}</p>
                    <p className="text-xs text-muted-foreground">Latest</p>
                  </div>
                ) : (
                  <Link href={`/practice/${s.code.toLowerCase()}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-current transition-colors hover:opacity-80"
                    style={{ color: s.color }}>
                    Practice Now
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent exams */}
      <div>
        <h2 className="text-lg font-bold mb-4">Recent Exams</h2>
        {loading ? (
          <div className="bg-card border rounded-xl p-8 text-center text-muted-foreground">Loading...</div>
        ) : results.length === 0 ? (
          <div className="bg-card border rounded-xl p-8 text-center">
            <Trophy className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
            <p className="font-semibold mb-1">No exams yet</p>
            <p className="text-sm text-muted-foreground mb-4">Complete a practice test to see your results</p>
            <Link href="/dashboard"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
              Start Practising
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r: any) => (
              <div key={r.resultId} className="bg-card border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm capitalize">
                    {r.examType==="full" ? "Full Mock Exam" : `${r.examType} Practice`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.timeCompleted).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}
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
        )}
      </div>
    </div>
  );
}
