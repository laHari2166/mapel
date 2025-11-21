'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusSquare, Route, Users, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '../ui/button';

export default function GuruDashboard() {
  const { user } = useAuth();
  
  // Mock data, to be replaced with real data later
  const followerCount = 1250;
  const followingCount = 89;

  return (
    <div className="space-y-8">
      <PageHeader title={`Welcome, ${user?.username || 'Guru'}!`} subtitle="Share your wisdom and guide the next generation." />

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                        {user && <AvatarImage src={user.avatar} alt={user.username} />}
                        <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-3xl">{user?.username || 'Guru'}</CardTitle>
                        <CardDescription className="mt-2 text-base">
                            Passionate educator specializing in demystifying competitive exams. My mission is to empower students with the strategies and knowledge to excel.
                        </CardDescription>
                         <div className="flex justify-center md:justify-start items-center gap-6 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-bold">{followerCount.toLocaleString()}</p>
                                    <p className="text-muted-foreground">Followers</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-2">
                                <UserPlus className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-bold">{followingCount.toLocaleString()}</p>
                                    <p className="text-muted-foreground">Following</p>
                                </div>
                            </div>
                        </div>
                    </div>
                     <Button variant="outline">Edit Profile</Button>
                </div>
            </CardHeader>
        </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/create-playlist" passHref>
            <Card className="h-full transform-gpu cursor-pointer border-2 border-transparent bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-primary/5 hover:scale-105">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusSquare className="h-6 w-6 text-primary" />
                        Create a Learning Playlist
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Curate YouTube videos, notes, and quizzes into a powerful learning journey for your students.
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>

        <Link href="/create-quiz" passHref>
            <Card className="h-full transform-gpu cursor-pointer border-2 border-transparent bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-primary/5 hover:scale-105">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Route className="h-6 w-6 text-primary" />
                        Create a Quiz
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                       Build custom quizzes to test knowledge and track student understanding.
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
      </div>

       <div className="mt-12 text-center">
        <h3 className="text-xl font-bold text-foreground">More Tools Coming Soon</h3>
        <p className="text-muted-foreground">We're building more features to help you mentor, like analytics and student progress tracking.</p>
      </div>
    </div>
  );
}
