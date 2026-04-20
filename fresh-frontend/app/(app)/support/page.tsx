"use client";
import { useState } from "react";
import { LifeBuoy, Mail, ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  { q: "How does the free trial work?", a: "Your 2-day free trial starts when you create your account. During the trial you can access 20 practice questions per day across all 5 UCAT subtests. A card is required to start the trial — you won't be charged unless you upgrade." },
  { q: "What happens after my trial ends?", a: "After 48 hours your trial expires. You'll need to subscribe (£29.99/year) to continue accessing questions. Your progress and account are saved." },
  { q: "How many questions are in the database?", a: "We currently have 100 questions per subtest — 500 questions in total. New questions are added regularly." },
  { q: "What does the annual subscription include?", a: "Unlimited practice questions, all 5 UCAT subtests, full timed mock exams, detailed explanations, performance analytics, and daily challenges. Valid for 12 months." },
  { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime. Your access continues until the end of your billing period. Contact support@medicalexamucat.co.uk to cancel." },
  { q: "How is the UCAT scored?", a: "VR, DM, QR and AR are each scored 300–900. SJT is scored in bands 1–4 (1 being highest). Your total cognitive score is the sum of the four cognitive subtests (max 3,600). Most medical schools look for scores above 2,700." },
  { q: "What are the 5 UCAT subtests?", a: "Verbal Reasoning (VR), Decision Making (DM), Quantitative Reasoning (QR), Abstract Reasoning (AR), and Situational Judgement (SJT)." },
  { q: "I haven't received my verification email. What should I do?", a: "Check your spam/junk folder first. If it's not there, go to the login page and use 'Resend verification email'. Contact support if the issue persists." },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number|null>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LifeBuoy className="h-6 w-6 text-teal-500" /> Help & Support
        </h1>
        <p className="text-muted-foreground mt-1">Find answers or get in touch</p>
      </div>

      {/* Contact */}
      <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="p-3 bg-teal-500 rounded-xl text-white flex-shrink-0">
          <Mail className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">Email Support</p>
          <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
        </div>
        <a href="mailto:support@medicalexamucat.co.uk"
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors flex-shrink-0">
          support@medicalexamucat.co.uk
        </a>
      </div>

      {/* FAQs */}
      <div>
        <h2 className="text-lg font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-card border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open===i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors">
                <span className="font-semibold text-sm pr-4">{faq.q}</span>
                {open===i ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
              </button>
              {open===i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t bg-muted/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
