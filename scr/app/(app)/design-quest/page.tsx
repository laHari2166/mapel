
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2, BookOpen, Link as LinkIcon, FileQuestion } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const questStageSchema = z.object({
  title: z.string().min(3, 'Stage title must be at least 3 characters.'),
  narrative: z.string().min(10, 'Narrative text is too short.').max(300, 'Narrative is too long.'),
  resourceType: z.enum(['lesson', 'quiz', 'link'], { required_error: "Please select a resource type."}),
  resourceUrl: z.string().url('Please enter a valid URL.'),
});

const questSchema = z.object({
  title: z.string().min(5, 'Quest title must be at least 5 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  stages: z.array(questStageSchema).min(1, 'A quest must have at least one stage.'),
});

export default function DesignQuestPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof questSchema>>({
    resolver: zodResolver(questSchema),
    defaultValues: {
      title: '',
      description: '',
      stages: [{ title: '', narrative: '', resourceType: 'lesson', resourceUrl: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'stages',
  });

  function onSubmit(data: z.infer<typeof questSchema>) {
    console.log('Study Quest Data:', data);
    toast({
      title: 'Quest Designed!',
      description: `Your new study quest, "${data.title}", is ready for adventurers.`,
    });
    form.reset();
  }

  return (
    <div>
      <PageHeader
        title="Design a Study Quest"
        subtitle="Craft an epic learning adventure for your students."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quest Details</CardTitle>
              <CardDescription>
                Give your quest a name and a compelling storyline.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quest Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Quest for Quantum Supremacy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quest Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short, engaging summary of the adventure that awaits." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quest Stages</CardTitle>
              <CardDescription>Build the steps of the journey. Each stage should have a challenge or a lesson.</CardDescription>
            </CardHeader>
             <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-background/50">
                   <div className="flex justify-between items-start">
                     <h3 className="text-lg font-semibold text-primary">Stage {index + 1}</h3>
                     <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                   </div>
                  
                  <FormField
                    control={form.control}
                    name={`stages.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stage Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., The Cave of Classical Mechanics" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`stages.${index}.narrative`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stage Narrative</FormLabel>
                        <FormControl>
                          <Textarea placeholder="A short story or instruction for this stage." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name={`stages.${index}.resourceType`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resource Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a resource type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="lesson"><div className="flex items-center gap-2"><BookOpen/>Lesson</div></SelectItem>
                                <SelectItem value="quiz"><div className="flex items-center gap-2"><FileQuestion/>Quiz</div></SelectItem>
                                <SelectItem value="link"><div className="flex items-center gap-2"><LinkIcon/>External Link</div></SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name={`stages.${index}.resourceUrl`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resource URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/lesson/1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
                 <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ title: '', narrative: '', resourceType: 'lesson', resourceUrl: '' })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Stage
                  </Button>
            </CardFooter>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Publish Quest</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
