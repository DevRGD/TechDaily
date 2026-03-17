import * as React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'caption' | 'lead';
  as?: React.ElementType;
}

export default function Typography({ className, variant = 'body', as: Component = 'p', ...props }: TypographyProps) {
  const variants = {
    h1: 'text-2xl md:text-4xl lg:text-5xl font-serif font-medium leading-[1.1] tracking-[-0.02em]',
    h2: 'text-xl md:text-3xl font-serif font-medium leading-tight tracking-tight',
    h3: 'text-lg md:text-2xl font-serif font-semibold leading-tight',
    h4: 'text-base md:text-xl font-serif font-semibold leading-snug',
    body: 'text-sm md:text-base leading-relaxed text-foreground/90 font-serif',
    'body-sm': 'text-xs md:text-sm leading-relaxed text-foreground/80 font-serif',
    caption: 'font-sans font-bold uppercase tracking-[0.1em] text-[10px] text-muted-foreground',
    lead: 'text-lg md:text-xl lg:text-2xl font-serif font-normal leading-relaxed text-foreground/85 italic',
  };

  return <Component className={cn(variants[variant], className)} {...props} />;
}
