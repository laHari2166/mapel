'use client';

import { useAuth } from '@/hooks/use-auth';
import StudentDashboard from '@/components/dashboard/student-dashboard';
import GuruDashboard from '@/components/dashboard/guru-dashboard';
import CreatorDashboard from '@/components/dashboard/creator-dashboard';
import { Spinner } from '@/components/ui/spinner';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  switch (user.role) {
    case 'Student':
      return <StudentDashboard />;
    case 'Guru':
      return <GuruDashboard />;
    case 'Creator':
      return <CreatorDashboard />;
    default:
      return <div>Invalid role</div>;
  }
}
