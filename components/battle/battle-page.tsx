"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Calculator, Clock, Eye, Users, FileText, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SUBTESTS = [
  { id: "VR", label: "Verbal Reasoning",        icon: <BookOpen className="w-5 h-5" />,    color: "text-blue-400",   questions: 44, time: "21 mins" },
  { id: "DM", label: "Decision Making",          icon: <Brain className="w-5 h-5" />,       color: "text-purple-400", questions: 29, time: "31 mins" },
  { id: "QR", label: "Quantitative Reasoning",   icon: <Calculator className="w-5 h-5" />,  color: "text-amber-400",  questions: 36, time: "25 mins" },
  { id: "AR", label: "Abstract Reasoning",       icon: <Eye className="w-5 h-5" />,         color: "text-rose-400",   questions: 55, time: "12 mins" },
  { id: "SJT", label: "Situational Judgement",   icon: <Users className="w-5 h-5" />,       color: "text-teal-400",   questions: 69, time: "26 mins" },
];

export function BattlePage() {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 mx-auto">
          <FileText className="w-8 h-8 text-teal-400" />
        </div>
        <h1 className="text-3xl font-bold">Starting Full Mock Exam</h1>
        <p className="text-muted-foreground">Your exam is being prepared. All 5 subtests will be loaded in timed conditions.</p>
        <Link href="/quiz/full-mock/play">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8">
            Begin Exam <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
        <Button variant="outline" onClick={() => setConfirmed(false)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Full Mock Exam</h1>
        <p className="text-muted-foreground mt-1">Simulate the real UCAT under timed conditions across all 5 subtests</p>
      </div>

      {/* Warning */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="flex items-start gap-3 p-4">
          <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-400">Before you start</p>
            <p className="text-sm text-muted-foreground mt-1">This exam takes approximately 2 hours. Make sure you are in a quiet environment with no interruptions. The timer cannot be paused once started.</p>
          </div>
        </CardContent>
      </Card>

      {/* Exam Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            Exam Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {SUBTESTS.map((s) => (
            <div key={s.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <span className={s.color}>{s.icon}</span>
                <span className="font-medium">{s.label}</span>
                <Badge variant="outline" className="text-xs">{s.id}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> {s.questions}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {s.time}
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-2 font-semibold">
            <span>Total</span>
            <span className="flex items-center gap-4">
              <span>233 questions</span>
              <span>~2 hrs</span>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => setConfirmed(true)}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white h-12 text-base font-semibold"
        >
          Start Full Mock Exam
        </Button>
        <Link href="/explore" className="flex-1">
          <Button variant="outline" className="w-full h-12">
            Practise a Single Subtest
          </Button>
        </Link>
      </div>

    </div>
  );
}
