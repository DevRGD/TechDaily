import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export default function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-border text-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
