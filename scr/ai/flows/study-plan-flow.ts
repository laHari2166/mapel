
'use server';

/**
 * @fileOverview Creates a personalized study plan using AI.
 *
 * - generateStudyPlan - A function that generates a study schedule.
 * - StudyPlanInput - The input type for the generateStudyPlan function.
 * - StudyPlanOutput - The return type for the generateStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const StudyPlanInputSchema = z.object({
  topics: z.string().describe('The topics or subjects the student needs to study.'),
  timeframe: z.string().describe('The total duration available for studying (e.g., "2 weeks", "1 month").'),
});
export type StudyPlanInput = z.infer<typeof StudyPlanInputSchema>;

const DailyScheduleItemSchema = z.object({
    day: z.number().describe("The day number in the schedule (e.g., 1, 2, 3)."),
    topic: z.string().describe("The main topic or subject to focus on for the day."),
    task: z.string().describe("A specific, actionable task for the day (e.g., 'Read Chapter 1 of Algebra', 'Practice 20 physics problems on kinematics')."),
    isRestDay: z.boolean().describe("Whether this day is a designated rest day.").default(false),
});

const StudyPlanOutputSchema = z.object({
  title: z.string().describe("A concise and motivating title for the generated study plan."),
  schedule: z.array(DailyScheduleItemSchema).describe('The day-by-day study schedule.'),
});
export type StudyPlanOutput = z.infer<typeof StudyPlanOutputSchema>;

export async function generateStudyPlan(input: StudyPlanInput): Promise<StudyPlanOutput> {
  return studyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyPlanPrompt',
  input: {schema: StudyPlanInputSchema},
  output: {schema: StudyPlanOutputSchema},
  model: 'gemini-1.5-flash',
  prompt: `You are an expert academic planner. A student needs a personalized study plan.

Create a realistic, day-by-day study schedule based on the following details. Be sure to break down the topics logically over the given timeframe and include at least one rest day per week. Tasks should be specific and actionable.

IMPORTANT: If the user provides a vague topic like "maths for jee" or "jee math", you MUST generate a standard, high-quality 2-week study plan covering the core mathematics syllabus for the JEE competitive exam. Structure it with a mix of Calculus, Algebra, Trigonometry, and Coordinate Geometry. Ensure tasks are specific (e.g., "Master limits using L'Hopital's Rule", "Solve 15 problems on matrices and determinants"). Include a rest day.

Topics to cover: {{{topics}}}
Timeframe: {{{timeframe}}}

Generate a study plan with a clear title and a schedule array.`,
});

const studyPlanFlow = ai.defineFlow(
  {
    name: 'studyPlanFlow',
    inputSchema: StudyPlanInputSchema,
    outputSchema: StudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
