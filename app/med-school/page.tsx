import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function MedSchoolPage() {
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
            <Link href="/blog"       className="text-sm font-medium text-gray-600 hover:text-teal-600">Blog</Link>
            <Link href="/med-school" className="text-sm font-medium text-teal-600">Applying to Med School</Link>
            <Link href="/resources"  className="text-sm font-medium text-gray-600 hover:text-teal-600">Free Resources</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login"    className="text-sm font-semibold border-2 border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400">Login</Link>
            <Link href="/register" className="text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg">Try Free</Link>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-6 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] text-center">
        <div className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">Complete Guide</div>
        <h1 className="text-5xl font-black text-white mb-4">How to Apply to<br/>Medical School in the UK</h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">A step-by-step guide covering everything from GCSEs to your first day at medical school.</p>
      </div>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-10">Your Application Timeline</h2>
          <div className="relative pl-10">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-teal-500 to-[#0B1F3A]"></div>
            {[
              { year:"Years 10–11", title:"GCSEs — Building Your Foundation",      color:"#1B4F72", desc:"Most medical schools require 7–9 GCSEs at grade 7 or above, with particular attention to Science and Maths.", tip:"Prioritise Biology, Chemistry, Maths, and English. Aim for grade 7+ in all science subjects." },
              { year:"Years 12–13", title:"A-Levels — The Core Requirements",       color:"#117A65", desc:"Almost all medical schools require Chemistry as one of your A-Levels. Most require AAA or A*AA including Chemistry and one other science.", tip:"Chemistry is essential at most schools. Biology, Physics, or Maths for your second science." },
              { year:"Summer Before Y13", title:"UCAT — Register and Sit",         color:"#784212", desc:"UCAT registration opens in May/June. The test window is July–September. You can only sit the UCAT once per admissions cycle.", tip:"Begin practising at least 6–8 weeks before your test date. Use timed practice from week 3." },
              { year:"15 October", title:"UCAS Deadline — Submit Application",     color:"#512E5F", desc:"Submit your UCAS application including your personal statement (4,000 characters), reference, and predicted grades. Maximum 4 medical schools.", tip:"Start drafting your personal statement at least 3 months before the deadline." },
              { year:"Nov–Feb",    title:"Interviews — MMI or Panel",              color:"#922B21", desc:"Medical schools shortlist based on grades, UCAT scores, and personal statement. Most UK schools now use Multiple Mini Interviews (MMI).", tip:"Research each school's interview format in advance. Practice with mock MMI stations." },
              { year:"August",     title:"Results Day — Confirmation",             color:"#00A896", desc:"If you meet your conditions, your place is confirmed. If you narrowly miss, contact the university immediately — many will still accept you.", tip:"If unsuccessful, consider resitting or a gap year. Many doctors were not accepted first time." },
            ].map((s,i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div className="absolute -left-7 top-1 w-4 h-4 rounded-full border-2 border-white" style={{background:s.color}}></div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:s.color}}>{s.year}</div>
                <h3 className="text-xl font-black mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{s.desc}</p>
                <div className="bg-gray-50 border-l-4 rounded-r-xl p-3" style={{borderColor:s.color}}>
                  <p className="text-sm text-gray-500"><strong className="text-gray-700">Key action:</strong> {s.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UCAT table */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-8">The UCAT — Full Breakdown</h2>
          <div className="overflow-x-auto rounded-2xl shadow-sm">
            <table className="w-full">
              <thead><tr className="bg-[#0B1F3A] text-white">
                <th className="text-left px-5 py-3 text-sm font-semibold">Subtest</th>
                <th className="text-left px-5 py-3 text-sm font-semibold">Questions</th>
                <th className="text-left px-5 py-3 text-sm font-semibold">Time</th>
                <th className="text-left px-5 py-3 text-sm font-semibold">Scoring</th>
              </tr></thead>
              <tbody>
                {[
                  ["Verbal Reasoning (VR)","44","22 min","300–900"],
                  ["Decision Making (DM)","29","31 min","300–900"],
                  ["Quantitative Reasoning (QR)","36","25 min","300–900"],
                  ["Abstract Reasoning (AR)","50","12 min","300–900"],
                  ["Situational Judgement (SJT)","69","26 min","Band 1–4"],
                  ["Total / Full Exam","228","2h 16min","Max 3,600"],
                ].map(([n,q,t,s],i) => (
                  <tr key={i} className={i%2===0?"bg-white":"bg-gray-50"}>
                    <td className="px-5 py-3 text-sm font-semibold">{n}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{q}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{t}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-[#0B1F3A] text-center">
        <h2 className="text-2xl font-black text-white mb-3">Start Your UCAT Preparation</h2>
        <p className="text-white/60 mb-6">The UCAT is one of the most important parts of your application. Begin practising today.</p>
        <Link href="/register" className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-bold px-10 py-4 rounded-xl transition-colors">Start Free Trial →</Link>
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
