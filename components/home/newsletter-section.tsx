"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-teal-900/40 to-slate-900 p-8 md:p-12 text-white border border-teal-500/20">
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">Free UCAT Tips</p>
          <h2 className="text-3xl font-bold mb-3">Get Weekly UCAT Prep Tips</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Join 5,000+ students receiving expert UCAT strategies, question walkthroughs, and score-boosting techniques every week.
          </p>
        </div>
        <div className="flex gap-2 w-full max-w-sm">
          <Input placeholder="your@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11" />
          <Button className="bg-teal-500 hover:bg-teal-600 text-white h-11 px-5 font-semibold">
            Subscribe <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
        <p className="text-xs text-white/30">
          No spam. Unsubscribe anytime. Or{" "}
          <Link href="/register" className="text-teal-400 hover:underline">start your free trial</Link> now.
        </p>
      </div>
    </section>
  );
}
