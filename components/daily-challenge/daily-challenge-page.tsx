"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock, CheckCircle, XCircle, BookOpen, Brain, Calculator, Eye, Users } from "lucide-react";

const SUBTESTS = [
  { code: "VR",  name: "Verbal Reasoning",      color: "#1B4F72", icon: <BookOpen className="size-4" /> },
  { code: "DM",  name: "Decision Making",        color: "#117A65", icon: <Brain className="size-4" />    },
  { code: "QR",  name: "Quantitative Reasoning", color: "#784212", icon: <Calculator className="size-4" />},
  { code: "AR",  name: "Abstract Reasoning",     color: "#512E5F", icon: <Eye className="size-4" />      },
  { code: "SJT", name: "Situational Judgement",  color: "#922B21", icon: <Users className="size-4" />    },
];

// Get today's subtest based on day of week
function getTodaySubtest() {
  const day = new Date().getDay(); // 0=Sun, 1=Mon...
  const map: Record<number, string> = { 0:"SJT", 1:"VR", 2:"DM", 3:"QR", 4:"AR", 5:"SJT", 6:"VR" };
  return map[day] || "VR";
}

// Time until midnight
function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

interface Question {
  questionId: string;
  subtest: string;
  difficulty: string;
  passage?: string;
  question: string;
  options: string[];
}

export default function DailyChallengePageNew() {
  const router = useRouter();
  const todayCode = getTodaySubtest();
  const todaySubtest = SUBTESTS.find(s => s.code === todayCode) || SUBTESTS[0];

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Check if already completed today
  useEffect(() => {
    const today = new Date().toDateString();
    const lastCompleted = localStorage.getItem("daily_challenge_date");
    if (lastCompleted === today) setCompleted(true);
  }, []);

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeUntilMidnight()), 1000);
    return () => clearInterval(t);
  }, []);

  // Fetch 10 questions for today's subtest
  useEffect(() => {
    if (completed) return;
    const fetch10 = async () => {
      try {
        const token = localStorage.getItem("medexam_token");
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const res = await fetch(`${base}/exam/questions/${todayCode}?limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setQuestions((data.data?.questions || []).slice(0, 10));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetch10();
  }, [todayCode, completed]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  const handleAnswer = (questionId: string, letter: string) => {
    if (answers[questionId]) return;
    const newAnswers = { ...answers, [questionId]: letter };
    setAnswers(newAnswers);
    // Auto advance after 600ms
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        // Complete
        const answered = Object.keys(newAnswers).length;
        setScore(answered);
        localStorage.setItem("daily_challenge_date", new Date().toDateString());
        setCompleted(true);
      }
    }, 600);
  };

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // Already completed today
  if (completed && score === 0) {
    return (
      <div className="container max-w-2xl mx-auto py-12 px-4 text-center">
        <CheckCircle className="h-16 w-16 mx-auto mb-4" style={{ color: todaySubtest.color }} />
        <h1 className="text-3xl font-bold mb-2">Already Completed!</h1>
        <p className="text-muted-foreground mb-6">You have completed today's challenge. Come back tomorrow!</p>
        <div className="p-5 rounded-xl border bg-muted/50 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Next challenge in</p>
          <p className="text-3xl font-mono font-bold" style={{ color: todaySubtest.color }}>
            {formatTime(timeLeft)}
          </p>
        </div>
        <Button onClick={() => router.push("/explore")} style={{ backgroundColor: todaySubtest.color }} className="text-white">
          Practice More Questions
        </Button>
      </div>
    );
  }

  // Results
  if (completed && score > 0) {
    return (
      <div className="container max-w-2xl mx-auto py-12 px-4 text-center">
        <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
        <h1 className="text-3xl font-bold mb-2">Daily Challenge Complete! 🎉</h1>
        <p className="text-muted-foreground mb-6">Great work on today's {todaySubtest.name} challenge</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-4xl font-bold mb-1" style={{ color: todaySubtest.color }}>{score}</p>
            <p className="text-sm text-muted-foreground">Questions Answered</p>
          </Card>
          <Card className="p-6">
            <p className="text-4xl font-bold mb-1 text-green-500">{Math.round(score/questions.length*100)}%</p>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </Card>
        </div>
        <div className="p-5 rounded-xl border bg-muted/50 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Next challenge in</p>
          <p className="text-3xl font-mono font-bold" style={{ color: todaySubtest.color }}>
            {formatTime(timeLeft)}
          </p>
        </div>
        <Button onClick={() => router.push("/explore")} style={{ backgroundColor: todaySubtest.color }} className="text-white w-full">
          Continue Practising
        </Button>
      </div>
    );
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] gap-3">
      <Zap className="h-8 w-8 animate-pulse" style={{ color: todaySubtest.color }} />
      <p className="text-lg font-semibold">Loading today's challenge...</p>
    </div>
  );

  if (error) return (
    <div className="container max-w-2xl mx-auto py-12 px-4 text-center">
      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <p className="text-lg font-semibold mb-4">Could not load challenge</p>
      <Button onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  );

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-5 w-5" style={{ color: todaySubtest.color }} />
            <h1 className="text-2xl font-bold">Daily Challenge</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Today's focus: <span className="font-semibold" style={{ color: todaySubtest.color }}>{todaySubtest.name}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
            <Clock className="h-3 w-3" /> Resets in
          </div>
          <p className="font-mono font-bold text-lg" style={{ color: todaySubtest.color }}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <Card className="overflow-hidden mb-4">
        <div className="h-1" style={{ backgroundColor: todaySubtest.color }} />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-0.5 rounded-full text-white text-xs font-bold" style={{ backgroundColor: todaySubtest.color }}>
              {currentQ.subtest}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              currentQ.difficulty === "easy" ? "bg-green-100 text-green-700" :
              currentQ.difficulty === "hard" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
            }`}>{currentQ.difficulty?.toUpperCase()}</span>
          </div>

          {currentQ.passage && (
            <div className="bg-muted/50 border-l-4 p-4 rounded-r-lg mb-4 text-sm leading-relaxed"
              style={{ borderColor: todaySubtest.color }}>
              <p className="font-semibold text-xs uppercase tracking-wide mb-2 opacity-60">Passage</p>
              <p className="leading-7">{currentQ.passage}</p>
            </div>
          )}

          <p className="font-semibold text-base mb-4 leading-7">{currentQ.question}</p>

          <div className="space-y-3">
            {currentQ.options.map((option, i) => {
              const letter = option.charAt(0);
              const isSelected = answers[currentQ.questionId] === letter;
              return (
                <button key={i} onClick={() => handleAnswer(currentQ.questionId, letter)}
                  disabled={!!answers[currentQ.questionId]}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected ? "border-blue-500 bg-blue-50" :
                    "border-border hover:border-gray-400 hover:bg-muted/50"
                  } ${!answers[currentQ.questionId] ? "cursor-pointer" : "cursor-default"}`}>
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      isSelected ? "text-white" : "bg-muted text-muted-foreground"
                    }`} style={isSelected ? { backgroundColor: todaySubtest.color } : {}}>
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
    </div>
  );
}
