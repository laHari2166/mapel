
'use client';

import { useState } from 'react';
import type { Quiz } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Check, X, ChevronsRight, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizDisplayProps {
  quiz: Quiz;
  onComplete: (score: number, total: number) => void;
  onRestart?: () => void;
}

export default function QuizDisplay({ quiz, onComplete, onRestart }: QuizDisplayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    let finalScore = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (selectedAnswers[i] === quiz.questions[i].correctAnswer) {
        finalScore++;
      }
    }
    setScore(finalScore);
    setIsSubmitted(true);
    onComplete(finalScore, quiz.questions.length);
  };
  
  const handleRestartQuiz = () => {
    if (onRestart) {
        onRestart();
    } else {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setIsSubmitted(false);
        setScore(0);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
          <CardDescription>You scored {score} out of {quiz.questions.length}.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You earned {Math.round((score / quiz.questions.length) * 20)} XP!</p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Your Answers:</h3>
            <div className="space-y-4">
              {quiz.questions.map((q, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={index} className="p-3 rounded-lg border bg-muted/30">
                    <p className="font-medium">{q.question}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {isCorrect ? <Check className="h-5 w-5 text-green-500"/> : <X className="h-5 w-5 text-red-500"/>}
                      <p className={cn("text-sm", isCorrect ? "text-green-500" : "text-red-500")}>
                        Your answer: {userAnswer || 'Not answered'}
                      </p>
                    </div>
                    {!isCorrect && (
                      <p className="text-sm text-muted-foreground mt-1">Correct answer: {q.correctAnswer}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleRestartQuiz}>
                <RefreshCcw className="mr-2 h-4 w-4"/>
                {onRestart ? 'New Quiz' : 'Restart Quiz'}
            </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
            <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
                <p className="font-semibold mb-4">{currentQuestion.question}</p>
                <RadioGroup
                    value={selectedAnswers[currentQuestionIndex]}
                    onValueChange={handleOptionSelect}
                    className="space-y-2"
                >
                    {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                        <Label htmlFor={`q${currentQuestionIndex}-o${index}`}>{option}</Label>
                    </div>
                    ))}
                </RadioGroup>
            </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {Object.keys(selectedAnswers).length} / {quiz.questions.length} answered
        </div>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]}>
            Next <ChevronsRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}>
            Submit Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
