"use client";
import { useWindowSize } from "@/hooks/use-window";
import { cn } from "@/lib/utils";
import {
  BarChart3, BookOpen, Brain, Calculator, Clock,
  CreditCard, Eye, HelpCircle, Home, LifeBuoy,
  LogOut, Stethoscope, Trophy, Users, X, Zap, FileText
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useSidebar } from "./sidebar-context";

const UCAT_SECTIONS = [
  { href: "/explore?subtest=VR", icon: <BookOpen className="size-4" />, label: "Verbal Reasoning",        short: "VR",  color: "text-blue-400" },
  { href: "/explore?subtest=DM", icon: <Brain className="size-4" />,    label: "Decision Making",         short: "DM",  color: "text-purple-400" },
  { href: "/explore?subtest=QR", icon: <Calculator className="size-4" />,label: "Quantitative Reasoning", short: "QR",  color: "text-amber-400" },
  { href: "/explore?subtest=AR", icon: <Eye className="size-4" />,       label: "Abstract Reasoning",     short: "AR",  color: "text-rose-400" },
  { href: "/explore?subtest=SJT",icon: <Users className="size-4" />,     label: "Situational Judgement",  short: "SJT", color: "text-teal-400" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);
  const isSubtest = (href: string) => pathname + (typeof window !== "undefined" ? window.location.search : "") === href;

  return (
    <aside className={cn(
      "max-xl:fixed max-xl:top-0 max-xl:left-0 max-xl:h-full xl:sticky top-0 flex h-screen flex-col border-r bg-background transition-all duration-300",
      collapsed ? "w-[250px] xl:w-[70px]" : "w-[250px]",
      collapsed ? "max-xl:-translate-x-full" : "max-xl:translate-x-0"
    )}>

      {/* Logo */}
      <div className={`flex h-16 items-center max-xl:justify-between gap-2 border-b px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
        <Link href="/" className="flex justify-center items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-bold text-teal-400">Medical Exam</div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">UCAT</div>
            </div>
          )}
        </Link>
        <button className="xl:hidden" onClick={() => setCollapsed(!collapsed)}>
          <X className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto py-3">
        <nav className="grid gap-0.5 px-2">

          {/* Home */}
          <NavItem href="/" icon={<Home className="size-5" />} label="Dashboard" active={pathname === "/"} collapsed={collapsed} setCollapsed={setCollapsed} />

          {/* Question Banks */}
          {!collapsed && (
            <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Question Banks
            </p>
          )}
          {collapsed && <div className="my-2 border-t" />}

          {UCAT_SECTIONS.map((s) => (
            collapsed ? (
              <div key={s.href} className="relative group flex justify-center items-center">
                <Link href={s.href} className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground"
                )}>
                  <span className={s.color}>{s.icon}</span>
                </Link>
              </div>
            ) : (
              <Link key={s.href} href={s.href} className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground"
              )}>
                <span className={s.color}>{s.icon}</span>
                <span className="flex-1">{s.label}</span>
                <span className={cn("text-xs font-bold", s.color)}>{s.short}</span>
              </Link>
            )
          ))}

          {/* Practice Tests */}
          {!collapsed && (
            <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Practice Tests
            </p>
          )}
          {collapsed && <div className="my-2 border-t" />}

          <NavItem href="/battle"       icon={<FileText className="size-5" />} label="Full Mock Exam"    active={isActive("/battle")}       collapsed={collapsed} setCollapsed={setCollapsed} />
          <NavItem href="/tournaments"  icon={<Clock className="size-5" />}    label="Timed Practice"    active={isActive("/tournaments")}   collapsed={collapsed} setCollapsed={setCollapsed} />
          <NavItem href="/daily-challenge" icon={<Zap className="size-5" />}  label="Daily Challenge"   active={isActive("/daily-challenge")} collapsed={collapsed} setCollapsed={setCollapsed} />

          {/* My Progress */}
          {!collapsed && (
            <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              My Progress
            </p>
          )}
          {collapsed && <div className="my-2 border-t" />}

          <NavItem href="/dashboard"    icon={<BarChart3 className="size-5" />} label="My Analytics"   active={isActive("/dashboard")}     collapsed={collapsed} setCollapsed={setCollapsed} />
          <NavItem href="/leaderboard"  icon={<Trophy className="size-5" />}   label="Leaderboard"     active={isActive("/leaderboard")}   collapsed={collapsed} setCollapsed={setCollapsed} />

          {/* Account */}
          {!collapsed && (
            <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Account
            </p>
          )}
          {collapsed && <div className="my-2 border-t" />}

          <NavItem href="/pricing"      icon={<CreditCard className="size-5" />} label="Subscription"  active={isActive("/pricing")}       collapsed={collapsed} setCollapsed={setCollapsed} />
          <NavItem href="/support"      icon={<LifeBuoy className="size-5" />}  label="Help & Support" active={isActive("/support")}       collapsed={collapsed} setCollapsed={setCollapsed} />
          <NavItem href="/quiz-discussions" icon={<HelpCircle className="size-5" />} label="Q&A Forum" active={isActive("/quiz-discussions")} collapsed={collapsed} setCollapsed={setCollapsed} />
        </nav>
      </div>

      {/* Trial badge */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
          <p className="text-xs font-semibold text-teal-400">🎓 Free Trial Active</p>
          <p className="text-xs text-muted-foreground mt-0.5">1 day 14 hrs remaining</p>
          <Link href="/pricing" className="mt-2 block text-center text-xs bg-teal-500 text-white rounded-md py-1.5 font-medium hover:bg-teal-600 transition-colors">
            Upgrade — £19.99/yr
          </Link>
        </div>
      )}

      {/* Logout */}
      <div className="border-t py-3">
        <nav className="grid gap-0.5 px-2">
          <NavItem href="/login" icon={<LogOut className="size-5" />} label="Logout" active={false} collapsed={collapsed} setCollapsed={setCollapsed} />
        </nav>
      </div>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

function NavItem({ href, icon, label, active, collapsed, setCollapsed }: NavItemProps) {
  const { width } = useWindowSize();
  const handleClick = () => { if (width < 1280) setCollapsed(true); };

  if (collapsed) {
    return (
      <div className="relative group flex justify-center items-center">
        <Link href={href} className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
          active ? "bg-teal-500 text-white" : "hover:bg-accent hover:text-accent-foreground"
        )}>
          {icon}
        </Link>
      </div>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active ? "bg-teal-500 text-white" : "hover:bg-accent hover:text-accent-foreground"
    )}>
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
