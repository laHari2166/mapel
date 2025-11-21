'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, GraduationCap, Youtube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Role } from '@/lib/types';

const roles = [
  {
    name: 'Student',
    description: 'Jump into lessons, track your progress, and conquer your exams.',
    icon: <User className="h-8 w-8 text-accent" />,
    href: '/login?role=Student',
  },
  {
    name: 'Guru',
    description: 'Create learning playlists and share your knowledge with students.',
    icon: <GraduationCap className="h-8 w-8 text-accent" />,
    href: '/login?role=Guru',
  },
  {
    name: 'Creator',
    description: '(youtuber/creator)Stream the smart way 🎥 — Learn it, vibe it, share it.',
    icon: <Youtube className="h-8 w-8 text-accent" />,
    href: '/login?role=Creator',
  },
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const RoleSelector = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 gap-6 md:grid-cols-3"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      {roles.map((role, index) => (
        <motion.div key={role.name} variants={cardVariants}>
          <Link href={role.href} passHref>
            <Card className="h-full transform-gpu cursor-pointer border-2 border-transparent bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:shadow-accent hover:scale-105">
              <CardHeader className="flex flex-col items-center text-center">
                {role.icon}
                <CardTitle className="mt-4 text-2xl font-bold text-foreground">{role.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-foreground/70">{role.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};
