'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressCardProps {
  title: string;
  icon: LucideIcon;
  value: number;
  goal?: number;
  description: string;
}

export default function ProgressCard({ title, icon: Icon, value, goal, description }: ProgressCardProps) {
  const percentage = goal ? (value / goal) * 100 : value;

  return (
    <Card className="bg-card/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:border-accent hover:shadow-accent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {goal && (
            <Progress value={percentage} className="mt-4 h-2" />
        )}
      </CardContent>
    </Card>
  );
}
