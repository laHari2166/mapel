'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useStudyRoom } from '@/hooks/use-study-room';
import { PageHeader } from '@/components/shared/page-header';
import ChatBox from '@/components/study-room/chat-box';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ArrowLeft } from 'lucide-react';
import { USERS } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

export default function IndividualStudyRoomPage() {
    const params = useParams();
    const roomId = params.id as string;
    const { currentRoom } = useStudyRoom(roomId);
    const { toast } = useToast();
    const { user: authUser } = useAuth();
    const isStudent = authUser?.role === 'Student';

    if (!currentRoom) {
        return (
            <div className="flex h-full items-center justify-center">
                <Spinner /> <span className="ml-2">Loading Room...</span>
            </div>
        );
    }
    
    const memberDetails = currentRoom.members.map(memberId => {
        const user = USERS.find(u => u.id === memberId);
        // Handle guest users not in USERS
        if (!user && memberId.startsWith('guest-')) {
            return { id: memberId, username: 'Guest', avatar: 'https://picsum.photos/seed/guest/100/100' };
        }
        return user;
    }).filter(Boolean);

    const copyRoomCode = () => {
        navigator.clipboard.writeText(currentRoom.id);
        toast({
            title: "Room Code Copied!",
            description: "You can now share it with your friends.",
        });
    }


    return (
        <div>
             <Link href="/study-room" passHref className="mb-4 inline-block">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Rooms
              </Button>
            </Link>
            <div className='flex justify-between items-start'>
                <PageHeader
                    title={currentRoom.name}
                    subtitle={isStudent ? "Welcome to your study room!" : "Welcome to the doubt solving squad!"}
                />
                <Button onClick={copyRoomCode} variant="outline">Copy Room Code</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ChatBox />
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" /> Members ({memberDetails.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {memberDetails.map(member => member && (
                                <div key={member.id} className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.username.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{member.username}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
