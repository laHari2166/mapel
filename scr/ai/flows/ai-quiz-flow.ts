
'use server';

/**
 * @fileOverview Creates a quiz on a given topic using AI.
 *
 * - generateAiQuiz - A function that generates a quiz.
 * - AiQuizInput - The input type for the generateAiQuiz function.
 * - AiQuizOutput - The return type for the generateAiQuiz function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const AiQuizInputSchema = z.object({
  topic: z.string().describe('The topic for the quiz.'),
});
export type AiQuizInput = z.infer<typeof AiQuizInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string().describe("The question text."),
    options: z.array(z.string()).describe("An array of 4 possible answers."),
    correctAnswer: z.string().describe("The correct answer from the options array."),
});

const AiQuizOutputSchema = z.object({
  id: z.string().default(() => `ai-quiz-${Date.now()}`),
  title: z.string().describe("A short, engaging title for the quiz."),
  lessonId: z.string().default('ai-generated'),
  questions: z.array(QuizQuestionSchema).length(5).describe('An array of 5 quiz questions.'),
});
export type AiQuizOutput = z.infer<typeof AiQuizOutputSchema>;

export async function generateAiQuiz(input: AiQuizInput): Promise<AiQuizOutput> {
  return aiQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiQuizPrompt',
  input: {schema: AiQuizInputSchema},
  output: {schema: AiQuizOutputSchema},
  model: 'gemini-1.5-flash',
  prompt: `You are an expert quiz master. Create a 5-question multiple-choice quiz on the following topic.
Each question must have exactly 4 options. The questions should be challenging but fair, suitable for a student preparing for competitive exams.

Topic: {{{topic}}}

Generate the quiz with a title and the array of questions. Ensure one of the options is the correct answer.`,
});

const aiQuizFlow = ai.defineFlow(
  {
    name: 'aiQuizFlow',
    inputSchema: AiQuizInputSchema,
    outputSchema: AiQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
