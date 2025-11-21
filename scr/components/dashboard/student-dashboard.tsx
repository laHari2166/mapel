'use client';

import { Flame, Star, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useProgress } from '@/hooks/use-progress';
import { PageHeader } from '@/components/shared/page-header';
import WeeklyInsights from './weekly-insights';
import ProgressCard from './progress-card';
import CourseRecommendations from './course-recommendations';
import DailyReward from './daily-reward';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { progress } = useProgress();

  const levelGoal = (progress.level) * 1000;
  const currentLevelXp = progress.xp - (progress.level - 1) * 1000;

  return (
    <div className="space-y-8">
      <PageHeader title={`What's popping, ${user?.username || 'Student'}?`} subtitle="Let's get this bread. No cap." />
      
      <div className="space-y-6">
        <WeeklyInsights />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ProgressCard
            title="Level"
            icon={Star}
            value={progress.level}
            goal={levelGoal}
            description={`${currentLevelXp.toLocaleString()} / ${levelGoal.toLocaleString()} XP`}
          />
          <ProgressCard
            title="Total XP"
            icon={Zap}
            value={progress.xp}
            description="Experience Points"
          />
          <ProgressCard
            title="Streak"
            icon={Flame}
            value={progress.streak}
            description="Days in a row"
          />
          <DailyReward />
        </div>

        <CourseRecommendations />
      </div>
    </div>
  );
}
