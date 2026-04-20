"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { examApi } from "@/lib/api";
import { Zap, Clock, CheckCircle, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";

const SUBTESTS: Record<number, { code: string; name: string; color: string }> = {
  0: { code: "SJT", name: "Situational Judgement", color: "#922B21" },
  1: { code: "VR",  name: "Verbal Reasoning",       color: "#1B4F72" },
  2: { code: "DM",  name: "Decision Making",         color: "#117A65" },
  3: { code: "QR",  name: "Quantitative Reasoning",  color: "#784212" },
  4: { code: "AR",  name: "Abstract Reasoning",      color: "#512E5F" },
  5: { code: "SJT", name: "Situational Judgement",   color: "#922B21" },
  6: { code: "VR",  name: "Verbal Reasoning",        color: "#1B4F72" },
};

function getMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

interface Q { questionId: string; subtest: string; difficulty: string; passage?: string; question: string; options: string[]; }

export default function DailyChallengePage() {
  const router   = useRouter();
  const today    = SUBTESTS[new Date().getDay()];
  const [qs, setQs]         = useState<Q[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");
  const [idx, setIdx]       = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(getMidnight());
  const [done, setDone]     = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => {
    const todayStr = new Date().toDateString();
    if (localStorage.getItem("daily_challenge_date") === todayStr) {
      setAlreadyDone(true); setLoading(false); return;
    }
    examApi.questions(today.code, 10).then((r: any) => {
      const list = (r.data?.questions || []).slice(0, 10);
      if (!list.length) throw new Error("No questions found");
      setQs(list); setLoading(false);
    }).catch((e: any) => { setError(e.message); setLoading(false); });
  }, [today.code]);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getMidnight()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
  };

  const handleAnswer = (qid: string, letter: string) => {
    if (answers[qid]) return;
    const next = { ...answers, [qid]: letter };
    setAnswers(next);
    setTimeout(() => {
      if (idx < qs.length - 1) setIdx(i => i + 1);
      else {
        localStorage.setItem("daily_challenge_date", new Date().toDateString());
        setDone(true);
      }
    }, 600);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] gap-3">
      <Zap className="h-7 w-7 animate-pulse" style={{ color: today.color }} />
      <p className="font-semibold">Loading today's challenge...</p>
    </div>
  );

  if (alreadyDone) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <CheckCircle className="h-14 w-14 mb-4" style={{ color: today.color }} />
      <h1 className="text-2xl font-bold mb-2">Already completed today!</h1>
      <p className="text-muted-foreground mb-6">Come back tomorrow for a new challenge.</p>
      <div className="bg-card border rounded-xl px-8 py-5 mb-6">
        <p className="text-xs text-muted-foreground mb-1">Next challenge in</p>
        <p className="text-3xl font-mono font-bold" style={{ color: today.color }}>{fmt(timeLeft)}</p>
      </div>
      <Link href="/practice/vr"
        className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
        Keep Practising <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );

  if (done) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <CheckCircle className="h-14 w-14 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Daily Challenge Complete! 🎉</h1>
      <p className="text-muted-foreground mb-6">You answered {Object.keys(answers).length} of {qs.length} questions</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-6">
        <div className="bg-card border rounded-xl p-4">
          <p className="text-2xl font-bold" style={{ color: today.color }}>{Object.keys(answers).length}</p>
          <p className="text-xs text-muted-foreground">Answered</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-2xl font-bold text-green-500">{Math.round(Object.keys(answers).length/qs.length*100)}%</p>
          <p className="text-xs text-muted-foreground">Completion</p>
        </div>
      </div>
      <div className="bg-card border rounded-xl px-8 py-4 mb-6">
        <p className="text-xs text-muted-foreground mb-1">Next challenge in</p>
        <p className="text-2xl font-mono font-bold" style={{ color: today.color }}>{fmt(timeLeft)}</p>
      </div>
      <Link href="/dashboard"
        className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
        Back to Dashboard
      </Link>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <p className="text-red-500 font-semibold mb-4">{error}</p>
      <button onClick={() => window.location.reload()} className="bg-teal-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm">
        Try Again
      </button>
    </div>
  );

  const q   = qs[idx];
  const sel = answers[q.questionId];
  const pct = ((idx + 1) / qs.length) * 100;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card flex-shrink-0">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5" style={{ color: today.color }} />
          <span className="font-bold text-sm">Daily Challenge</span>
          <span className="text-xs px-2 py-0.5 rounded-full text-white font-bold" style={{ backgroundColor: today.color }}>
            {today.code}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="font-mono">{fmt(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 bg-muted flex-shrink-0">
        <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: today.color }} />
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Question {idx+1} of {qs.length}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              q.difficulty==="easy" ? "bg-green-100 text-green-700" :
              q.difficulty==="hard" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
              {q.difficulty?.toUpperCase()}
            </span>
          </div>

          {q.passage && (
            <div className="bg-muted/40 border-l-4 rounded-r-xl p-4 text-sm leading-7" style={{ borderColor: today.color }}>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Passage</p>
              {q.passage}
            </div>
          )}

          <p className="font-semibold text-base leading-7">{q.question}</p>

          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              const letter = opt.charAt(0);
              const isSel  = sel === letter;
              return (
                <button key={i} onClick={() => handleAnswer(q.questionId, letter)}
                  disabled={!!sel}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSel ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" :
                    "border-border hover:border-gray-300 hover:bg-muted/40"
                  } ${!sel ? "cursor-pointer" : "cursor-default"}`}>
                  <div className="flex items-start gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${isSel?"text-white":"bg-muted text-muted-foreground"}`}
                      style={isSel?{backgroundColor:today.color}:{}}>
                      {letter}
                    </span>
                    <span className="text-sm leading-6 pt-0.5">{opt.slice(3)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
