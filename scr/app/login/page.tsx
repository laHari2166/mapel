'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'Student';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8 rounded-xl bg-card/50 p-8 shadow-2xl shadow-primary/10 backdrop-blur-lg"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome, <span className="text-accent">{role}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">Sign in to continue your journey</p>
      </div>
      <LoginForm role={role as any} />
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(157,78,221,0.3),rgba(255,255,255,0))]"></div>
      <Link href="/" passHref className="absolute top-8 left-8">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
      </Link>
      <div className="absolute top-8">
        <Logo />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
