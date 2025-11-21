'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Youtube, StickyNote, PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { CREATORS } from '@/lib/data';


const CreatorCard = ({ creator }: { creator: (typeof CREATORS)[0] }) => {
  const { toast } = useToast();

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: `Followed ${creator.name}!`,
      description: "You'll now see their updates.",
    });
  };

  return (
    <Link href={`/creator/${creator.id}`} passHref>
        <Card className="bg-card/60 backdrop-blur-sm h-full flex flex-col group hover:border-accent transition-all duration-300">
        <CardHeader>
            <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <CardTitle>{creator.name}</CardTitle>
                <CardDescription>{creator.bio}</CardDescription>
            </div>
            <Button onClick={handleFollow} variant="outline" size="sm" className="self-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                Follow
            </Button>
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <h4 className="font-semibold mb-2 text-muted-foreground">Latest Content</h4>
            <div className="space-y-2">
            {creator.content.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-center gap-3 rounded-md p-2 hover:bg-muted transition-colors">
                    {item.type === 'video' ? <Youtube className="h-5 w-5 text-red-500" /> : <StickyNote className="h-5 w-5 text-yellow-500" />}
                    <span className="text-sm font-medium line-clamp-1">{item.title}</span>
                </div>
            ))}
            </div>
        </CardContent>
        <CardFooter>
            <div className="text-sm font-semibold text-accent flex items-center group-hover:gap-2 transition-all">
                View Profile <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </CardFooter>
        </Card>
    </Link>
  );
};


export default function FollowCreatorPage() {
  return (
    <div>
      <PageHeader
        title="Follow a Creator"
        subtitle="Get exclusive access to content from your favorite mentors."
      />
      <div className="flex flex-col gap-6">
        {CREATORS.map(creator => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
}
