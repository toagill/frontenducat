"use client";
import { use, useEffect, useState, useCallback, useReducer, useRef } from "react";
import { useRouter } from "next/navigation";
import { examApi } from "@/lib/api";
import { Loader2, AlertTriangle, Clock, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const SUBTEST_CONFIG: Record<string, { name: string; color: string; time: number }> = {
  vr:  { name: "Verbal Reasoning",       color: "#1B4F72", time: 22*60 },
  dm:  { name: "Decision Making",        color: "#117A65", time: 31*60 },
  qr:  { name: "Quantitative Reasoning", color: "#784212", time: 25*60 },
  ar:  { name: "Abstract Reasoning",     color: "#512E5F", time: 12*60 },
  sjt: { name: "Situational Judgement",  color: "#922B21", time: 26*60 },
  "full-mock": { name: "Full Mock Exam", color: "#00A896", time: 116*60 },
  timed: { name: "Timed Practice",       color: "#00A896", time: 30*60 },
};

interface Q { questionId: string; subtest: string; difficulty: string; passage?: string; question: string; options: string[]; }
interface State { qs: Q[]; loading: boolean; error: string; idx: number; answers: Record<string, string>; time: number; done: boolean; review: boolean; }
type A = { type: "LOAD"; qs: Q[] } | { type: "ERR"; msg: string } | { type: "ANS"; qid: string; opt: string } | { type: "NEXT" } | { type: "PREV" } | { type: "GOTO"; i: number } | { type: "TICK" } | { type: "DONE" } | { type: "REVIEW" };

function reducer(s: State, a: A): State {
  switch (a.type) {
    case "LOAD": return { ...s, qs: a.qs, loading: false, time: s.time };
    case "ERR":  return { ...s, error: a.msg, loading: false };
    case "ANS":  return { ...s, answers: { ...s.answers, [a.qid]: a.opt } };
    case "NEXT": return { ...s, idx: Math.min(s.idx+1, s.qs.length-1) };
    case "PREV": return { ...s, idx: Math.max(s.idx-1, 0) };
    case "GOTO": return { ...s, idx: a.i };
    case "TICK": return s.time <= 1 ? { ...s, time: 0, done: true } : { ...s, time: s.time-1 };
    case "DONE": return { ...s, done: true };
    case "REVIEW": return { ...s, review: true, idx: 0 };
    default: return s;
  }
}

export default function PracticePage({ params }: { params: Promise<{ subtest: string }> }) {
  const { subtest } = use(params);
  const router      = useRouter();
  const cfg         = SUBTEST_CONFIG[subtest] || SUBTEST_CONFIG.vr;
  const [s, d]      = useReducer(reducer, { qs: [], loading: true, error: "", idx: 0, answers: {}, time: cfg.time, done: false, review: false });
  const timerRef    = useRef<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        let qs: Q[] = [];
        if (subtest === "full-mock") {
          for (const st of ["VR","DM","QR","AR","SJT"]) {
            const r: any = await examApi.questions(st);
            qs = [...qs, ...(r.data?.questions || [])];
          }
        } else {
          const r: any = await examApi.questions(subtest.toUpperCase());
          qs = r.data?.questions || [];
        }
        if (!qs.length) throw new Error("No questions found");
        d({ type: "LOAD", qs });
      } catch (e: any) { d({ type: "ERR", msg: e.message }); }
    };
    load();
  }, [subtest]);

  useEffect(() => {
    if (s.loading || s.done || s.review || !s.qs.length) return;
    timerRef.current = setInterval(() => d({ type: "TICK" }), 1000);
    return () => clearInterval(timerRef.current);
  }, [s.loading, s.done, s.review, s.qs.length]);

  const handleAnswer = useCallback((qid: string, opt: string) => {
    if (s.review || s.answers[qid]) return;
    d({ type: "ANS", qid, opt });
    setTimeout(() => {
      if (s.idx < s.qs.length - 1) d({ type: "NEXT" });
    }, 500);
  }, [s.idx, s.qs.length, s.review, s.answers]);

  const fmt = (sec: number) =>
    `${Math.floor(sec/60).toString().padStart(2,"0")}:${(sec%60).toString().padStart(2,"0")}`;

  if (s.loading) return (
    <div className="flex items-center justify-center min-h-screen gap-3">
      <Loader2 className="h-8 w-8 animate-spin" style={{ color: cfg.color }} />
      <p className="font-semibold">Loading {cfg.name}...</p>
    </div>
  );

  if (s.error) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-center">
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <h2 className="text-xl font-bold">Could not load questions</h2>
      <p className="text-muted-foreground">{s.error}</p>
      <button onClick={() => router.back()} className="bg-teal-500 text-white px-6 py-2.5 rounded-xl font-semibold">Go Back</button>
    </div>
  );

  if (s.done && !s.review) {
    const total    = s.qs.length;
    const answered = Object.keys(s.answers).length;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md bg-card border rounded-2xl p-8 text-center">
          <CheckCircle className="h-14 w-14 mx-auto mb-4" style={{ color: cfg.color }} />
          <h1 className="text-2xl font-bold mb-1">{cfg.name} Complete!</h1>
          <p className="text-muted-foreground mb-6">Here's a summary of your session</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { l: "Answered",   v: answered,                                 c: cfg.color   },
              { l: "Skipped",    v: total-answered,                           c: "#f97316"   },
              { l: "Total",      v: total,                                    c: cfg.color   },
              { l: "Completion", v: `${Math.round(answered/total*100)}%`,     c: "#16a34a"   },
            ].map(({ l, v, c }) => (
              <div key={l} className="bg-muted/50 rounded-xl p-4">
                <p className="text-2xl font-bold" style={{ color: c }}>{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <button onClick={() => d({ type: "REVIEW" })}
              className="w-full py-3 rounded-xl font-bold text-white transition-colors"
              style={{ backgroundColor: cfg.color }}>
              Review Answers
            </button>
            <button onClick={() => router.push("/dashboard")}
              className="w-full py-3 rounded-xl font-semibold border hover:bg-muted transition-colors">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = s.qs[s.idx];
  if (!q) return null;
  const sel      = s.answers[q.questionId];
  const stColor  = SUBTEST_CONFIG[q.subtest?.toLowerCase()]?.color || cfg.color;
  const lowTime  = s.time < 120 && !s.review;
  const progress = ((s.idx+1)/s.qs.length)*100;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-4 py-3 border-b bg-card flex-shrink-0">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: stColor }}>
            {q.subtest}
          </span>
          <span className="text-sm font-medium hidden sm:block">{cfg.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            q.difficulty==="easy" ? "bg-green-100 text-green-700" :
            q.difficulty==="hard" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
            {q.difficulty?.toUpperCase()}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{Object.keys(s.answers).length}/{s.qs.length} answered</span>
          {!s.review && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-sm ${lowTime ? "bg-red-100 text-red-600 animate-pulse" : "bg-muted"}`}>
              <Clock className="h-3.5 w-3.5" /> {fmt(s.time)}
            </div>
          )}
          {s.review && <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium">Review Mode</span>}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted flex-shrink-0">
        <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: stColor }} />
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-xs text-muted-foreground">Question {s.idx+1} of {s.qs.length}</p>

          {q.passage && (
            <div className="bg-muted/40 border-l-4 rounded-r-xl p-4 text-sm leading-relaxed" style={{ borderColor: stColor }}>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Passage</p>
              <p className="leading-7">{q.passage}</p>
            </div>
          )}

          <p className="font-semibold text-base leading-7">{q.question}</p>

          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              const letter = opt.charAt(0);
              const isSel  = sel === letter;
              return (
                <button key={i} onClick={() => handleAnswer(q.questionId, letter)}
                  disabled={!!sel || s.review}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                    isSel ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" :
                    "border-border hover:border-gray-300 hover:bg-muted/40"
                  } ${!sel && !s.review ? "cursor-pointer" : "cursor-default"}`}>
                  <div className="flex items-start gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                      isSel ? "text-white" : "bg-muted text-muted-foreground"}`}
                      style={isSel ? { backgroundColor: stColor } : {}}>
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

      {/* Bottom nav */}
      <div className="border-t bg-card px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
        <button onClick={() => d({ type: "PREV" })} disabled={s.idx===0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border font-medium text-sm disabled:opacity-40 hover:bg-muted transition-colors">
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>

        {/* Dot nav */}
        <div className="flex gap-1 overflow-x-auto max-w-xs">
          {s.qs.slice(Math.max(0,s.idx-4), Math.min(s.qs.length,s.idx+5)).map((_,i) => {
            const ai = Math.max(0,s.idx-4)+i;
            const isAns = !!s.answers[s.qs[ai]?.questionId];
            const isCur = ai===s.idx;
            return (
              <button key={ai} onClick={() => d({ type: "GOTO", i: ai })}
                className={`w-7 h-7 rounded-full text-xs font-bold flex-shrink-0 transition-all ${isCur?"scale-110":""}`}
                style={{ backgroundColor: isCur||isAns ? stColor : "#e5e7eb", color: isCur||isAns?"white":"#6b7280" }}>
                {ai+1}
              </button>
            );
          })}
        </div>

        {s.idx < s.qs.length-1 ? (
          <button onClick={() => d({ type: "NEXT" })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium text-sm text-white transition-colors"
            style={{ backgroundColor: stColor }}>
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={() => { clearInterval(timerRef.current); s.review ? router.push("/dashboard") : d({ type: "DONE" }); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm text-white transition-colors"
            style={{ backgroundColor: s.review ? "#6b7280" : "#16a34a" }}>
            {s.review ? "Exit" : "Finish"} <CheckCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
