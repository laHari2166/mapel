'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User, Role } from '@/lib/types';
import { USERS } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password_provided: string) => Promise<boolean>;
  logout: () => void;
  continueAsGuest: (role: Role) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('mapel-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('mapel-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (username: string, password_provided: string): Promise<boolean> => {
    setLoading(true);
    const foundUser = USERS.find(u => u.username === username && u.password === password_provided);
    if (foundUser) {
      const userToStore = { ...foundUser };
      delete userToStore.password;

      localStorage.setItem('mapel-user', JSON.stringify(userToStore));
      setUser(userToStore);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  }, []);

  const continueAsGuest = useCallback((role: Role) => {
    setLoading(true);
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      username: 'Guest',
      role,
      avatar: 'https://picsum.photos/seed/guest/100/100'
    };
    localStorage.setItem('mapel-user', JSON.stringify(guestUser));
    setUser(guestUser);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('mapel-user');
    setUser(null);
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}
