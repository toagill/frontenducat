"use client";
import { useWindowSize } from "@/hooks/use-window";
import { cn } from "@/lib/utils";
import { Activity, BarChart3, BookOpen, Brain, Clock, CreditCard, HelpCircle, Home, LifeBuoy, LogOut, Stethoscope, Trophy, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useSidebar } from "./sidebar-context";

export function AppSidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <aside className={cn(
      "max-xl:fixed max-xl:top-0 max-xl:left-0 max-xl:h-full xl:sticky top-0 flex h-screen flex-col border-r bg-background transition-all duration-300",
      collapsed ? "w-[250px] xl:w-[70px]" : "w-[250px]",
      collapsed ? "max-xl:-translate-x-full" : "max-xl:translate-x-0"
    )}>
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

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {!collapsed && <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Main</p>}
          <NavItem href="/" icon={<Home className="size-5" />} label="Dashboard" active={isActive("/")} />
          <NavItem href="/daily-challenge" icon={<Zap className="size-5" />} label="Daily Practice" active={isActive("/daily-challenge")} />
          <NavItem href="/explore" icon={<Brain className="size-5" />} label="Mock Exams" active={isActive("/explore")} />
          <NavItem href="/categories" icon={<BookOpen className="size-5" />} label="Subtests" active={isActive("/categories")} />

          {!collapsed && <p className="px-3 py-1 mt-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Progress</p>}
          <NavItem href="/leaderboard" icon={<Trophy className="size-5" />} label="Leaderboard" active={isActive("/leaderboard")} />
          <NavItem href="/dashboard" icon={<BarChart3 className="size-5" />} label="My Analytics" active={isActive("/dashboard")} />
          <NavItem href="/tournaments" icon={<Activity className="size-5" />} label="Timed Exams" active={isActive("/tournaments")} />
          <NavItem href="/battle" icon={<Clock className="size-5" />} label="Exam Simulator" active={isActive("/battle")} />

          {!collapsed && <p className="px-3 py-1 mt-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>}
          <NavItem href="/pricing" icon={<CreditCard className="size-5" />} label="Subscription" active={isActive("/pricing")} />
          <NavItem href="/support" icon={<LifeBuoy className="size-5" />} label="Help & Support" active={isActive("/support")} />
          <NavItem href="/quiz-discussions" icon={<HelpCircle className="size-5" />} label="Q&A Forum" active={isActive("/quiz-discussions")} />
        </nav>
      </div>

      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
          <p className="text-xs font-semibold text-teal-400">🎓 Free Trial Active</p>
          <p className="text-xs text-muted-foreground mt-0.5">1 day 14 hrs remaining</p>
          <Link href="/pricing" className="mt-2 block text-center text-xs bg-teal-500 text-white rounded-md py-1.5 font-medium hover:bg-teal-600 transition-colors">
            Upgrade — £19.99/yr
          </Link>
        </div>
      )}

      <div className="border-t py-4">
        <nav className="grid gap-1 px-2">
          <NavItem href="/login" icon={<LogOut className="size-5" />} label="Logout" active={false} />
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
  nested?: boolean;
}

function NavItem({ href, icon, label, active, nested = false }: NavItemProps) {
  const { collapsed, setCollapsed } = useSidebar();
  const { width } = useWindowSize();
  const handleClick = () => { if (width < 1280) setCollapsed(true); };

  if (collapsed) {
    return (
      <div className="relative group flex justify-center items-center">
        <Link href={href} className={cn("flex h-10 w-10 items-center justify-center rounded-md transition-colors", active ? "bg-teal-500 text-white" : "hover:bg-accent hover:text-accent-foreground")}>
          {icon}
        </Link>
      </div>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={cn("flex items-center gap-3 rounded-md px-3 py-2 xl:py-2.5 text-sm font-medium transition-colors", active ? "bg-teal-500 text-white" : "hover:bg-accent hover:text-accent-foreground", nested && "pl-6")}>
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
