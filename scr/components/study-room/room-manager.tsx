'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStudyRoom } from '@/hooks/use-study-room';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '../ui/spinner';
import { useAuth } from '@/hooks/use-auth';

const createRoomSchema = z.object({
  roomName: z.string().min(3, 'Room name must be at least 3 characters.'),
});

const joinRoomSchema = z.object({
  roomId: z.string().min(5, 'Room code is required.'),
});

export default function RoomManager() {
  const router = useRouter();
  const { createRoom, joinRoom } = useStudyRoom();
  const { toast } = useToast();
  const { user } = useAuth();
  const isStudent = user?.role === 'Student';
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const createForm = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: { roomName: '' },
  });

  const joinForm = useForm<z.infer<typeof joinRoomSchema>>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: { roomId: '' },
  });

  const handleCreateRoom = (values: z.infer<typeof createRoomSchema>) => {
    setIsCreating(true);
    const newRoomId = createRoom(values.roomName);
    if (newRoomId) {
      toast({ title: 'Room Created!', description: `Room "${values.roomName}" is live.` });
      router.push(`/study-room/${newRoomId}`);
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not create room.' });
    }
    setIsCreating(false);
  };

  const handleJoinRoom = (values: z.infer<typeof joinRoomSchema>) => {
    setIsJoining(true);
    const success = joinRoom(values.roomId);
    if (success) {
        toast({ title: 'Joined Room!', description: 'Welcome to the session.' });
        router.push(`/study-room/${values.roomId}`);
    } else {
        toast({ variant: 'destructive', title: 'Error', description: 'Room not found or you are already a member.' });
    }
    setIsJoining(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new Room</CardTitle>
        <CardDescription>{isStudent ? "Start a new study session with friends." : "Start a new doubt solving squad."}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createForm}>
          <form onSubmit={createForm.handleSubmit(handleCreateRoom)} className="space-y-4">
            <FormField
              control={createForm.control}
              name="roomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., JEE Warriors" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating && <Spinner className="mr-2"/>}
              Create Room
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <Separator className="my-4" />

      <CardHeader>
        <CardTitle>Join an existing Room</CardTitle>
        <CardDescription>Enter a room code to join.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...joinForm}>
          <form onSubmit={joinForm.handleSubmit(handleJoinRoom)} className="space-y-4">
            <FormField
              control={joinForm.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter code..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="secondary" className="w-full" disabled={isJoining}>
              {isJoining && <Spinner className="mr-2"/>}
              Join Room
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
