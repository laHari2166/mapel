import { Logo } from '@/components/logo';
import { RoleSelector } from '@/components/auth/role-selector';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(157,78,221,0.3),rgba(255,255,255,0))]"></div>
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center space-y-12 p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <p className="max-w-2xl text-lg text-foreground/80 md:text-xl">
            “MAPEL — Study Simple, Score Ample.”
          </p>
        </div>
        <div className="w-full max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Choose Your Path</h2>
          <RoleSelector />
        </div>
      </main>
    </div>
  );
}
