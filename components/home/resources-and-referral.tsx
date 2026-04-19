"use client";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Lightbulb, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ResourcesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const tips = [
    {
      id: 1,
      title: "How to approach Verbal Reasoning passages",
      icon: <TrendingUp className="h-5 w-5 text-teal-500" />,
      description: "Learn skimming strategies and how to identify key information quickly under timed conditions.",
    },
    {
      id: 2,
      title: "Decision Making: logic and probability tips",
      icon: <Lightbulb className="h-5 w-5 text-purple-500" />,
      description: "Break down complex arguments and improve your accuracy on syllogisms and Venn diagrams.",
    },
    {
      id: 3,
      title: "Writing questions that test real understanding",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
      description: "Craft practice questions that reflect real UCAT-style challenges.",
    },
    {
      id: 4,
      title: "Abstract Reasoning: pattern recognition techniques",
      icon: <Lightbulb className="h-5 w-5 text-blue-500" />,
      description: "Develop a systematic approach to identify patterns quickly and accurately.",
    },
    {
      id: 5,
      title: "Managing time across all five subtests",
      icon: <Clock className="h-5 w-5 text-indigo-500" />,
      description: "Find the right pacing strategy so you never run out of time on exam day.",
    },
    {
      id: 6,
      title: "Situational Judgement: what assessors look for",
      icon: <Lightbulb className="h-5 w-5 text-pink-500" />,
      description: "Understand the professional values underpinning every SJT scenario.",
    },
  ];

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 xl:py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto xl:px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">UCAT Study Resources</h2>
            <p className="text-muted-foreground text-sm mt-1">Tips and strategies to help you prepare</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {tips.map((tip) => (
            <Card key={tip.id} className="min-w-[260px] max-w-[260px] flex-shrink-0">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  {tip.icon}
                  <span className="text-sm font-semibold line-clamp-2">{tip.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{tip.description}</p>
                <Link href="/creator-tips" className="inline-flex items-center gap-1 text-xs text-teal-500 hover:underline">
                  Read more <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
