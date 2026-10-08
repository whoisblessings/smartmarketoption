import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, strong, onClick }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? 'glass-strong' : 'glass-card',
        'p-5',
        onClick && 'cursor-pointer hover:bg-white/10 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}