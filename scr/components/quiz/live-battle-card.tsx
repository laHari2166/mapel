'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LiveBattleCardProps {
    battle: {
        id: string;
        topic: string;
        players: { username: string; avatar: string }[];
    };
}

export default function LiveBattleCard({ battle }: LiveBattleCardProps) {
    const { toast } = useToast();

    const handleJoin = () => {
        toast({
            title: "Joining Battle...",
            description: "Matchmaking is coming soon!",
        });
    }

    return (
        <Card className="bg-background/50 hover:bg-muted/50 transition-colors">
            <CardHeader>
                <CardTitle className="text-lg">{battle.topic}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    <Users className="h-4 w-4" /> 1 / 2 Players
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="flex items-center -space-x-2">
                        {battle.players.map(p => (
                            <Avatar key={p.username} className="h-8 w-8 border-2 border-background">
                                <AvatarImage src={p.avatar} alt={p.username} />
                                <AvatarFallback>{p.username.charAt(0)}</AvatarFallback>
                            </Avatar>
                        ))}
                         <div className="h-8 w-8 rounded-full bg-muted border-2 border-dashed border-muted-foreground flex items-center justify-center text-muted-foreground text-xs">?</div>
                    </div>
                    <Button size="sm" className="group" onClick={handleJoin}>
                        Join <Zap className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
