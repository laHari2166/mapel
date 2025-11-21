
'use client';

import { useState, useEffect } from 'react';
import { Gift, Sparkles, Zap, StickyNote, MessageSquareQuote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProgress } from '@/hooks/use-progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';

type RewardType = 'xp' | 'motivation' | 'note' | 'quiz';

interface Reward {
    type: RewardType;
    title: string;
    description: string;
    icon: React.ReactNode;
    data: any;
}

const possibleRewards: Reward[] = [
    { type: 'xp', title: 'XP Boost!', description: 'You received a bonus of 150 XP!', icon: <Zap className="h-10 w-10 text-yellow-400" />, data: 150 },
    { type: 'motivation', title: 'A Spark of Motivation!', description: 'Here\'s a thought to keep you going.', icon: <MessageSquareQuote className="h-10 w-10 text-blue-400" />, data: 'The secret to getting ahead is getting started.' },
    { type: 'note', title: 'Crash Note!', description: 'A quick revision note on Real Numbers.', icon: <StickyNote className="h-10 w-10 text-yellow-500" />, data: "Euclid's Division Lemma: a = bq + r. It's used to find the HCF of two numbers. Simple!" },
    { type: 'quiz', title: 'Bonus Quiz!', description: 'Take this quiz for a chance to earn double XP!', icon: <Sparkles className="h-10 w-10 text-accent" />, data: '/random-quiz/ai' }
];

export default function DailyReward() {
  const { addXp } = useProgress();
  const [canClaim, setCanClaim] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [revealedReward, setRevealedReward] = useState<Reward | null>(null);

  useEffect(() => {
    const lastClaimed = localStorage.getItem('mapel-last-claim');
    if (!lastClaimed) {
      setCanClaim(true);
      return;
    }

    const lastClaimDate = new Date(parseInt(lastClaimed));
    const today = new Date();

    if (today.toDateString() !== lastClaimDate.toDateString()) {
      setCanClaim(true);
      setIsClaimed(false);
    } else {
        setCanClaim(false);
        setIsClaimed(true);
    }
  }, []);

  const handleClaim = () => {
    if (canClaim && !isClaimed) {
      const reward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)];
      
      if (reward.type === 'xp') {
        addXp(reward.data);
      }
      
      setRevealedReward(reward);
      setIsClaimed(true);
      setCanClaim(false);
      localStorage.setItem('mapel-last-claim', Date.now().toString());
    }
  };

  const chestAnimation = canClaim && !isClaimed 
    ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } 
    : {};
  
  const chestTransition = canClaim && !isClaimed 
    ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } 
    : {};

  return (
    <>
        <Card className={`flex flex-col justify-between ${canClaim && !isClaimed ? 'border-accent shadow-accent' : ''}`}>
        <CardHeader>
            <CardTitle className="text-sm font-medium">Mystery Chest</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center flex-grow">
            <motion.div
            animate={chestAnimation}
            transition={chestTransition}
            >
            <Gift className={`h-12 w-12 ${canClaim && !isClaimed ? 'text-accent' : 'text-muted-foreground'}`} />
            </motion.div>
            <CardDescription className="mt-2 text-xs">
            {isClaimed ? 'Claimed! Come back tomorrow.' : canClaim ? 'A surprise awaits!' : 'Already claimed today.'}
            </CardDescription>
            <Button onClick={handleClaim} disabled={!canClaim || isClaimed} size="sm" className="mt-4">
            {isClaimed ? 'Opened' : 'Open Chest'}
            </Button>
        </CardContent>
        </Card>

        <AlertDialog open={!!revealedReward} onOpenChange={() => setRevealedReward(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-center mb-4">
                        {revealedReward?.icon}
                    </div>
                    <AlertDialogTitle className="text-center text-2xl">{revealedReward?.title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-base">
                       {revealedReward?.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {revealedReward && ['note', 'motivation'].includes(revealedReward.type) && (
                    <div className="my-4 p-4 bg-muted/50 rounded-lg text-center">
                        <p className="font-semibold italic">{revealedReward.data}</p>
                    </div>
                )}
                <AlertDialogFooter>
                    {revealedReward?.type === 'quiz' ? (
                        <Link href={revealedReward.data} passHref className="w-full">
                            <AlertDialogAction className="w-full">Take Quiz</AlertDialogAction>
                        </Link>
                    ) : (
                        <AlertDialogAction>Awesome!</AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
  );
}
