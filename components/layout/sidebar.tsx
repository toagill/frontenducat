"use client";
import { cn } from "@/lib/utils";
import {
  BarChart3, BookOpen, Brain, Calculator, Clock,
  CreditCard, Eye, FileText, Home, LifeBuoy,
  LogOut, Stethoscope, Users, X, Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useSidebar } from "./sidebar-context";

const UCAT_SECTIONS = [
  { href: "/practice/vr",  icon: BookOpen,   label: "Verbal Reasoning",       short: "VR",  color: "text-blue-400"   },
  { href: "/practice/dm",  icon: Brain,       label: "Decision Making",        short: "DM",  color: "text-purple-400" },
  { href: "/practice/qr",  icon: Calculator,  label: "Quantitative Reasoning", short: "QR",  color: "text-amber-400"  },
  { href: "/practice/ar",  icon: Eye,         label: "Abstract Reasoning",     short: "AR",  color: "text-rose-400"   },
  { href: "/practice/sjt", icon: Users,       label: "Situational Judgement",  short: "SJT", color: "text-teal-400"   },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <aside className={cn(
      "max-xl:fixed max-xl:top-0 max-xl:left-0 max-xl:h-full xl:sticky top-0 flex h-screen flex-col border-r bg-background transition-all duration-300",
      collapsed ? "w-[250px] xl:w-[70px]" : "w-[250px]",
      collapsed ? "max-xl:-translate-x-full" : "max-xl:translate-x-0"
    )}>
      <div className={`flex h-16 items-center max-xl:justify-between gap-2 border-b px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
        <Link href="/dashboard" className="flex justify-center items-center gap-2">
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
          <NavItem href="/dashboard" icon={<Home className="size-5" />} label="Dashboard" active={isActive("/dashboard")} collapsed={collapsed} setCollapsed={setCollapsed} />

          {!collapsed && <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Question Banks</p>}
          {collapsed && <div className="my-2 border-t" />}

          {UCAT_SECTIONS.map((s) => {
            const Icon = s.icon;
            const active = isActive(s.href);
            return collapsed ? (
              <div key={s.href} className="flex justify-center items-center">
                <Link href={s.href} className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent transition-colors">
                  <Icon className={cn("size-4", active ? "text-white" : s.color)} />
                </Link>
              </div>
            ) : (
              <Link key={s.href} href={s.href} className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-teal-500 text-white" : "hover:bg-accent hover:text-accent-foreground"
              )}>
                <Icon className={cn("size-4", active ? "text-white" : s.color)} />
                <span className="flex-1">{s.label}</span>
                <span className={cn("text-xs font-bold", active ? "text-white/80" : s.color)}>{s.short}</span>
              </Link>
            );
          })}

          {!collapsed && <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Practice Tests</p>}
          {collapsed && <div className="my-2 border-t" />}

          <NavItem href="/practice/full-mock" icon={<FileText className="size-5" />} label="Full Mock Exam"  active={isActive("/practice/full-mock")} collapsed={collapsed} setCollapsed={setCollapsed} />
          <NavItem href="/practice/timed"     icon={<Clock className="size-5" />}    label="Timed Practice"  active={isActive("/practice/timed")}     collapsed={collapsed} setCollapsed={setCollapsed} />
          <NavItem href="/daily-challenge"    icon={<Zap className="size-5" />}      label="Daily Challenge" active={isActive("/daily-challenge")}    collapsed={collapsed} setCollapsed={setCollapsed} />

          {!collapsed && <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">My Progress</p>}
          {collapsed && <div className="my-2 border-t" />}

          <NavItem href="/analytics" icon={<BarChart3 className="size-5" />}  label="My Analytics"  active={isActive("/analytics")} collapsed={collapsed} setCollapsed={setCollapsed} />

          {!collapsed && <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>}
          {collapsed && <div className="my-2 border-t" />}

          <NavItem href="/pricing" icon={<CreditCard className="size-5" />} label="Subscription"  active={isActive("/pricing")} collapsed={collapsed} setCollapsed={setCollapsed} />
          <NavItem href="/support" icon={<LifeBuoy className="size-5" />}   label="Help & Support" active={isActive("/support")} collapsed={collapsed} setCollapsed={setCollapsed} />
        </nav>
      </div>

      <div className="border-t py-3">
        <nav className="grid gap-0.5 px-2">
          <NavItem href="/login" icon={<LogOut className="size-5" />} label="Logout" active={false} collapsed={collapsed} setCollapsed={setCollapsed} />
        </nav>
      </div>
    </aside>
  );
}

interface NavItemProps {
  href: string; icon: React.ReactNode; label: string;
  active?: boolean; collapsed: boolean; setCollapsed: (v: boolean) => void;
}

function NavItem({ href, icon, label, active, collapsed, setCollapsed }: NavItemProps) {
  const handleClick = () => { if (window.innerWidth < 1280) setCollapsed(true); };
  if (collapsed) {
    return (
      <div className="flex justify-center items-center">
        <Link href={href} className={cn("flex h-10 w-10 items-center justify-center rounded-md transition-colors",
          active ? "bg-teal-500 text-white" : "hover:bg-accent hover:text-accent-foreground")}>
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
      <span>{icon}</span><span>{label}</span>
    </Link>
  );
}
