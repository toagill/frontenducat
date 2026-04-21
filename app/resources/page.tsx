import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function ResourcesPage() {
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
            <Link href="/med-school" className="text-sm font-medium text-gray-600 hover:text-teal-600">Applying to Med School</Link>
            <Link href="/resources"  className="text-sm font-medium text-teal-600">Free Resources</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login"    className="text-sm font-semibold border-2 border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400">Login</Link>
            <Link href="/register" className="text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg">Try Free</Link>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-6 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] text-center">
        <div className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">100% Free</div>
        <h1 className="text-5xl font-black text-white mb-4">Free UCAT Resources</h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto">Everything you need to understand the UCAT, plan your preparation, and improve your score — completely free.</p>
      </div>

      {/* Top Tips */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black mb-8">10 Essential UCAT Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["Start early — 6–8 weeks minimum","The UCAT tests cognitive abilities that improve with practice. Most top-quartile students began at least 6 weeks before their test."],
              ["Always attempt every question","There is no negative marking. A blank answer is always wrong — a guess gives you a chance. Never leave anything blank."],
              ["Practice under timed conditions","Switch from untimed to timed practice from week 3 onwards. The UCAT is about speed as much as accuracy."],
              ["Review every wrong answer","Don't just do questions — understand why you got them wrong. This is where most improvement happens."],
              ["Flag and move on","If a question takes too long, flag it and come back. Never spend more than 90 seconds on a single question."],
              ["Do at least 2 full mock exams","The stamina required for 2+ hours is underestimated. Practice the full exam under realistic conditions at least twice."],
              ["Use the on-screen calculator","You must use the UCAT on-screen calculator. Practice using it for speed before your test day."],
              ["Know each subtest's quirks","VR: answers are in the text only. AR: SCANS method. QR: estimate first. DM: draw Venn diagrams for syllogisms."],
              ["Maintain your wellbeing","Sleep, exercise, and mental breaks are essential for cognitive performance. Burnout before the exam will hurt your score."],
              ["Know test centre rules","Arrive 30 min early. Bring valid photo ID. No phones or notes. You get a laminated notepad for working."],
            ].map(([t,d],i) => (
              <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-black text-sm flex-shrink-0">{i+1}</div>
                <div><div className="font-bold text-sm mb-1">{t}</div><div className="text-sm text-gray-500 leading-relaxed">{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtest strategies */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black mb-8">Strategies by Subtest</h2>
          <div className="space-y-4">
            {[
              { code:"VR", name:"Verbal Reasoning",       color:"#1B4F72", time:"~30 sec/q", tips:["Read the question first, then scan the passage","True/False/Can't Tell — use only what's in the text","Use keywords to locate the relevant sentence","Don't use outside knowledge — ever"] },
              { code:"DM", name:"Decision Making",        color:"#117A65", time:"~64 sec/q", tips:["Draw Venn diagrams for all syllogism questions","Set up probability calculations before answering","Identify conclusion and premises in argument questions","Watch for averages vs totals in statistics"] },
              { code:"QR", name:"Quantitative Reasoning", color:"#784212", time:"~42 sec/q", tips:["Read the table/graph before answering","Estimate where answer choices are spread apart","Check units — conversion errors are common","Percentage change = (new − old) / old × 100"] },
              { code:"AR", name:"Abstract Reasoning",     color:"#512E5F", time:"~14 sec/q", tips:["Use SCANS: Shape, Colour, Arrangement, Number, Size","Never spend more than 20 seconds on one question","Look for the simplest rule first","Practise 15 minutes every day — consistency beats long sessions"] },
              { code:"SJT",name:"Situational Judgement",  color:"#922B21", time:"~23 sec/q", tips:["Patient safety always comes first","Know GMC Good Medical Practice before your exam","Appropriateness vs Importance — know the difference","Don't default to extremes — many answers are 'appropriate but not ideal'"] },
            ].map(s => (
              <div key={s.code} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{background:s.color}}>{s.code}</div>
                  <div><div className="font-bold">{s.name}</div><div className="text-xs text-gray-400">{s.time} per question</div></div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 px-5 pb-5">
                  {s.tips.map((t,i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 leading-relaxed">💡 {t}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 week plan */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black mb-2">6-Week Study Plan</h2>
          <p className="text-gray-500 mb-8">Assuming 1–2 hours of study per day</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { week:"Week 1", title:"Verbal Reasoning",           color:"#1B4F72", tasks:"Learn True/False/Can't Tell logic. Practice 20 untimed passages. Study keyword scanning. Do 1 timed VR session." },
              { week:"Week 2", title:"Decision Making",            color:"#117A65", tasks:"Study syllogism and Venn diagram methods. Practice probability and statistical reasoning. Work through 30 DM questions." },
              { week:"Week 3", title:"Quantitative Reasoning",     color:"#784212", tasks:"Practice on-screen calculator. Learn to read tables quickly. Focus on percentages, ratios, units. Do 1 timed QR session." },
              { week:"Week 4", title:"Abstract & SJT",             color:"#512E5F", tasks:"Learn SCANS method for AR. Do 15 min daily AR. Read GMC Good Medical Practice. Work through 30 SJT questions." },
              { week:"Week 5", title:"Mixed Practice & Weak Areas",color:"#922B21", tasks:"Mixed questions daily. Identify 2 weakest subtests from analytics. Extra focus there. Complete Mock Exam 1." },
              { week:"Week 6", title:"Full Mock & Final Polish",   color:"#00A896", tasks:"Complete Mock Exam 2 under full conditions. Review all errors. Reduce volume 2 days before exam. Rest the day before." },
            ].map(w => (
              <div key={w.week} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="text-xs font-black uppercase tracking-widest mb-1" style={{color:w.color}}>{w.week}</div>
                <div className="font-black text-lg mb-3">{w.title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{w.tasks}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-[#0B1F3A] text-center">
        <h2 className="text-2xl font-black text-white mb-3">Put It Into Practice</h2>
        <p className="text-white/60 mb-6">Apply these strategies with real UCAT-style questions today.</p>
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
