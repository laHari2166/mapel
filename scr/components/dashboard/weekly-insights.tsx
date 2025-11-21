'use client';

import { useEffect, useState } from 'react';
import { getPersonalizedWeeklyInsights } from '@/ai/flows/personalized-weekly-insights';
import { useAuth } from '@/hooks/use-auth';
import { useProgress } from '@/hooks/use-progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export default function WeeklyInsights() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'Student') {
      const fetchInsight = async () => {
        setLoading(true);
        try {
          const res = await getPersonalizedWeeklyInsights({
            studentName: user.username,
            completedChapters: progress.completedLessons.length, // simple metric
            streak: progress.streak,
            xp: progress.xp,
          });
          setInsight(res.insight);
        } catch (error) {
          console.error('Failed to get weekly insights:', error);
          setInsight("Keep up the great work! Every step forward is a victory.");
        } finally {
          setLoading(false);
        }
      };

      fetchInsight();
    } else {
        setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || user.role !== 'Student') {
    return null;
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-2 border-accent/20 shadow-lg shadow-accent/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-accent">
          Your Weekly AI Insight
        </CardTitle>
        <Lightbulb className="h-4 w-4 text-accent" />
      </CardHeader>
      <CardContent>
        {loading ? (
           <Skeleton className="h-5 w-3/4" />
        ) : (
          <p className="text-lg font-bold text-foreground">
            &ldquo;{insight}&rdquo;
          </p>
        )}
      </CardContent>
    </Card>
  );
}
