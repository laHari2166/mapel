'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { AppNav } from './app-nav';
import { UserNav } from './user-nav';
import { Separator } from '../ui/separator';

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <Logo size='default' />
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent>
        <AppNav />
      </SidebarContent>
      <Separator className='my-2' />
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
