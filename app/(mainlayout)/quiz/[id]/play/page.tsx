import { QuizPlay } from "@/components/quiz/quiz-play";
export const dynamic = "force-dynamic";
import { use } from "react";

export default function QuizPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <QuizPlay id={id} />;
}
