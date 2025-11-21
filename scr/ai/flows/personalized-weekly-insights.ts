
'use server';

/**
 * @fileOverview Provides personalized weekly insights and motivational messages for students.
 *
 * - getPersonalizedWeeklyInsights - A function that generates personalized weekly insights.
 * - PersonalizedWeeklyInsightsInput - The input type for the getPersonalizedWeeklyInsights function.
 * - PersonalizedWeeklyInsightsOutput - The return type for the getPersonalizedWeeklyInsights function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const PersonalizedWeeklyInsightsInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  completedChapters: z.number().describe('The number of chapters the student has completed this week.'),
  streak: z.number().describe('The current streak of the student in days.'),
  xp: z.number().describe('The total XP of the student.'),
});
export type PersonalizedWeeklyInsightsInput = z.infer<typeof PersonalizedWeeklyInsightsInputSchema>;

const PersonalizedWeeklyInsightsOutputSchema = z.object({
  insight: z.string().describe('A personalized weekly insight and motivational message for the student.'),
});
export type PersonalizedWeeklyInsightsOutput = z.infer<typeof PersonalizedWeeklyInsightsOutputSchema>;

export async function getPersonalizedWeeklyInsights(input: PersonalizedWeeklyInsightsInput): Promise<PersonalizedWeeklyInsightsOutput> {
  return personalizedWeeklyInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedWeeklyInsightsPrompt',
  input: {schema: PersonalizedWeeklyInsightsInputSchema},
  output: {schema: PersonalizedWeeklyInsightsOutputSchema},
  model: 'gemini-1.5-flash',
  prompt: `You are an AI motivation assistant for students. Your goal is to provide personalized weekly insights and motivational messages based on the student's performance.\n\n  Student Name: {{{studentName}}}\n  Completed Chapters This Week: {{{completedChapters}}}\n  Current Streak: {{{streak}}} days\n  Total XP: {{{xp}}}\n\n  Generate a short, encouraging message that motivates the student to continue their studies. Be specific and highlight their achievements. The message should be no more than one sentence. Be enthusiastic and encouraging, use GenZ slang.`,
});

const personalizedWeeklyInsightsFlow = ai.defineFlow(
  {
    name: 'personalizedWeeklyInsightsFlow',
    inputSchema: PersonalizedWeeklyInsightsInputSchema,
    outputSchema: PersonalizedWeeklyInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
