'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Youtube, Users, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '../ui/button';
import StudentSpotlight from './student-spotlight';

export default function CreatorDashboard() {
    const { user } = useAuth();
  
    // Mock data, to be replaced with real data later
    const followerCount = 58300;
    const followingCount = 12;

    const mockSpotlights = [
        {
            studentName: 'Aarav Sharma',
            quote: 'The study quests made learning fun for the first time. I finally understand quantum physics!',
            avatar: 'https://picsum.photos/seed/student1/100'
        },
        {
            studentName: 'Priya Patel',
            quote: 'I aced my JEE mocks after following the advanced math quest. The creator is a genius!',
            avatar: 'https://picsum.photos/seed/student2/100'
        },
    ];

    return (
        <div className="space-y-8">
            <PageHeader title={`Welcome, ${user?.username || 'Creator'}!`} subtitle="Build immersive learning worlds and inspire mastery." />
            
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <Avatar className="h-24 w-24 border-4 border-accent">
                            {user && <AvatarImage src={user.avatar} alt={user.username} />}
                            <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <CardTitle className="text-3xl">{user?.username || 'Creator'}</CardTitle>
                            <CardDescription className="mt-2 text-base">
                                Content creator focused on making education viral. Let's make learning the next big trend.
                            </CardDescription>
                            <div className="flex justify-center md:justify-start items-center gap-6 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-accent" />
                                    <div>
                                        <p className="font-bold">{followerCount.toLocaleString()}</p>
                                        <p className="text-muted-foreground">Followers</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UserPlus className="h-5 w-5 text-accent" />
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
                <Link href="/design-quest" passHref>
                    <Card className="h-full transform-gpu cursor-pointer border-2 border-transparent bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:shadow-accent hover:scale-105">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Compass className="h-6 w-6 text-accent" />
                                My Study Quests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Create and manage themed challenge tracks and interactive quests for your followers.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/follow-creator" passHref>
                    <Card className="h-full transform-gpu cursor-pointer border-2 border-transparent bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:shadow-accent hover:scale-105">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Youtube className="h-6 w-6 text-accent" />
                                Manage Content
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Link your YouTube videos and publish notes to share with your community.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold mb-4">Student Spotlights</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {mockSpotlights.map((spotlight, index) => (
                        <StudentSpotlight key={index} {...spotlight} />
                    ))}
                </div>
            </div>
        </div>
    );
}
