"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { Loader2, ChevronLeft, ChevronRight, AlertTriangle, Clock, CheckCircle } from "lucide-react";

interface UCATQuestion {
  questionId: string;
  subtest: string;
  difficulty: string;
  passage?: string;
  question: string;
  options: string[];
  timeRecommended: number;
}

interface QuizState {
  questions: UCATQuestion[];
  loading: boolean;
  error: string | null;
  currentIndex: number;
  answers: Record<string, string>;
  timeRemaining: number;
  isCompleted: boolean;
  isReviewMode: boolean;
  correctAnswers: Record<string, string>;
  explanations: Record<string, string>;
  score: number | null;
}

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_QUESTIONS"; payload: UCATQuestion[] }
  | { type: "TICK" }
  | { type: "ANSWER"; payload: { questionId: string; option: string } }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "GOTO"; payload: number }
  | { type: "COMPLETE"; payload: { correctAnswers: Record<string, string>; explanations: Record<string, string>; score: number } }
  | { type: "START_REVIEW" };

const SUBTEST_CONFIG: Record<string, { name: string; color: string; time: number }> = {
  VR:  { name: "Verbal Reasoning",       color: "#1B4F72", time: 22 * 60 },
  DM:  { name: "Decision Making",        color: "#117A65", time: 31 * 60 },
  QR:  { name: "Quantitative Reasoning", color: "#784212", time: 25 * 60 },
  AR:  { name: "Abstract Reasoning",     color: "#512E5F", time: 12 * 60 },
  SJT: { name: "Situational Judgement",  color: "#922B21", time: 26 * 60 },
};

function getSubtest(id: string): string {
  const u = id.toUpperCase();
  if (u.includes("VR")  || u.includes("VERBAL"))      return "VR";
  if (u.includes("DM")  || u.includes("DECISION"))    return "DM";
  if (u.includes("QR")  || u.includes("QUANT"))       return "QR";
  if (u.includes("AR")  || u.includes("ABSTRACT"))    return "AR";
  if (u.includes("SJT") || u.includes("SITUATION"))   return "SJT";
  if (u.includes("FULL")|| u.includes("MOCK"))        return "FULL";
  return "VR";
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "SET_LOADING":   return { ...state, loading: action.payload };
    case "SET_ERROR":     return { ...state, error: action.payload, loading: false };
    case "SET_QUESTIONS": return { ...state, questions: action.payload, loading: false,
      timeRemaining: action.payload[0]?.subtest === "FULL" ? 116*60
        : SUBTEST_CONFIG[action.payload[0]?.subtest]?.time || action.payload.length * 60 };
    case "TICK": return state.timeRemaining <= 1
      ? { ...state, timeRemaining: 0, isCompleted: true }
      : { ...state, timeRemaining: state.timeRemaining - 1 };
    case "ANSWER": return { ...state, answers: { ...state.answers, [action.payload.questionId]: action.payload.option } };
    case "NEXT":   return { ...state, currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1) };
    case "PREV":   return { ...state, currentIndex: Math.max(state.currentIndex - 1, 0) };
    case "GOTO":   return { ...state, currentIndex: action.payload };
    case "COMPLETE": return { ...state, isCompleted: true, correctAnswers: action.payload.correctAnswers,
      explanations: action.payload.explanations, score: action.payload.score };
    case "START_REVIEW": return { ...state, isReviewMode: true, currentIndex: 0 };
    default: return state;
  }
}

const initialState: QuizState = {
  questions: [], loading: true, error: null, currentIndex: 0,
  answers: {}, timeRemaining: 0, isCompleted: false, isReviewMode: false,
  correctAnswers: {}, explanations: {}, score: null,
};

export function QuizPlay({ id }: { id: string }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const subtest = getSubtest(id);
  const config = SUBTEST_CONFIG[subtest] || SUBTEST_CONFIG.VR;

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("medexam_token");
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

        if (subtest === "FULL") {
          const all: UCATQuestion[] = [];
          for (const st of ["VR","DM","QR","AR","SJT"]) {
            const r = await fetch(`${base}/exam/questions/${st}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (r.ok) { const d = await r.json(); all.push(...(d.data?.questions||[])); }
          }
          if (all.length === 0) throw new Error("No questions found");
          dispatch({ type: "SET_QUESTIONS", payload: all });
        } else {
          const r = await fetch(`${base}/exam/questions/${subtest}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!r.ok) { const e = await r.json(); throw new Error(e.message||"Failed"); }
          const d = await r.json();
          const qs = d.data?.questions || [];
          if (qs.length === 0) throw new Error("No questions found for this subtest");
          dispatch({ type: "SET_QUESTIONS", payload: qs });
        }
      } catch (err: any) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };
    fetchQuestions();
  }, [id, subtest]);

  // Timer
  useEffect(() => {
    if (state.loading || state.isCompleted || state.isReviewMode || state.questions.length === 0) return;
    timerRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.loading, state.isCompleted, state.isReviewMode, state.questions.length]);

  // Submit when completed
  useEffect(() => {
    if (!state.isCompleted || state.isReviewMode || state.score !== null) return;
    (async () => {
      try {
        const token = localStorage.getItem("medexam_token");
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const sr = await fetch(`${base}/exam/session`, {
          method: "POST",
          headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
          body: JSON.stringify({ examType: subtest === "FULL" ? "full" : subtest }),
        });
        const sd = await sr.json();
        const sessionId = sd.data?.sessionId;
        const formatted: Record<string, Record<string, string>> = {};
        state.questions.forEach(q => {
          if (!formatted[q.subtest]) formatted[q.subtest] = {};
          if (state.answers[q.questionId]) formatted[q.subtest][q.questionId] = state.answers[q.questionId];
        });
        if (sessionId) {
          await fetch(`${base}/exam/submit/${sessionId}`, {
            method: "POST",
            headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
            body: JSON.stringify({ answers: formatted }),
          });
        }
      } catch {}
      dispatch({ type: "COMPLETE", payload: { correctAnswers:{}, explanations:{}, score: Object.keys(state.answers).length } });
    })();
  }, [state.isCompleted]);

  const handleAnswer = useCallback((questionId: string, option: string) => {
    if (state.isReviewMode || state.answers[questionId]) return;
    dispatch({ type: "ANSWER", payload: { questionId, option } });
    setTimeout(() => {
      if (state.currentIndex < state.questions.length - 1) dispatch({ type: "NEXT" });
    }, 600);
  }, [state.currentIndex, state.questions.length, state.isReviewMode, state.answers]);

  const formatTime = (s: number) =>
    `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;

  const progress = state.questions.length > 0 ? ((state.currentIndex+1)/state.questions.length)*100 : 0;

  if (state.loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="h-12 w-12 animate-spin" style={{ color: config.color }} />
      <p className="text-lg font-semibold">Loading {config.name} questions...</p>
    </div>
  );

  if (state.error) return (
    <div className="container max-w-2xl mx-auto py-12 px-4 text-center">
      <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Could not load questions</h2>
      <p className="text-muted-foreground mb-6">{state.error}</p>
      <div className="flex gap-3 justify-center">
        <Button onClick={() => router.push("/explore")}>Back to Explore</Button>
        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    </div>
  );

  if (state.isCompleted && !state.isReviewMode) {
    const total = state.questions.length;
    const answered = Object.keys(state.answers).length;
    return (
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 mx-auto mb-4" style={{ color: config.color }} />
          <h1 className="text-3xl font-bold mb-2">
            {subtest === "FULL" ? "Mock Exam Complete!" : `${config.name} Complete!`}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: "Answered",    value: answered,                              color: config.color },
            { label: "Unanswered",  value: total - answered,                     color: "#f97316"   },
            { label: "Total",       value: total,                                 color: config.color },
            { label: "Completion",  value: `${Math.round(answered/total*100)}%`, color: "#16a34a"   },
          ].map(({ label, value, color }) => (
            <Card key={label} className="p-6 text-center">
              <p className="text-4xl font-bold mb-1" style={{ color }}>{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </Card>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Button className="w-full py-6 text-lg text-white" style={{ backgroundColor: config.color }}
            onClick={() => dispatch({ type: "START_REVIEW" })}>
            Review Answers
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/user")}>
            View Analytics
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => router.push("/explore")}>
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = state.questions[state.currentIndex];
  if (!currentQ) return null;
  const selectedAnswer = state.answers[currentQ.questionId];
  const subtestColor = SUBTEST_CONFIG[currentQ.subtest]?.color || config.color;
  const isLowTime = state.timeRemaining < 120;

  return (
    <div className="container max-w-4xl mx-auto py-4 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-white text-sm font-bold" style={{ backgroundColor: subtestColor }}>
            {currentQ.subtest}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            currentQ.difficulty==="easy" ? "bg-green-100 text-green-700" :
            currentQ.difficulty==="hard" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
          }`}>{currentQ.difficulty?.toUpperCase()}</span>
        </div>
        {!state.isReviewMode && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-lg ${
            isLowTime ? "bg-red-100 text-red-600 animate-pulse" : "bg-muted"}`}>
            <Clock className="h-4 w-4" />{formatTime(state.timeRemaining)}
          </div>
        )}
        {state.isReviewMode && (
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 font-medium text-sm">Review Mode</span>
        )}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Question {state.currentIndex+1} of {state.questions.length}</span>
          <span>{Object.keys(state.answers).length} answered</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <Card className="overflow-hidden mb-4">
        <div className="h-1" style={{ backgroundColor: subtestColor }} />
        <div className="p-6">
          {currentQ.passage && (
            <div className="bg-muted/50 border-l-4 p-4 rounded-r-lg mb-5 text-sm leading-relaxed"
              style={{ borderColor: subtestColor }}>
              <p className="font-semibold text-xs uppercase tracking-wide mb-2 opacity-60">Passage</p>
              <p className="leading-7">{currentQ.passage}</p>
            </div>
          )}
          <p className="font-semibold text-base mb-5 leading-7">{currentQ.question}</p>
          <div className="space-y-3">
            {currentQ.options.map((option, i) => {
              const letter = option.charAt(0);
              const isSelected = selectedAnswer === letter;
              return (
                <button key={i} onClick={() => handleAnswer(currentQ.questionId, letter)}
                  disabled={!!selectedAnswer || state.isReviewMode}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected ? "border-blue-500 bg-blue-50" :
                    "border-border hover:border-gray-400 hover:bg-muted/50"
                  } ${!selectedAnswer && !state.isReviewMode ? "cursor-pointer" : "cursor-default"}`}>
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      isSelected ? "text-white" : "bg-muted text-muted-foreground"}`}
                      style={isSelected ? { backgroundColor: subtestColor } : {}}>
                      {letter}
                    </span>
                    <span className="text-sm leading-6">{option.slice(3)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => dispatch({ type: "PREV" })}
          disabled={state.currentIndex === 0} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        <div className="flex gap-1">
          {state.questions.slice(Math.max(0,state.currentIndex-3), Math.min(state.questions.length,state.currentIndex+4))
            .map((_,i) => {
              const idx = Math.max(0,state.currentIndex-3)+i;
              const isAnswered = !!state.answers[state.questions[idx]?.questionId];
              const isCurrent = idx === state.currentIndex;
              return (
                <button key={idx} onClick={() => dispatch({ type: "GOTO", payload: idx })}
                  className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${isCurrent?"scale-110":""}`}
                  style={{ backgroundColor: isCurrent||isAnswered ? subtestColor : "#e5e7eb",
                    color: isCurrent||isAnswered ? "white" : "#6b7280" }}>
                  {idx+1}
                </button>
              );
          })}
        </div>

        {state.currentIndex < state.questions.length-1 ? (
          <Button onClick={() => dispatch({ type: "NEXT" })} className="flex items-center gap-2 text-white"
            style={{ backgroundColor: subtestColor }}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => {
            if (timerRef.current) clearInterval(timerRef.current);
            state.isReviewMode ? router.push("/explore") : dispatch({ type: "COMPLETE", payload:{correctAnswers:{},explanations:{},score:0} });
          }} className="flex items-center gap-2 text-white"
            style={{ backgroundColor: state.isReviewMode ? "#6b7280" : "#16a34a" }}>
            {state.isReviewMode ? "Exit Review" : "Finish"} <CheckCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
