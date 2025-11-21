'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useStudyRoom } from '@/hooks/use-study-room';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { USERS } from '@/lib/data';
import { useEffect, useRef } from 'react';

const chatSchema = z.object({
  message: z.string().min(1).max(280),
});

export default function ChatBox() {
  const params = useParams();
  const roomId = params.id as string;
  const { user } = useAuth();
  const { currentRoom, sendMessage } = useStudyRoom(roomId);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  });

  const onSubmit = (values: z.infer<typeof chatSchema>) => {
    sendMessage(values.message);
    form.reset();
  };
  
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector('div');
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
    }
  }, [currentRoom?.messages]);

  const getUserAvatar = (userId: string) => {
    const u = USERS.find(usr => usr.id === userId);
    if(u) return u.avatar;
    if(userId.startsWith('guest')) return 'https://picsum.photos/seed/guest/100/100';
    return '';
  }

  return (
    <Card className="h-[60vh] flex flex-col">
      <CardHeader>
        <CardTitle>Group Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {currentRoom?.messages.map((msg, index) => (
              <div key={index} className={cn("flex items-start gap-3", user?.id === msg.userId && "justify-end")}>
                {user?.id !== msg.userId && <Avatar className="h-8 w-8"><AvatarImage src={getUserAvatar(msg.userId)} /><AvatarFallback>{msg.username.charAt(0)}</AvatarFallback></Avatar>}
                <div className={cn("max-w-xs rounded-lg p-3", user?.id === msg.userId ? "bg-primary text-primary-foreground" : "bg-muted")}>
                    <p className="font-bold text-sm">{msg.username}</p>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                 {user?.id === msg.userId && <Avatar className="h-8 w-8"><AvatarImage src={getUserAvatar(msg.userId)} /><AvatarFallback>{msg.username.charAt(0)}</AvatarFallback></Avatar>}
              </div>
            ))}
             {currentRoom?.messages.length === 0 && (
                <div className="text-center text-muted-foreground pt-16">
                    <p>No messages yet.</p>
                    <p>Be the first to say hi! 👋</p>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center space-x-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Type a message..." autoComplete="off" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
