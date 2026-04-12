"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Calculator, Eye, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const subtestScores = [
  { name: "Verbal Reasoning", abbr: "VR", score: 680, max: 900, avg: 635, icon: <BookOpen className="size-4" />, color: "bg-blue-500", textColor: "text-blue-400" },
  { name: "Decision Making", abbr: "DM", score: 720, max: 900, avg: 620, icon: <Brain className="size-4" />, color: "bg-purple-500", textColor: "text-purple-400" },
  { name: "Quantitative R.", abbr: "QR", score: 650, max: 900, avg: 655, icon: <Calculator className="size-4" />, color: "bg-amber-500", textColor: "text-amber-400" },
  { name: "Abstract Reasoning", abbr: "AR", score: 710, max: 900, avg: 640, icon: <Eye className="size-4" />, color: "bg-rose-500", textColor: "text-rose-400" },
  { name: "Situational J.", abbr: "SJT", score: null, max: 4, avg: null, band: "Band 2", icon: <Users className="size-4" />, color: "bg-teal-500", textColor: "text-teal-400" },
];

const recentExams = [
  { name: "Full Mock Exam #3", date: "Today", score: 690, percentile: 72, duration: "2h 14m" },
  { name: "VR Practice Set 5", date: "Yesterday", score: 680, percentile: 68, duration: "22m" },
  { name: "Full Mock Exam #2", date: "3 days ago", score: 665, percentile: 61, duration: "2h 18m" },
];

export function UCATProgressSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* Score overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="size-4 text-teal-400" /> Your UCAT Scores
          </CardTitle>
          <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 text-xs">Latest Mock</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-2">
            <p className="text-5xl font-bold text-teal-400">2,760</p>
            <p className="text-sm text-muted-foreground mt-1">Total Cognitive Score (out of 3,600)</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs text-green-400 flex items-center gap-1"><TrendingUp className="size-3" /> +45 vs last attempt</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">72nd percentile</span>
            </div>
          </div>

          <div className="space-y-3">
            {subtestScores.map((s) => (
              <div key={s.abbr}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className={s.textColor}>{s.icon}</span>
                    <span className="font-medium">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {s.score ? (
                      <>
                        <span className="font-bold">{s.score}</span>
                        {s.avg && <span className="text-xs text-muted-foreground">avg: {s.avg}</span>}
                      </>
                    ) : (
                      <span className={`text-xs font-semibold ${s.textColor}`}>{s.band}</span>
                    )}
                  </div>
                </div>
                {s.score && (
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${(s.score / s.max) * 100}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/dashboard">Full Analytics <ArrowRight className="ml-2 size-4" /></Link>
          </Button>
        </CardContent>
      </Card>

      {/* Right column */}
      <div className="space-y-4">
        {/* Recent exams */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="size-4 text-teal-400" /> Recent Practice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentExams.map((e, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.date} · {e.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-teal-400">{e.score}</p>
                  <p className="text-xs text-muted-foreground">{e.percentile}th %ile</p>
                </div>
              </div>
            ))}
            <Button size="sm" className="w-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
              <Link href="/battle">Take New Exam <ArrowRight className="ml-2 size-3" /></Link>
            </Button>
          </CardContent>
        </Card>

        {/* Goal card */}
        <Card className="bg-gradient-to-br from-teal-500/10 to-transparent border-teal-500/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400">
                <Target className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">UCAT Exam Date</p>
                <p className="text-xs text-muted-foreground">Stay on track</p>
              </div>
            </div>
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3 text-center mb-3">
              <p className="text-2xl font-bold text-teal-400">47 days</p>
              <p className="text-xs text-muted-foreground">until your scheduled exam</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-center">
              <div className="bg-muted rounded-lg p-2">
                <p className="font-bold">14</p>
                <p className="text-muted-foreground">Exams taken</p>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <p className="font-bold">82%</p>
                <p className="text-muted-foreground">Questions correct</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
