"use client";
import Link from "next/link";
import { useState } from "react";
import { Stethoscope, BookOpen, Brain, Calculator, Eye, Users, FileText, ChevronRight, CheckCircle, Star, Menu, X } from "lucide-react";

export default function HomePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"login"|"register">("register");
  const [showModal, setShowModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL || "https://iwav64juaj.execute-api.eu-west-2.amazonaws.com/prod/api";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(loginForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("medexam_token", data.data.token);
      localStorage.setItem("medexam_user", JSON.stringify(data.data.user));
      window.location.href = "/dashboard";
    } catch(err:any) { setError(err.message); setLoading(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(regForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("medexam_token", data.data.token);
      localStorage.setItem("medexam_user", JSON.stringify(data.data.user));
      window.location.href = "/dashboard";
    } catch(err:any) { setError(err.message); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-teal-600 leading-tight">Medical Exam</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest leading-tight">UCAT</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">About</Link>
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">Blog</Link>
            <Link href="/med-school" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">Applying to Med School</Link>
            <Link href="/resources" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">Free Resources</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => { setActiveTab("login"); setShowModal(true); }}
              className="text-sm font-semibold text-gray-700 border-2 border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400 transition-colors">
              Login
            </button>
            <button onClick={() => { setActiveTab("register"); setShowModal(true); }}
              className="text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg transition-colors">
              Try Free
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            <Link href="/about" className="block text-sm font-medium text-gray-600 py-2">About</Link>
            <Link href="/blog" className="block text-sm font-medium text-gray-600 py-2">Blog</Link>
            <Link href="/med-school" className="block text-sm font-medium text-gray-600 py-2">Applying to Med School</Link>
            <Link href="/resources" className="block text-sm font-medium text-gray-600 py-2">Free Resources</Link>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setActiveTab("login"); setShowModal(true); setMobileMenu(false); }}
                className="flex-1 text-sm font-semibold border-2 border-gray-200 py-2 rounded-lg">Login</button>
              <button onClick={() => { setActiveTab("register"); setShowModal(true); setMobileMenu(false); }}
                className="flex-1 text-sm font-semibold bg-teal-500 text-white py-2 rounded-lg">Try Free</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 text-teal-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
              UK Medical School Preparation
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Ace Your UCAT.<br/>
              <span className="text-teal-400">Get Into Med School.</span>
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-8 max-w-lg">
              500+ practice questions, full timed mock exams, and detailed explanations across all 5 UCAT subtests. Built for UK medical school applicants.
            </p>
            <div className="flex gap-4 flex-wrap mb-10">
              <button onClick={() => { setActiveTab("register"); setShowModal(true); }}
                className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-teal-500/30">
                Start Free Trial →
              </button>
              <Link href="/med-school"
                className="px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-colors">
                Learn More
              </Link>
            </div>
            <div className="flex gap-8">
              {[["500+","Questions"],["5","Subtests"],["£29.99","Per Year"],["Free","2-Day Trial"]].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-white">{v}</div>
                  <div className="text-xs text-white/50">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Score card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Your UCAT Progress</p>
              {[
                { name:"Verbal Reasoning",      code:"VR",  score:720, pct:82, color:"#1B4F72" },
                { name:"Decision Making",       code:"DM",  score:690, pct:74, color:"#117A65" },
                { name:"Quantitative Reasoning",code:"QR",  score:760, pct:91, color:"#784212" },
                { name:"Abstract Reasoning",    code:"AR",  score:660, pct:68, color:"#512E5F" },
                { name:"Situational Judgement", code:"SJT", score:null,pct:88, color:"#922B21" },
              ].map(s => (
                <div key={s.code} className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white/80 truncate">{s.name}</div>
                    <div className="h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width:`${s.pct}%`, background: s.color }}></div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-white flex-shrink-0">{s.score || "Band 1"}</div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
                <span className="text-xs text-white/40">Total Cognitive Score</span>
                <span className="text-sm font-black text-teal-400">2,830 / 3,600</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBTESTS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full">What We Cover</span>
            <h2 className="text-4xl font-black mt-4 mb-4">All 5 UCAT Subtests</h2>
            <p className="text-gray-500 text-lg">Real exam-style questions with full explanations for every subtest</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { code:"VR",   name:"Verbal Reasoning",       icon:BookOpen,   color:"#1B4F72", bg:"#EBF5FB", q:44,  t:"22 min", desc:"Evaluate written information and draw logical conclusions from text." },
              { code:"DM",   name:"Decision Making",         icon:Brain,      color:"#117A65", bg:"#E8F8F5", q:29,  t:"31 min", desc:"Use logic to evaluate arguments and make sound decisions." },
              { code:"QR",   name:"Quantitative Reasoning",  icon:Calculator, color:"#784212", bg:"#FEF9EC", q:36,  t:"25 min", desc:"Solve numerical problems using tables, charts, and graphs." },
              { code:"AR",   name:"Abstract Reasoning",      icon:Eye,        color:"#512E5F", bg:"#F5EEF8", q:50,  t:"12 min", desc:"Identify patterns between abstract shapes under time pressure." },
              { code:"SJT",  name:"Situational Judgement",   icon:Users,      color:"#922B21", bg:"#FDEDEC", q:69,  t:"26 min", desc:"Assess real-world medical scenarios and professional behaviours." },
              { code:"FULL", name:"Full Mock Exam",          icon:FileText,   color:"#00A896", bg:"#E8F8F5", q:228, t:"2h 16m", desc:"Simulate the complete UCAT exam under real timed conditions." },
            ].map(s => (
              <button key={s.code} onClick={() => { setActiveTab("register"); setShowModal(true); }}
                className="text-left bg-white rounded-2xl p-6 border-2 border-transparent hover:border-current transition-all hover:shadow-lg hover:-translate-y-1 group"
                style={{ "--tw-ring-color": s.color } as any}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl" style={{ background: s.bg }}>
                  <s.icon className="h-6 w-6" style={{ color: s.color }} />
                </div>
                <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: s.color }}>{s.code}</div>
                <div className="text-lg font-bold mb-2">{s.name}</div>
                <div className="text-sm text-gray-500 mb-4">{s.desc}</div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{s.q} questions</span><span>·</span><span>{s.t}</span>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: s.color }}>
                  Practice Now <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full">Simple Pricing</span>
          <h2 className="text-4xl font-black mt-4 mb-4">One Plan, Full Access</h2>
          <p className="text-gray-500 text-lg mb-12">No hidden fees. No tiers. Just everything you need to ace the UCAT.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-2xl p-8 text-left">
              <div className="text-xl font-bold mb-1">Free Trial</div>
              <div className="text-5xl font-black mb-1">£0</div>
              <div className="text-sm text-gray-400 mb-6">2 days · card required</div>
              <ul className="space-y-3 mb-8">
                {["20 practice questions per day","All 5 UCAT subtests","Detailed explanations","Performance tracking"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => { setActiveTab("register"); setShowModal(true); }}
                className="w-full py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-colors">
                Start Free Trial
              </button>
            </div>
            <div className="border-2 border-teal-500 rounded-2xl p-8 text-left relative shadow-xl shadow-teal-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-4 py-1 rounded-full">★ Most Popular</div>
              <div className="text-xl font-bold mb-1">Annual Plan</div>
              <div className="text-5xl font-black mb-1">£29<span className="text-2xl">.99</span></div>
              <div className="text-sm text-gray-400 mb-6">per year · just £2.50/month</div>
              <ul className="space-y-3 mb-8">
                {["Unlimited practice questions","All 5 UCAT subtests","Full timed mock exams","Performance analytics","Daily challenges","12 months full access"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => { setActiveTab("register"); setShowModal(true); }}
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-colors">
                Get Full Access — £29.99
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name:"Aisha K.", school:"King's College London", score:"2,920", text:"The questions closely match the real UCAT. Explanations helped me understand exactly where I was going wrong." },
              { name:"James M.", school:"University of Edinburgh", score:"+400pts", text:"At £29.99 for the whole year this is incredible value. The daily challenge kept me motivated throughout." },
              { name:"Priya S.", school:"UCL Medical School", score:"Band 1 SJT", text:"The SJT practice here is the most realistic I found anywhere. Ended up with Band 1 — absolutely delighted." },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_,i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-teal-600">{t.school} · {t.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0B1F3A]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Ace Your UCAT?</h2>
          <p className="text-white/60 text-lg mb-8">Join students across the UK preparing for medical school. Start your free trial today.</p>
          <button onClick={() => { setActiveTab("register"); setShowModal(true); }}
            className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-teal-500/30 text-lg">
            Start Free Trial →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1F3A] border-t border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span className="text-white/60 text-sm">© {new Date().getFullYear()} Medical Exam UCAT</span>
          </div>
          <div className="flex gap-6">
            <Link href="/about"      className="text-white/40 hover:text-teal-400 text-sm transition-colors">About</Link>
            <Link href="/blog"       className="text-white/40 hover:text-teal-400 text-sm transition-colors">Blog</Link>
            <Link href="/med-school" className="text-white/40 hover:text-teal-400 text-sm transition-colors">Med School</Link>
            <Link href="/resources"  className="text-white/40 hover:text-teal-400 text-sm transition-colors">Resources</Link>
            <Link href="/support"    className="text-white/40 hover:text-teal-400 text-sm transition-colors">Support</Link>
          </div>
        </div>
      </footer>

      {/* LOGIN/REGISTER MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1 mb-6">
              <button onClick={() => { setActiveTab("login"); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab==="login" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}>
                Sign In
              </button>
              <button onClick={() => { setActiveTab("register"); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab==="register" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}>
                Create Account
              </button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">{error}</div>}

            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required value={loginForm.email} onChange={e => setLoginForm(f=>({...f,email:e.target.value}))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" placeholder="you@example.com" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <Link href="/forgot-password" className="text-xs text-teal-600 hover:underline">Forgot?</Link>
                  </div>
                  <input type="password" required value={loginForm.password} onChange={e => setLoginForm(f=>({...f,password:e.target.value}))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" placeholder="••••••••" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input type="text" required value={regForm.firstName} onChange={e => setRegForm(f=>({...f,firstName:e.target.value}))}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input type="text" required value={regForm.lastName} onChange={e => setRegForm(f=>({...f,lastName:e.target.value}))}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required value={regForm.email} onChange={e => setRegForm(f=>({...f,email:e.target.value}))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" required minLength={8} value={regForm.password} onChange={e => setRegForm(f=>({...f,password:e.target.value}))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" placeholder="Min. 8 characters" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">
                  {loading ? "Creating account..." : "Start Free Trial"}
                </button>
                <p className="text-xs text-gray-400 text-center">By signing up you agree to our Terms and Privacy Policy</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
