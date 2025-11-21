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
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, Youtube, StickyNote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';

const playlistItemSchema = z.object({
  type: z.enum(['video', 'note'], { required_error: "Please select a type."}),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  url: z.string().url({ message: "Please enter a valid URL." }),
});

const playlistSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().optional(),
  items: z.array(playlistItemSchema).min(1, 'Playlist must have at least one item.'),
});

export default function CreatePlaylistPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof playlistSchema>>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      title: '',
      description: '',
      items: [
        { type: 'video', title: '', url: '' }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  function onSubmit(data: z.infer<typeof playlistSchema>) {
    console.log(data);
    toast({
      title: 'Playlist Saved!',
      description: `The playlist "${data.title}" has been successfully created.`,
    });
    form.reset();
  }

  return (
    <div>
      <PageHeader
        title="Create a Learning Playlist"
        subtitle="Assemble YouTube videos, notes, and links into a structured learning path."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Playlist Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Playlist Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Intro to Organic Chemistry" {...field} />
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
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief summary of what this playlist covers." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Playlist Items</CardTitle>
                <CardDescription>Add YouTube videos, articles, or other resources.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {fields.map((itemField, index) => (
                    <div key={itemField.id} className="p-4 border rounded-lg space-y-4 relative bg-background/50">
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length <= 1}
                            className="absolute top-2 right-2"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name={`items.${index}.type`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a resource type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="video">
                                            <div className="flex items-center gap-2">
                                                <Youtube className="h-4 w-4" /> Video
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="note">
                                            <div className="flex items-center gap-2">
                                                <StickyNote className="h-4 w-4" /> Note / Link
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className='md:col-span-2'>
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Introduction to Alkanes" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name={`items.${index}.url`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
                 <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ type: 'video', title: '', url: '' })}
                    >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Item
                </Button>
            </CardFooter>
          </Card>
          

          <div className="flex justify-end">
            <Button type="submit">Save Playlist</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
