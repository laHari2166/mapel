
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Youtube, StickyNote, PlusCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CREATORS } from '@/lib/data';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react';
import type { Creator } from '@/lib/types';

export default function CreatorProfilePage() {
  const params = useParams();
  const creatorId = params.id as string;
  const [creator, setCreator] = useState<Creator | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    const foundCreator = CREATORS.find(c => c.id === creatorId);
    setCreator(foundCreator);
  }, [creatorId]);

  if (!creator) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-8 w-8" />
        <p className="ml-4">Loading creator...</p>
      </div>
    );
  }

  const handleFollow = () => {
    toast({
      title: `Followed ${creator.name}!`,
      description: "You'll now see their updates on your dashboard.",
    });
  };

  const videos = creator.content.filter(c => c.type === 'video');
  const notes = creator.content.filter(c => c.type === 'note');

  return (
    <div>
        <Link href="/follow-creator" passHref className="mb-4 inline-block">
            <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Creators
            </Button>
        </Link>
        
        <Card className="mb-8 bg-card/70 backdrop-blur-sm">
            <CardHeader>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                        <AvatarImage src={creator.avatar} alt={creator.name} />
                        <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center md:text-left">
                        <CardTitle className="text-4xl">{creator.name}</CardTitle>
                        <CardDescription className="text-lg mt-1">{creator.bio}</CardDescription>
                    </div>
                    <Button onClick={handleFollow} size="lg">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Follow
                    </Button>
                </div>
            </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Youtube className="h-6 w-6 text-red-500" />
                        YouTube Lessons
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     {videos.map((item, index) => (
                        <Link href={item.url} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors border">
                                <Youtube className="h-8 w-8 text-red-500/80" />
                                <span className="font-semibold">{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <StickyNote className="h-6 w-6 text-yellow-500" />
                        Study Notes
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     {notes.map((item, index) => (
                        <Link href={item.url} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors border">
                                <StickyNote className="h-8 w-8 text-yellow-500/80" />
                                <span className="font-semibold">{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
