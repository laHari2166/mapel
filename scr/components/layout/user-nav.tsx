'use client';

import { LogOut, ChevronsLeftRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useSidebar } from '../ui/sidebar';

export function UserNav() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  
  if (!user) return null;

  const userInitial = user.username.charAt(0).toUpperCase();

  if (state === 'collapsed') {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    {user.role}
                    </p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-sm font-medium">{user.username}</span>
          <span className="truncate text-xs text-muted-foreground">{user.role}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={logout}>
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
