"use client";
import { cn } from "@/lib/utils";
import { BarChart3, BookOpen, Brain, Calculator, Clock, CreditCard, Eye, FileText, Home, LifeBuoy, LogOut, Stethoscope, Users, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useSidebar } from "./sidebar-context";

const SUBTESTS = [
  { href: "/practice/vr",  Icon: BookOpen,   label: "Verbal Reasoning",       short: "VR",  color: "text-blue-400"   },
  { href: "/practice/dm",  Icon: Brain,       label: "Decision Making",        short: "DM",  color: "text-purple-400" },
  { href: "/practice/qr",  Icon: Calculator,  label: "Quantitative Reasoning", short: "QR",  color: "text-amber-400"  },
  { href: "/practice/ar",  Icon: Eye,         label: "Abstract Reasoning",     short: "AR",  color: "text-rose-400"   },
  { href: "/practice/sjt", Icon: Users,       label: "Situational Judgement",  short: "SJT", color: "text-teal-400"   },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const active = (p: string) => pathname === p || pathname.startsWith(p + "/");
  return (
    <aside className={cn("max-xl:fixed max-xl:top-0 max-xl:left-0 max-xl:h-full xl:sticky top-0 flex h-screen flex-col border-r bg-background transition-all duration-300", collapsed ? "w-[250px] xl:w-[70px]" : "w-[250px]", collapsed ? "max-xl:-translate-x-full" : "max-xl:translate-x-0")}>
      <div className={`flex h-16 items-center gap-2 border-b px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500"><Stethoscope className="h-4 w-4 text-white" /></div>
          {!collapsed && <div className="leading-tight"><div className="text-sm font-bold text-teal-400">Medical Exam</div><div className="text-xs text-muted-foreground uppercase tracking-widest">UCAT</div></div>}
        </Link>
        <button className="xl:hidden" onClick={() => setCollapsed(!collapsed)}><X className="size-5" /></button>
      </div>
      <div className="flex-1 overflow-auto py-3">
        <nav className="grid gap-0.5 px-2">
          <NI href="/dashboard" icon={<Home className="size-5"/>} label="Dashboard" active={active("/dashboard")} collapsed={collapsed} set={setCollapsed}/>
          {!collapsed && <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Question Banks</p>}
          {collapsed && <div className="my-2 border-t"/>}
          {SUBTESTS.map(({href,Icon,label,short,color}) => {
            const on = active(href);
            return collapsed ? (
              <div key={href} className="flex justify-center"><Link href={href} className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"><Icon className={cn("size-4", on?"text-white":color)}/></Link></div>
            ) : (
              <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", on?"bg-teal-500 text-white":"hover:bg-accent")}>
                <Icon className={cn("size-4", on?"text-white":color)}/><span className="flex-1">{label}</span><span className={cn("text-xs font-bold", on?"text-white/80":color)}>{short}</span>
              </Link>
            );
          })}
          {!collapsed && <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Practice Tests</p>}
          {collapsed && <div className="my-2 border-t"/>}
          <NI href="/practice/full-mock" icon={<FileText className="size-5"/>} label="Full Mock Exam"  active={active("/practice/full-mock")} collapsed={collapsed} set={setCollapsed}/>
          <NI href="/practice/timed"     icon={<Clock className="size-5"/>}    label="Timed Practice"  active={active("/practice/timed")}     collapsed={collapsed} set={setCollapsed}/>
          <NI href="/daily-challenge"    icon={<Zap className="size-5"/>}      label="Daily Challenge" active={active("/daily-challenge")}    collapsed={collapsed} set={setCollapsed}/>
          {!collapsed && <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">My Progress</p>}
          {collapsed && <div className="my-2 border-t"/>}
          <NI href="/analytics" icon={<BarChart3 className="size-5"/>}  label="My Analytics"  active={active("/analytics")} collapsed={collapsed} set={setCollapsed}/>
          {!collapsed && <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>}
          {collapsed && <div className="my-2 border-t"/>}
          <NI href="/pricing" icon={<CreditCard className="size-5"/>} label="Subscription"   active={active("/pricing")} collapsed={collapsed} set={setCollapsed}/>
          <NI href="/support" icon={<LifeBuoy className="size-5"/>}   label="Help and Support" active={active("/support")} collapsed={collapsed} set={setCollapsed}/>
        </nav>
      </div>
      <div className="border-t py-3"><nav className="grid gap-0.5 px-2">
        <NI href="/login" icon={<LogOut className="size-5"/>} label="Logout" active={false} collapsed={collapsed} set={setCollapsed}/>
      </nav></div>
    </aside>
  );
}

function NI({href,icon,label,active,collapsed,set}:{href:string;icon:React.ReactNode;label:string;active?:boolean;collapsed:boolean;set:(v:boolean)=>void}) {
  if (collapsed) return <div className="flex justify-center"><Link href={href} className={cn("flex h-10 w-10 items-center justify-center rounded-md transition-colors",active?"bg-teal-500 text-white":"hover:bg-accent")}>{icon}</Link></div>;
  return <Link href={href} onClick={()=>{if(window.innerWidth<1280)set(true)}} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",active?"bg-teal-500 text-white":"hover:bg-accent")}><span>{icon}</span><span>{label}</span></Link>;
}
