"use client";
import { Menu } from "lucide-react";
import { useSidebar } from "./sidebar-context";

export function Header() {
  const { setCollapsed } = useSidebar();
  return (
    <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b bg-card h-14">
      <button onClick={() => setCollapsed(false)} className="text-muted-foreground hover:text-foreground">
        <Menu className="h-5 w-5" />
      </button>
      <span className="font-bold text-teal-500 text-sm">Medical Exam UCAT</span>
    </header>
  );
}
