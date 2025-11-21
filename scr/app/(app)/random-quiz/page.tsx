
'use client';

import { PageHeader } from '@/components/shared/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, UserPlus, Users, ArrowRight, Swords } from 'lucide-react';
import Link from 'next/link';
import LiveBattleCard from '@/components/quiz/live-battle-card';
import { useToast } from '@/hooks/use-toast';

const mockBattles = [
  {
    id: 'battle-1',
    topic: 'NEET Biology',
    players: [
      { username: 'BioMaster', avatar: 'https://picsum.photos/seed/p1/40' },
    ],
  },
  {
    id: 'battle-2',
    topic: 'JEE Advanced Calculus',
    players: [
      { username: 'CalculusKing', avatar: 'https://picsum.photos/seed/p2/40' },
    ],
  },
  {
    id: 'battle-3',
    topic: 'Modern History',
    players: [
      { username: 'HistoryBuff', avatar: 'https://picsum.photos/seed/p3/40' },
    ],
  },
];

export default function RandomQuizPage() {
  const { toast } = useToast();

  const handleComingSoon = () => {
    toast({
      title: 'Feature Coming Soon!',
      description: 'This quiz mode is under construction.',
    });
  };

  const quizOptions = [
    {
      title: 'Quiz with AI Bot',
      description: 'Challenge our AI bot in a one-on-one quiz battle.',
      icon: <Bot className="h-10 w-10 text-primary" />,
      href: '/random-quiz/ai',
      cta: 'Start Now',
      action: undefined,
    },
    {
      title: 'Challenge a Friend',
      description: 'Invite a friend from your doubt solving room for a friendly match.',
      icon: <UserPlus className="h-10 w-10 text-primary" />,
      href: '/study-room',
      cta: 'Find Friend',
    },
    {
      title: 'Battle a Stranger',
      description:
        'Test your skills against a random player from the community.',
      icon: <Users className="h-10 w-10 text-primary" />,
      href: '#',
      cta: 'Find Match',
      action: handleComingSoon,
    },
  ];


  return (
    <div>
      <PageHeader
        title="Battle Quiz Arena"
        subtitle="Challenge yourself and others. Earn XP and climb the leaderboard."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quizOptions.map((option) => {
          const isLink = !!option.href && option.href !== '#';
          const ButtonComponent = (
            <Button className="group w-full" onClick={option.action}>
              {option.cta}{' '}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          );

          return (
             <Card
              key={option.title}
              className="flex flex-col transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-primary/20"
            >
              <CardHeader className="flex-col items-center text-center">
                {option.icon}
                <CardTitle className="mt-4">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col text-center">
                <CardDescription>{option.description}</CardDescription>
                <div className="mt-auto pt-4">
                  {isLink && !option.action ? (
                     <Link href={option.href} passHref>
                        {ButtonComponent}
                     </Link>
                  ) : (
                    ButtonComponent
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card className="mt-8 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Swords className="h-6 w-6 text-accent" />
            Live Battles
          </CardTitle>
          <CardDescription>
            Join an existing battle and test your knowledge against others.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockBattles.map((battle) => (
            <LiveBattleCard key={battle.id} battle={battle} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
