import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
