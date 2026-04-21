"use client";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center"><Stethoscope className="h-5 w-5 text-white" /></div>
            <div><div className="text-sm font-bold text-teal-600">Medical Exam</div><div className="text-xs text-gray-400 uppercase tracking-widest">UCAT</div></div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about"      className="text-sm font-medium text-teal-600">About</Link>
            <Link href="/blog"       className="text-sm font-medium text-gray-600 hover:text-teal-600">Blog</Link>
            <Link href="/med-school" className="text-sm font-medium text-gray-600 hover:text-teal-600">Applying to Med School</Link>
            <Link href="/resources"  className="text-sm font-medium text-gray-600 hover:text-teal-600">Free Resources</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login"    className="text-sm font-semibold border-2 border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400">Login</Link>
            <Link href="/register" className="text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg">Try Free</Link>
          </div>
        </div>
      </nav>
      {/* HERO */}
      <div className="pt-28 pb-16 px-6 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] text-center">
        <div className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">About Us</div>
        <h1 className="text-5xl font-black text-white mb-4">Built by Students,<br/>For Students</h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto">We built Medical Exam UCAT because we could not find an affordable, high-quality UCAT prep platform. So we created one.</p>
      </div>
      {/* OUR STORY */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">Our Story</div>
            <h2 className="text-3xl font-black mb-4">Why We Built This</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Preparing for the UCAT is stressful enough without spending hundreds of pounds on preparation materials. We saw students paying £200+ for courses that were outdated and didn't reflect the real exam.</p>
            <p className="text-gray-600 leading-relaxed">We set out to create a platform that gives every aspiring doctor access to genuinely high-quality UCAT preparation at a fair price. £29.99 for a full year. That's it.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
            {[["500+","Practice questions across all 5 subtests"],["£29.99","Full year — the most affordable platform"],["5","UCAT subtests fully covered"],["Free","2-day trial, no commitment"]].map(([v,l]) => (
              <div key={l} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="text-3xl font-black text-teal-500">{v}</div>
                <div className="text-sm text-gray-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* VALUES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">What We Believe</div>
            <h2 className="text-3xl font-black">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {icon:"🎯", title:"Accuracy First",       desc:"Every question matches the official UCAT format, difficulty, and style. No recycled content, no outdated material."},
              {icon:"💷", title:"Fair Pricing",          desc:"We believe cost should never be a barrier to medical school preparation. £29.99/year — not £200."},
              {icon:"📊", title:"Data-Driven Learning",  desc:"Our analytics help you understand exactly where you're strong and where you need to improve."},
              {icon:"🤝", title:"Student-Centred",       desc:"Every feature starts with the question: does this genuinely help students score higher on their UCAT?"},
              {icon:"🔒", title:"Transparency",          desc:"No hidden fees, no confusing tiers. A simple free trial, a simple annual price."},
              {icon:"🚀", title:"Continuous Improvement",desc:"We constantly review questions, add new content, and improve based on feedback from real students."},
            ].map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 transition-colors">
                <div className="text-3xl mb-3">{v.icon}</div>
                <div className="font-bold text-lg mb-2">{v.title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* TEAM */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">The People Behind It</div>
            <h2 className="text-3xl font-black">Meet the Team</h2>
          </div>
          <div className="grid md
cd ~/projectaws/medexam-clean
# Create blog page
cat > app/blog/page.tsx << 'EOF'
import Link from "next/link";
import { Stethoscope } from "lucide-react";
const POSTS = [
  { slug:"vr-strategy",   category:"VR Strategy",   color:"#1B4F72", bg:"#EBF5FB", icon:"📖", title:"The Only VR Strategy You Need: True/False/Can't Tell",       date:"April 2026",    read:"7 min",  desc:"Most students lose points in VR by overthinking. Here is the simple framework that gets you to the right answer every time." },
  { slug:"ar-scans",      category:"AR Strategy",   color:"#512E5F", bg:"#F5EEF8", icon:"👁️", title:"Abstract Reasoning: The SCANS Method That Gets You 700+",     date:"March 2026",    read:"9 min",  desc:"AR only gives you 14 seconds per question. This systematic approach means you never waste time searching aimlessly for patterns." },
  { slug:"sjt-band1",     category:"SJT Guide",     color:"#922B21", bg:"#FDEDEC", icon:"⚖️", title:"SJT Band 1: How to Think Like a Doctor",                      date:"March 2026",    read:"8 min",  desc:"The SJT tests your professional values, not your clinical knowledge. Here is what medical schools are actually looking for." },
  { slug:"work-exp",      category:"Application",   color:"#117A65", bg:"#E8F8F5", icon:"🩺", title:"Work Experience for Medicine: What Actually Counts",           date:"February 2026", read:"10 min", desc:"Medical schools want evidence of genuine insight into medicine. Here is how to get meaningful experience even without doctor connections." },
  { slug:"qr-tricks",     category:"QR Strategy",   color:"#784212", bg:"#FEF9EC", icon:"📊", title:"Quantitative Reasoning Speed Tricks That Actually Work",       date:"February 2026", read:"6 min",  desc:"The on-screen calculator is slow. These mental maths shortcuts will save you precious seconds on every QR question." },
  { slug:"mmi-guide",     category:"Interviews",    color:"#1B4F72", bg:"#EBF5FB", icon:"💬", title:"MMI Interview Guide: How to Ace Every Station",               date:"January 2026",  read:"11 min", desc:"Multiple Mini Interviews are unlike any interview you have done before. Here is exactly how to prepare." },
  { slug:"score-700",     category:"Strategy",      color:"#00A896", bg:"#E8F8F5", icon:"🎯", title:"How to Score 700+ in Every UCAT Subtest: Complete Guide",     date:"April 2026",    read:"12 min", desc:"Scoring 700+ in each subtest puts you in the top 25% of all UCAT candidates. Here is exactly how to get there." },
  { slug:"6-week-plan",   category:"Study Plan",    color:"#117A65", bg:"#E8F8F5", icon:"📅", title:"The 6-Week UCAT Study Plan That Actually Works",              date:"January 2026",  read:"8 min",  desc:"A structured week-by-week preparation plan used by students who scored in the top quartile of the UCAT." },
];
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center"><Stethoscope className="h-5 w-5 text-white" /></div>
            <div><div className="text-sm font-bold text-teal-600">Medical Exam</div><div className="text-xs text-gray-400 uppercase tracking-widest">UCAT</div></div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about"      className="text-sm font-medium text-gray-600 hover:text-teal-600">About</Link>
            <Link href="/blog"       className="text-sm font-medium text-teal-600">Blog</Link>
            <Link href="/med-school" className="text-sm font-medium text-gray-600 hover:text-teal-600">Applying to Med School</Link>
            <Link href="/resources"  className="text-sm font-medium text-gray-600 hover:text-teal-600">Free Resources</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login"    className="text-sm font-semibold border-2 border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400">Login</Link>
            <Link href="/register" className="text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg">Try Free</Link>
          </div>
        </div>
      </nav>
      <div className="pt-28 pb-16 px-6 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] text-center">
        <div className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">Insights & Advice</div>
        <h1 className="text-5xl font-black text-white mb-4">The UCAT Blog</h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto">Expert tips, student stories, and everything you need to know about applying to medical school in the UK.</p>
      </div>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Featured */}
          <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] rounded-2xl p-8 mb-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="text-6xl">🎯</div>
            <div className="flex-1">
              <div className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">📌 Featured</div>
              <h2 className="text-2xl font-black text-white mb-2">How to Score 700+ in Every UCAT Subtest: A Complete Strategy Guide</h2>
              <p className="text-white/60 text-sm mb-4">Scoring 700+ in each cognitive subtest puts you in the top 25% of all candidates — competitive at most UK medical schools.</p>
              <div className="flex gap-4 text-xs text-white/40 mb-4">
                <span>✍️ Sarah K.</span><span>📅 April 2026</span><span>⏱ 12 min read</span>
              </div>
              <Link href="/register" className="inline-block bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">Read Article →</Link>
            </div>
          </div>
          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.slice(0,6).map(p => (
              <Link href="/register" key={p.slug} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="p-8 text-4xl" style={{background:p.bg}}>{p.icon}</div>
                <div className="p-5">
                  <div className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-3" style={{background:p.bg,color:p.color}}>{p.category}</div>
                  <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-teal-600 transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{p.date}</span><span>{p.read} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-6 bg-[#0B1F3A] text-center">
        <h2 className="text-2xl font-black text-white mb-3">Put It Into Practice</h2>
        <p className="text-white/60 mb-6">Apply these strategies with real UCAT-style questions.</p>
        <Link href="/register" className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-3 rounded-xl transition-colors">Start Free Trial →</Link>
      </section>
      <footer className="bg-[#0B1F3A] border-t border-white/10 py-8 px-6 text-center">
        <p className="text-white/40 text-sm">© {new Date().getFullYear()} Medical Exam UCAT &nbsp;·&nbsp;
          {[["About","/about"],["Blog","/blog"],["Med School","/med-school"],["Resources","/resources"]].map(([l,h]) => (
            <Link key={h} href={h} className="text-teal-400 hover:underline mx-2">{l}</Link>
          ))}
        </p>
      </footer>
    </div>
  );
}
