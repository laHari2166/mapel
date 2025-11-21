'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader } from '@/components/shared/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const optionSchema = z.object({
  text: z.string().min(1, 'Option text cannot be empty.'),
});

const questionSchema = z.object({
  questionText: z.string().min(5, 'Question must be at least 5 characters.'),
  options: z.array(optionSchema).min(2, 'Must have at least 2 options.'),
  correctAnswer: z.string().min(1, 'You must select a correct answer.'),
});

const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  questions: z.array(questionSchema).min(1, 'Quiz must have at least one question.'),
});

export default function CreateQuizPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      questions: [
        {
          questionText: '',
          options: [{ text: '' }, { text: '' }],
          correctAnswer: '0',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  function onSubmit(data: z.infer<typeof quizSchema>) {
    console.log(data);
    toast({
      title: 'Quiz Saved!',
      description: `The quiz "${data.title}" has been successfully created.`,
    });
    form.reset();
  }

  return (
    <div>
      <PageHeader
        title="Create a Quiz"
        subtitle="Build custom quizzes to test your students' knowledge."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Advanced Calculus Quiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {fields.map((questionField, questionIndex) => (
            <Card key={questionField.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Question {questionIndex + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(questionIndex)}
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name={`questions.${questionIndex}.questionText`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Text</FormLabel>
                      <FormControl>
                        <Input placeholder="What is the derivative of x^2?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`questions.${questionIndex}.correctAnswer`}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Options (select the correct answer)</FormLabel>
                      <Controller
                        name={`questions.${questionIndex}.correctAnswer`}
                        control={form.control}
                        render={({ field: radioField }) => (
                          <RadioGroup
                            onValueChange={radioField.onChange}
                            defaultValue={radioField.value}
                            className="space-y-2"
                          >
                             <QuestionOptions control={form.control} questionIndex={questionIndex} />
                          </RadioGroup>
                        )}
                      />
                       <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ questionText: '', options: [{ text: '' }, { text: '' }], correctAnswer: '0' })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
            <Button type="submit">Save Quiz</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function QuestionOptions({ control, questionIndex }: { control: any, questionIndex: number }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${questionIndex}.options`
    });

    return (
        <div className="space-y-2">
            {fields.map((optionField, optionIndex) => (
                 <FormField
                    key={optionField.id}
                    control={control}
                    name={`questions.${questionIndex}.options.${optionIndex}.text`}
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                            <FormControl>
                                <div className="flex items-center w-full gap-2">
                                     <RadioGroupItem value={String(optionIndex)} id={`${questionIndex}-${optionIndex}`} />
                                    <Input placeholder={`Option ${optionIndex + 1}`} {...field} />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(optionIndex)} disabled={fields.length <= 2}>
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            ))}
             <Button type="button" size="sm" variant="ghost" onClick={() => append({ text: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Option
            </Button>
        </div>
    )
}
