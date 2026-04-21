"use client";
import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center"><Stethoscope className="h-5 w-5 text-white" /></div>
            <div><div className="text-sm font-bold text-teal-600">Medical Exam</div><div className="text-xs text-gray-400 uppercase tracking-widest">UCAT</div></div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium text-teal-600">About</Link>
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-teal-600">Blog</Link>
            <Link href="/med-school" className="text-sm font-medium text-gray-600 hover:text-teal-600">Applying to Med School</Link>
            <Link href="/resources" className="text-sm font-medium text-gray-600 hover:text-teal-600">Free Resources</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="text-sm font-semibold border-2 border-gray-200 px-4 py-2 rounded-lg">Login</Link>
            <Link href="/register" className="text-sm font-semibold text-white bg-teal-500 px-4 py-2 rounded-lg">Try Free</Link>
          </div>
        </div>
      </nav>
      <div className="pt-28 pb-16 px-6 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] text-center">
        <div className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">About Us</div>
        <h1 className="text-5xl font-black text-white mb-4">Built by Students, For Students</h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto">We built Medical Exam UCAT because we could not find an affordable high-quality UCAT prep platform. So we created one.</p>
      </div>
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black mb-4">Why We Built This</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Preparing for the UCAT is stressful enough without spending hundreds of pounds on materials. We saw students paying over 200 pounds for courses that were outdated and did not reflect the real exam.</p>
            <p className="text-gray-600 leading-relaxed">We set out to create a platform that gives every aspiring doctor access to genuinely high-quality UCAT preparation at a fair price. 29.99 pounds for a full year.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
            {[["500+","Practice questions"],["29.99","Full year access"],["5","UCAT subtests"],["Free","2-day trial"]].map(([v,l]) => (
              <div key={l} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="text-3xl font-black text-teal-500">{v}</div>
                <div className="text-sm text-gray-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-[#0B1F3A] text-center">
        <h2 className="text-3xl font-black text-white mb-4">Ready to Start?</h2>
        <p className="text-white/60 mb-8">Join students across the UK preparing for medical school.</p>
        <Link href="/register" className="inline-block bg-teal-500 text-white font-bold px-10 py-4 rounded-xl">Start Free Trial</Link>
      </section>
    </div>
  );
}
