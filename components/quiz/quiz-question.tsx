"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface QuestionOption { id: string; text: string; }
interface QuestionProps {
  question: { id: string; text: string; options: QuestionOption[]; correctOptionId: string; };
  selectedOptionId: string | null;
  correctOptionId?: string;
  onSelectOption: (questionId: string, optionId: string) => void;
  isReviewMode?: boolean;
}

export function QuizQuestion({ question, selectedOptionId, correctOptionId, onSelectOption, isReviewMode = false }: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(selectedOptionId);
  const [answered, setAnswered] = useState<boolean>(!!selectedOptionId);

  useEffect(() => {
    setSelectedOption(selectedOptionId);
    setAnswered(!!selectedOptionId);
  }, [selectedOptionId]);

  const handleOptionSelect = (optionId: string) => {
    if (answered || isReviewMode) return;
    setSelectedOption(optionId);
    setAnswered(true);
    onSelectOption(question.id, optionId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold leading-tight">{question.text}</h2>
      <div className="space-y-3 mt-6">
        {question.options.map((option) => {
          const isCorrect = option.id === question.correctOptionId;
          const isSelected = option.id === selectedOption;
          const showCorrect = (isReviewMode || answered) && isCorrect;
          const showIncorrect = (isReviewMode || answered) && isSelected && !isCorrect;
          return (
            <div key={option.id}>
              <Button variant="outline"
                className={`w-full justify-start text-left h-auto py-4 px-6 transition-all duration-200
                  ${isSelected ? "border-2 shadow-md" : ""}
                  ${showCorrect ? "bg-green-50 border-green-500" : ""}
                  ${showIncorrect ? "bg-red-50 border-red-500" : ""}
                  hover:bg-accent/80`}
                onClick={() => handleOptionSelect(option.id)}
                disabled={answered || isReviewMode}>
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-medium">
                      {option.id.toUpperCase()}
                    </span>
                    <span className="text-base">{option.text}</span>
                  </div>
                  {showCorrect   && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                  {showIncorrect && <XCircle     className="h-5 w-5 text-red-500 flex-shrink-0"   />}
                </div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
