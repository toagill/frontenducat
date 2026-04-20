"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Trophy, Clock, RotateCcw } from "lucide-react";

interface QuizResultsProps {
  results: any;
  quiz: any;
  onRestart: () => void;
  onReview: () => void;
  onExit: () => void;
}

export function QuizResults({ results, quiz, onRestart, onReview, onExit }: QuizResultsProps) {
  if (!results) return null;
  const { totalQuestions, correctAnswers, score, totalTime } = results;
  const mins = Math.floor(totalTime / 60);
  const secs = totalTime % 60;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
        <p className="text-muted-foreground">Here's how you did</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Score",    value: `${score}%`,         icon: Trophy,       color: "text-yellow-500" },
          { label: "Correct",  value: `${correctAnswers}/${totalQuestions}`, icon: CheckCircle, color: "text-green-500" },
          { label: "Wrong",    value: `${totalQuestions - correctAnswers}`, icon: XCircle, color: "text-red-500" },
          { label: "Time",     value: `${mins}:${secs.toString().padStart(2,"0")}`, icon: Clock, color: "text-blue-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-6 text-center">
              <Icon className={`h-8 w-8 ${color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-3 justify-center flex-wrap">
        <Button onClick={onReview} variant="outline" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> Review Answers
        </Button>
        <Button onClick={onRestart} variant="outline" className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" /> Try Again
        </Button>
        <Button onClick={onExit}>Exit Quiz</Button>
      </div>
    </div>
  );
}
