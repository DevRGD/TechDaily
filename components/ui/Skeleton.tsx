import { cn } from '@/lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('bg-muted rounded-sm animate-pulse', className)} {...props} />;
}
