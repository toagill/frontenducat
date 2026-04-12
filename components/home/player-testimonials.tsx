import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Hartley",
    role: "Now studying Medicine at UCL",
    score: "3,220 UCAT Score",
    text: "Medical Exam UCAT was the only platform that actually replicated the real exam experience. My VR score jumped from 620 to 760 after 3 weeks of daily practice.",
    stars: 5,
  },
  {
    name: "James Okoye",
    role: "Accepted to University of Edinburgh",
    score: "Top 10% nationwide",
    text: "The timed mock exams were exactly what I needed. The instant feedback on every question and the percentile tracking helped me identify my weak areas fast.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Imperial College Medicine offer",
    score: "3,140 UCAT Score",
    text: "I tried other platforms but the question quality here is so much better. The abstract reasoning section alone is worth the £19.99. Incredible value.",
    stars: 5,
  },
  {
    name: "Tom Richards",
    role: "University of Bristol, Year 1",
    score: "Band 1 SJT",
    text: "The SJT practice on this platform is outstanding. I went into my real exam feeling completely prepared because the scenarios were so realistic.",
    stars: 5,
  },
  {
    name: "Aisha Khan",
    role: "King's College London offer",
    score: "+180pts improvement",
    text: "Started with a score of 2,490 and ended up getting 2,670 in the real thing. The analytics showed me exactly where I was losing marks.",
    stars: 5,
  },
  {
    name: "Daniel Wu",
    role: "University of Cambridge offer",
    score: "97th percentile",
    text: "The full mock exams were critical for my preparation. Doing them under timed conditions every day built my speed and stamina. Highly recommend.",
    stars: 5,
  },
];

export function PlayerTestimonials() {
  return (
    <section>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">What Our Students Say</h2>
        <p className="text-muted-foreground mt-1 text-sm">Thousands of students have used Medical Exam UCAT to secure their medical school offers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <Card key={t.name} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 space-y-3">
              <div className="flex">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="size-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
              <div className="pt-2 border-t">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
                <p className="text-xs text-teal-400 font-medium mt-0.5">{t.score}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
