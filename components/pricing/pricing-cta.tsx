import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export function PricingCta() {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-teal-900/40 to-slate-900 border border-teal-500/20 p-10 md:p-16 text-center text-white">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative z-10">
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-3">Ready to start?</p>
            <h2 className="text-4xl font-bold mb-4">Start your free trial today</h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
              No credit card required. Get 48 hours of full access and see why 12,000+ students trust Medical Exam UCAT for their UCAT preparation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["2-day free trial", "No card needed", "All 5 subtests", "£19.99/yr after trial"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-white/70">
                  <Check className="size-4 text-teal-400" /> {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold" asChild>
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/explore">Browse Mock Exams</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
