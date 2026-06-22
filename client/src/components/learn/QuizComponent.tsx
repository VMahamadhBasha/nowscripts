import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function QuizComponent({ quiz, onComplete }: { quiz: any, onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-center text-[#64748B]">No quiz available for this module yet.</div>;
  }

  const question = quiz.questions[currentQuestion];

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    const correct = index === question.correctOptionIndex;
    setIsCorrect(correct);
    setShowExplanation(true);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      onComplete(); // Mark module complete when quiz is finished
    }
  };

  if (quizFinished) {
    return (
      <div className="p-8 bg-[#FFFFFF] shadow-sm border border-[#E2E8F0] rounded-xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-now-primary/10 text-now-primary mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Quiz Completed!</h3>
        <p className="text-[#64748B] mb-6">You scored {score} out of {quiz.questions.length}.</p>
        <p className="text-now-primary font-medium">Your progress has been saved.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFFFFF] shadow-sm border border-[#E2E8F0] rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#0F172A]">Knowledge Check</h3>
        <span className="text-sm font-medium text-[#64748B]">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </span>
      </div>

      <div className="mb-8">
        <p className="text-lg text-[#0F172A] mb-6">{question.questionText}</p>
        <div className="space-y-3">
          {question.options.map((opt: string, idx: number) => {
            let btnClass = "border-[#E2E8F0] hover:border-[#00C08B] hover:bg-[#F8FAFC] text-[#0F172A] bg-white";
            if (showExplanation) {
              if (idx === question.correctOptionIndex) {
                btnClass = "border-now-primary bg-now-primary/10 text-now-primary font-medium";
              } else if (idx === selectedOption) {
                btnClass = "border-red-500 bg-red-500/10 text-red-500 font-medium";
              } else {
                btnClass = "border-[#E2E8F0] opacity-50 bg-white";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border transition-all ${btnClass}`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-now-primary/10 text-now-primary' : 'bg-red-500/10 text-red-400'}`}>
          <p className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
          <p className="text-sm opacity-90">{question.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <button 
          onClick={handleNext}
          className="w-full py-3 bg-now-primary hover:bg-now-accent text-white font-bold rounded-lg transition-colors"
        >
          {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
}
