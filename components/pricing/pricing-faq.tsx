import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the free trial work?",
    a: "When you register, you get 48 hours of full access — a card is required to start — cancel before 2 days to pay nothing. You can take mock exams, practice questions, and explore all 5 UCAT subtests. After 48 hours, you'll need to subscribe to continue.",
  },
  {
    q: "What's included in the £29.99 annual plan?",
    a: "You get 365 days of unlimited access to everything: 2,000+ practice questions across all 5 subtests, unlimited timed mock exams, detailed analytics and score tracking, worked solutions, percentile rankings, and the leaderboard.",
  },
  {
    q: "Is it a one-time payment or a subscription?",
    a: "It's a one-time payment of £29.99 that grants you 12 months of access. There are no recurring charges — you won't be auto-billed at renewal.",
  },
  {
    q: "What UCAT subtests are covered?",
    a: "All five: Verbal Reasoning (44Q, 22 min), Decision Making (29Q, 31 min), Quantitative Reasoning (36Q, 25 min), Abstract Reasoning (50Q, 12 min), and Situational Judgement (69Q, 26 min). You can practice each subtest individually or take full 2-hour mock exams.",
  },
  {
    q: "How accurate are your mock exams compared to the real UCAT?",
    a: "Our questions are crafted by doctors and UCAT specialists to mirror the real exam's difficulty, style, and timing. We regularly update our question bank based on student feedback and UCAT updates.",
  },
  {
    q: "Do you offer a refund if I'm not satisfied?",
    a: "Yes. If you're unhappy for any reason, email us within 7 days of purchase and we'll issue a full refund — no questions asked.",
  },
  {
    q: "Can I use the platform on mobile?",
    a: "Yes, the platform is fully responsive and works on phones, tablets, and desktop. We recommend desktop for the best exam simulation experience, as the real UCAT is taken on a computer.",
  },
  {
    q: "How is this different from other UCAT platforms?",
    a: "We focus purely on UCAT mock exam quality — not generic quiz functionality. Every question is written to UCAT standard, the timing matches the real exam exactly, and our analytics show you exactly where you're losing marks.",
  },
];

export function PricingFaq() {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about Medical Exam UCAT</p>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium text-sm py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
