"use client";
import Link from "next/link";
import { Clock, BookOpen, Brain, Calculator, Eye, Users, ChevronRight } from "lucide-react";

const SUBTESTS = [
  { code: "vr",  name: "Verbal Reasoning",       icon: BookOpen,   color: "#1B4F72", q: 44, t: "22 min", tip: "Read passages carefully — answers are always based on the text only." },
  { code: "dm",  name: "Decision Making",         icon: Brain,      color: "#117A65", q: 29, t: "31 min", tip: "Use logical elimination. Watch for syllogisms and probability questions." },
  { code: "qr",  name: "Quantitative Reasoning",  icon: Calculator, color: "#784212", q: 36, t: "25 min", tip: "No advanced maths needed — focus on speed and reading data correctly." },
  { code: "ar",  name: "Abstract Reasoning",      icon: Eye,        color: "#512E5F", q: 50, t: "12 min", tip: "Only ~14 seconds per question. Look for colour, size, number, position." },
  { code: "sjt", name: "Situational Judgement",   icon: Users,      color: "#922B21", q: 69, t: "26 min", tip: "Consider GMC Good Medical Practice principles when answering." },
];

export default function TimedPracticePage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="h-6 w-6 text-teal-500" /> Timed Practice
        </h1>
        <p className="text-muted-foreground mt-1">
          Practise each UCAT subtest under real exam time conditions.
        </p>
      </div>

      <div className="space-y-3">
        {SUBTESTS.map(s => (
          <Link key={s.code} href={`/practice/${s.code}`}
            className="group flex items-center gap-4 bg-card border-2 hover:border-current rounded-xl p-5 transition-all hover:scale-[1.01]"
            style={{ borderColor: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = s.color)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}>
            <div className="p-3 rounded-xl text-white flex-shrink-0" style={{ backgroundColor: s.color }}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="font-bold text-sm">{s.name}</h2>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: s.color }}>
                  {s.code.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{s.q} questions · {s.t}</p>
              <p className="text-xs text-muted-foreground/70 italic hidden sm:block">💡 {s.tip}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="hidden sm:block text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-colors"
                style={{ backgroundColor: s.color }}>
                Start Practice
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-5">
        <h3 className="font-bold text-teal-600 mb-3">⚡ Timed Practice Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Each session runs under real UCAT exam time conditions</li>
          <li>• Navigate freely between questions — come back to hard ones</li>
          <li>• No negative marking — always attempt every question</li>
          <li>• AR is most time-pressured: just ~14 seconds per question</li>
          <li>• Aim for 2+ full timed sessions per subtest before your exam</li>
        </ul>
      </div>
    </div>
  );
}
