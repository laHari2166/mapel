
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Route,
  Trophy,
  BookOpen,
  PlusSquare,
  Compass,
  Rss,
  StickyNote,
  BrainCircuit,
  FilePlus,
  BookPlus,
  Sparkles,
  Radio,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';

const commonLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/notes', label: 'Notes', icon: StickyNote },
];

const studentLinks = [
    ...commonLinks,
    { href: '/study-room', label: 'Study Room', icon: Users },
    { href: '/career-hub', label: 'Live Classes', icon: Route, live: true },
    { href: '/ai-study-planner', label: 'AI Study Planner', icon: Sparkles },
    { href: '/follow-creator', label: 'Follow Creator', icon: Rss },
    { href: '/random-quiz', label: 'Random Quiz', icon: BrainCircuit },
]

const guruLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'Sell Courses', icon: BookPlus },
    { href: '/study-room', label: 'Doubt Solving', icon: Users },
    { href: '/notes', label: 'Notes', icon: StickyNote },
    { href: '/create-playlist', label: 'Create Playlist', icon: PlusSquare },
    { href: '/create-quiz', label: 'Create Quiz', icon: FilePlus },
];

const creatorLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/career-hub', label: 'Live Classes', icon: Route, live: true },
    { href: '/notes', label: 'Notes', icon: StickyNote },
    { href: '/create-course', label: 'Create Course', icon: BookPlus },
    { href: '/design-quest', label: 'Design Quest', icon: Compass },
]


export function AppNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  let navLinks = commonLinks;
  
  if(user) {
    switch (user.role) {
        case 'Student':
            navLinks = studentLinks;
            break;
        case 'Guru':
            navLinks = guruLinks;
            break;
        case 'Creator':
            navLinks = creatorLinks;
            break;
        default:
            navLinks = studentLinks; // Default to student for guests
    }
  }


  return (
    <SidebarMenu>
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} passHref>
            <SidebarMenuButton
              isActive={pathname.startsWith(link.href) && (link.href !== '/dashboard' || pathname === '/dashboard')}
              tooltip={link.label}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
              {link.live && (
                 <div className="ml-auto flex items-center gap-1.5">
                    <Radio className="h-4 w-4 text-red-500 animate-pulse" />
                    <span className="text-xs text-red-500 font-semibold animate-pulse">Live</span>
                </div>
              )}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
