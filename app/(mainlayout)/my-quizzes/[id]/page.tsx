import { QuizDetails } from "@/components/my-quizzes/quiz-details"
export const dynamic = "force-dynamic";

export default function QuizDetailsPage({ params }: { params: { id: string } }) {
  return <QuizDetails id={params.id} />
}
