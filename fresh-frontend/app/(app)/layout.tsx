"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isLoggedIn, getUser, clearToken, api } from "@/lib/api";
import {
  LayoutDashboard, BookOpen, Brain, Calculator, Eye, Users,
  FileText, Clock, Zap, BarChart3, CreditCard, LifeBuoy,
  LogOut, Stethoscope, Menu, X, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const SUBTESTS = [
  { code: "VR",  label: "Verbal Reasoning",       color: "text-blue-400",   bg: "bg-blue-500",   icon: BookOpen },
  { code: "DM",  label: "Decision Making",         color: "text-purple-400", bg: "bg-purple-500", icon: Brain },
  { code: "QR",  label: "Quantitative Reasoning",  color: "text-amber-400",  bg: "bg-amber-500",  icon: Calculator },
  { code: "AR",  label: "Abstract Reasoning",      color: "text-rose-400",   bg: "bg-rose-500",   icon: Eye },
  { code: "SJT", label: "Situational Judgement",   color: "text-teal-400",   bg: "bg-teal-500",   icon: Users },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [open, setOpen]   = useState(false);
  const [user, setUser]   = useState<any>(null);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }
    setUser(getUser());
    api("/auth/status").then((r: any) => setStatus(r.data)).catch(() => {});
  }, []);

  const handleLogout = () => { clearToken(); router.push("/login"); };
  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  const NavLink = ({ href, icon: Icon, label, color }: any) => (
    <Link href={href} onClick={() => setOpen(false)}
      className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
        isActive(href)
          ? "bg-teal-500 text-white shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}>
      <Icon className={cn("h-4 w-4 flex-shrink-0", isActive(href) ? "text-white" : color)} />
      <span>{label}</span>
      {isActive(href) && <ChevronRight className="h-3 w-3 ml-auto" />}
    </Link>
  );

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-500 shadow-sm">
          <Stethoscope className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold text-teal-500 leading-tight">Medical Exam</div>
          <div className="text-xs text-muted-foreground font-medium tracking-widest uppercase">UCAT</div>
        </div>
        <button className="ml-auto lg:hidden" onClick={() => setOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Main */}
        <NavLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" color="text-muted-foreground" />

        {/* Question Banks */}
        <div className="pt-3 pb-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">Question Banks</p>
        </div>
        {SUBTESTS.map(s => (
          <Link key={s.code} href={`/practice/${s.code.toLowerCase()}`} onClick={() => setOpen(false)}
            className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
              isActive(`/practice/${s.code.toLowerCase()}`)
                ? "bg-teal-500 text-white"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}>
            <s.icon className={cn("h-4 w-4", isActive(`/practice/${s.code.toLowerCase()}`) ? "text-white" : s.color)} />
            <span className="flex-1">{s.label}</span>
            <span className={cn("text-xs font-bold", isActive(`/practice/${s.code.toLowerCase()}`) ? "text-white/80" : s.color)}>
              {s.code}
            </span>
          </Link>
        ))}

        {/* Practice Tests */}
        <div className="pt-3 pb-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">Practice Tests</p>
        </div>
        <NavLink href="/quiz/full-mock"  icon={FileText} label="Full Mock Exam"  color="text-indigo-400" />
        <NavLink href="/practice/timed"  icon={Clock}    label="Timed Practice"  color="text-cyan-400"   />
        <NavLink href="/daily-challenge" icon={Zap}      label="Daily Challenge" color="text-yellow-400" />

        {/* Progress */}
        <div className="pt-3 pb-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">My Progress</p>
        </div>
        <NavLink href="/analytics"  icon={BarChart3}  label="My Analytics"  color="text-green-400"  />

        {/* Account */}
        <div className="pt-3 pb-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">Account</p>
        </div>
        <NavLink href="/pricing"  icon={CreditCard} label="Subscription"  color="text-pink-400"   />
        <NavLink href="/support"  icon={LifeBuoy}   label="Help & Support" color="text-orange-400" />
      </nav>

      {/* Trial / subscription badge */}
      <div className="px-3 py-3 border-t space-y-3">
        {status && !status.isSubscribed && (
          <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <p className="text-xs font-semibold text-teal-400">
                {status.isTrialActive ? "Free Trial Active" : "Trial Expired"}
              </p>
            </div>
            {status.isTrialActive && (
              <p className="text-xs text-muted-foreground mb-2">
                {status.dailyQuestionsRemaining ?? 20} questions remaining today
              </p>
            )}
            <Link href="/pricing"
              className="block text-center text-xs bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2 font-semibold transition-colors">
              Upgrade — £29.99/yr
            </Link>
          </div>
        )}

        {/* User + logout */}
        {user && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-card border-r shadow-xl">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b bg-card">
          <button onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-teal-500 text-sm">Medical Exam UCAT</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
