'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/auth-provider';

export const useAuth = (options?: { required?: boolean }) => {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, loading } = context;

  useEffect(() => {
    if (options?.required && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, options?.required, router]);

  return context;
};
