import { cn } from "@/lib/utils";

export const Logo = ({ className, size = 'default' }: { className?: string; size?: 'default' | 'large' }) => {
  const sizeClasses = size === 'large' ? 'text-6xl md:text-8xl' : 'text-4xl md:text-5xl';
  
  return (
    <div className={cn(
      "font-headline font-bold tracking-tighter",
      sizeClasses,
      className
    )}>
      <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[200%_auto] animate-shimmer">
        Mapel
      </span>
    </div>
  );
};
