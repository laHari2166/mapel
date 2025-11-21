
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateAiQuiz, type AiQuizOutput } from '@/ai/flows/ai-quiz-flow';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { Bot } from 'lucide-react';
import QuizDisplay from '@/components/quiz/quiz-display';
import { useProgress } from '@/hooks/use-progress';

const formSchema = z.object({
  topic: z.string().min(3, 'Please provide a topic.'),
});

export default function AiQuizGeneratorPage() {
  const { toast } = useToast();
  const { addXp } = useProgress();
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<AiQuizOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setQuiz(null);
    try {
      const generatedQuiz = await generateAiQuiz(values);
      setQuiz(generatedQuiz);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem generating your quiz. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCompleteQuiz = (score: number, total: number) => {
    const xpGained = (score / total) * 20; // Upto 20 xp for random quiz
    addXp(Math.round(xpGained));
  };
  
  const handleRestart = () => {
    setQuiz(null);
    form.reset();
  }

  if (isLoading) {
    return (
      <div className="mt-8 text-center">
          <Spinner className="h-8 w-8 inline-block" />
          <p className="mt-2 text-muted-foreground">The AI is crafting your challenge... get ready!</p>
      </div>
    );
  }

  if (quiz) {
    return (
        <div>
             <QuizDisplay quiz={quiz} onComplete={handleCompleteQuiz} onRestart={handleRestart} />
        </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="AI Battle Quiz"
        subtitle="Challenge the AI on any topic you can think of."
      />
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'><Bot /> Topic Generator</CardTitle>
              <CardDescription>
                What do you want to be quizzed on?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'The laws of thermodynamics', 'Indian history from 1857-1947', 'React.js hooks'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Spinner className="mr-2 h-4 w-4" />}
                Generate Quiz
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
