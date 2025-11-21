'use client';

import Link from 'next/link';
import { useStudyRoom } from '@/hooks/use-study-room';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users } from 'lucide-react';

export default function MyRoomsList() {
    const { user } = useAuth();
    const { rooms } = useStudyRoom();

    const myRooms = user ? rooms.filter(room => room.members.includes(user.id)) : [];

    if (myRooms.length === 0) {
        return (
            <Card className="flex items-center justify-center h-48 border-dashed">
                <div className="text-center text-muted-foreground">
                    <p>You haven't joined any rooms yet.</p>
                    <p>Create or join one to start solving doubts!</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {myRooms.map(room => (
                <Link href={`/study-room/${room.id}`} key={room.id} passHref>
                    <Card className="hover:bg-muted/50 transition-colors">
                        <CardHeader>
                            <CardTitle>{room.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2 pt-2">
                                <Users className="h-4 w-4" />
                                {room.members.length} member(s)
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
