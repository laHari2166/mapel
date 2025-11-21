'use client';

import { AppShell } from '@/components/layout/app-shell';
import StickyNote from '@/components/shared/sticky-note';
import { useAuth } from '@/hooks/use-auth';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useAuth({ required: true });

  return (
    <AppShell>
      {children}
      <StickyNote />
    </AppShell>
  );
}
