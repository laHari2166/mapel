'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '@/lib/types';
import { useAuth } from './use-auth';

const getInitialProgress = (userId: string): UserProgress => {
  if (typeof window === 'undefined') {
    return { xp: 0, level: 1, streak: 0, completedQuizzes: [], completedLessons: [] };
  }
  try {
    const item = window.localStorage.getItem(`mapel-progress-${userId}`);
    return item ? JSON.parse(item) : { xp: 0, level: 1, streak: 0, completedQuizzes: [], completedLessons: [] };
  } catch (error) {
    console.error('Error reading progress from localStorage', error);
    return { xp: 0, level: 1, streak: 0, completedQuizzes: [], completedLessons: [] };
  }
};

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>({ xp: 0, level: 1, streak: 0, completedQuizzes: [], completedLessons: [] });

  useEffect(() => {
    if (user) {
      setProgress(getInitialProgress(user.id));
    }
  }, [user]);

  const updateProgress = useCallback((newProgress: Partial<UserProgress>) => {
    if (user) {
      setProgress(prevProgress => {
        const updated = { ...prevProgress, ...newProgress };
        try {
          window.localStorage.setItem(`mapel-progress-${user.id}`, JSON.stringify(updated));
        } catch (error) {
          console.error('Error saving progress to localStorage', error);
        }
        return updated;
      });
    }
  }, [user]);
  
  const addXp = useCallback((amount: number) => {
    setProgress(prevProgress => {
        const newXp = prevProgress.xp + amount;
        const newLevel = Math.floor(newXp / 1000) + 1;
        const updated = { ...prevProgress, xp: newXp, level: newLevel };
         if (user) {
            try {
                window.localStorage.setItem(`mapel-progress-${user.id}`, JSON.stringify(updated));
            } catch (error) {
                console.error('Error saving progress to localStorage', error);
            }
        }
        return updated;
    });
  }, [user]);

  return { progress, updateProgress, addXp };
};
