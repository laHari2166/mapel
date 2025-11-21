'use client';

import { PageHeader } from "@/components/shared/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

// Mock data for leaderboard
const mockLeaderboard = [
  { id: 'user-a', username: 'glitch_god', xp: 9850, streak: 42, avatar: 'https://picsum.photos/seed/leader1/100/100' },
  { id: 'user-b', username: 'CodeNinja', xp: 8200, streak: 25, avatar: 'https://picsum.photos/seed/leader2/100/100' },
  { id: 'user-c', username: 'StudySlayer', xp: 7500, streak: 30, avatar: 'https://picsum.photos/seed/leader3/100/100' },
  { id: 'user-d', username: 'PixelPilot', xp: 6800, streak: 15, avatar: 'https://picsum.photos/seed/leader4/100/100' },
  { id: 'user-e', username: 'QuantumQueen', xp: 5250, streak: 18, avatar: 'https://picsum.photos/seed/leader5/100/100' },
];


export default function LeaderboardPage() {
    const { user } = useAuth();
    const { progress } = useProgress();

    // Add current user to leaderboard if they are a student
    const leaderboardData = [...mockLeaderboard];
    if (user && user.role === 'Student' && !leaderboardData.find(u => u.id === user.id)) {
        leaderboardData.push({
            id: user.id,
            username: user.username,
            xp: progress.xp,
            streak: progress.streak,
            avatar: user.avatar
        });
    }

    // Sort by XP
    leaderboardData.sort((a, b) => b.xp - a.xp);

  return (
    <div>
      <PageHeader 
        title="Leaderboard"
        subtitle="See who's on top of the game. Keep grinding!"
      />

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                    <TableHead className="text-right">Streak</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leaderboardData.map((player, index) => (
                        <TableRow key={player.id} className={cn(user?.id === player.id && "bg-primary/10 border-l-4 border-primary")}>
                            <TableCell className="font-medium text-lg">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                                    {index === 0 ? <Crown className="h-6 w-6 text-yellow-400" /> : index + 1}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={player.avatar} alt={player.username} />
                                        <AvatarFallback>{player.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="font-medium">{player.username}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-mono">{player.xp}</TableCell>
                            <TableCell className="text-right font-mono">{player.streak} days</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
