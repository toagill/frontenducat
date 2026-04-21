"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, BookOpen, Brain, Calculator, Eye, Users,
  FileText, Clock, Zap, BarChart3, CreditCard, LifeBuoy,
  LogOut, Stethoscope, Menu, X, ChevronRight
} from "lucide-react";

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

const SUBTESTS = [
  { code: "vr",  label: "Verbal Reasoning",       color: "text-blue-400",   icon: BookOpen   },
  { code: "dm",  label: "Decision Making",         color: "text-purple-400", icon: Brain      },
  { code: "qr",  label: "Quantitative Reasoning",  color: "text-amber-400",  icon: Calculator },
  { code: "ar",  label: "Abstract Reasoning",      color: "text-rose-400",   icon: Eye        },
  { code: "sjt", label: "Situational Judgement",   color: "text-teal-400",   icon: Users      },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [open, setOpen]     = useState(false);
  const [user, setUser]     = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const token = localStorage.getItem("medexam_token");
      if (!token) { router.push("/login"); return; }
      const u = localStorage.getItem("medexam_user");
      if (u) setUser(JSON.parse(u));

      // Fetch status
      const API = process.env.NEXT_PUBLIC_API_URL || "https://iwav64juaj.execute-api.eu-west-2.amazonaws.com/prod/api";
      fetch(`${API}/auth/status`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json()).then(r => setStatus(r.data)).catch(() => {});
    } catch (e) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("medexam_token");
      localStorage.removeItem("medexam_user");
    } catch {}
    router.push("/");
  };

  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  if (!mounted) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const NavLink = ({ href, icon: Icon, label, color }: any) => (
    <Link href={href} onClick={() => setOpen(false)}
      className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
        isActive(href) ? "bg-teal-500 text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}>
      <Icon className={cn("h-4 w-4 flex-shrink-0", isActive(href) ? "text-white" : color)} />
      <span>{label}</span>
      {isActive(href) && <ChevronRight className="h-3 w-3 ml-auto text-white/70" />}
    </Link>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-teal-600">Medical Exam</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">UCAT</div>
          </div>
        </Link>
        <button className="lg:hidden text-gray-400 hover:text-gray-600" onClick={() => setOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <NavLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" color="text-gray-400" />

        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Question Banks</p>
        {SUBTESTS.map(s => (
          <NavLink key={s.code} href={`/practice/${s.code}`} icon={s.icon} label={s.label} color={s.color} />
        ))}

        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Practice Tests</p>
        <NavLink href="/practice/full-mock" icon={FileText} label="Full Mock Exam"  color="text-indigo-400" />
        <NavLink href="/practice/timed"     icon={Clock}    label="Timed Practice"  color="text-cyan-400"   />
        <NavLink href="/daily-challenge"    icon={Zap}      label="Daily Challenge" color="text-yellow-400" />

        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">My Progress</p>
        <NavLink href="/analytics" icon={BarChart3} label="My Analytics" color="text-green-400" />

        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
        <NavLink href="/pricing" icon={CreditCard} label="Subscription"   color="text-pink-400"   />
        <NavLink href="/support" icon={LifeBuoy}   label="Help & Support"  color="text-orange-400" />
      </nav>

      {/* Trial badge */}
      <div className="px-3 py-3 border-t space-y-3">
        {status && !status.isSubscribed && status.isTrialActive && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-teal-600 mb-1">Free Trial Active</p>
            <p className="text-xs text-gray-500 mb-2">
              {status.dailyQuestionsRemaining ?? 20} questions remaining today
            </p>
            <Link href="/pricing"
              className="block text-center text-xs bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-1.5 font-semibold transition-colors">
              Upgrade — £29.99/yr
            </Link>
          </div>
        )}

        {/* User row */}
        {user && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {(user.firstName?.[0] || "U")}{(user.lastName?.[0] || "")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-gray-800">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r flex-shrink-0 bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b bg-white">
          <button onClick={() => setOpen(true)} className="text-gray-600">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-teal-600 text-sm">Medical Exam UCAT</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
