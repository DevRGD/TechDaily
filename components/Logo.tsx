import Link from 'next/link';
import Typography from './ui/Typography';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
  boxClassName?: string;
}

export default function Logo({ className, textClassName, boxClassName }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 sm:gap-2.5 group shrink-0', className)}
    >
      <div
        className={cn(
          'size-6 sm:size-7 lg:size-8 border-[3px] sm:border-[3.5px] lg:border-4 border-primary rounded-[4px] sm:rounded-[5px] lg:rounded-[6px] shrink-0 shadow-sm shadow-primary/20 transition-all',
          boxClassName,
        )}
      />
      <Typography
        variant="h2"
        as="h2"
        className={cn(
          'text-[20px] xs:text-[18px] sm:text-[26px] lg:text-[30px] uppercase tracking-tighter leading-none pt-1 transition-all duration-300 whitespace-nowrap',
          textClassName,
        )}
      >
        TechDaily
      </Typography>
    </Link>
  );
}
