'use client';

import Typography from './ui/Typography';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'card';
  className?: string;
}

export default function NewsletterForm({ variant = 'default', className }: NewsletterFormProps) {
  if (variant === 'card') {
    return (
      <section
        className={cn('bg-primary text-primary-foreground p-8 rounded-sm shadow-xl shadow-primary/20', className)}
      >
        <div className="space-y-4">
          <span className="material-symbols-outlined text-4xl">mail</span>
          <Typography variant="h3" className="text-primary-foreground">
            The Daily Dispatch
          </Typography>
          <Typography variant="body-sm" className="text-primary-foreground/80">
            Get the most important tech news delivered to your inbox every morning at 8:00 AM.
          </Typography>
          <form className="space-y-3 pt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              className="w-full bg-white/10 border-white/20 rounded-sm px-4 py-3 text-sm focus:ring-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all font-sans"
              placeholder="you@company.com"
              type="email"
              required
            />
            <Button className="w-full bg-white text-primary hover:bg-white/90 uppercase tracking-widest text-xs">
              Subscribe Free
            </Button>
          </form>
          <Typography variant="caption" className="text-primary-foreground/50 text-center block">
            No spam. Unsubscribe anytime.
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-2">
        <Typography variant="h2">The Intelligence Briefing</Typography>
        <Typography variant="body-sm" className="max-w-md">
          Join 50,000+ tech professionals receiving our curated deep-dives on AI and policy every morning.
        </Typography>
      </div>
      <form className="flex flex-col sm:flex-row gap-3 max-w-xl" onSubmit={(e) => e.preventDefault()}>
        <input
          className="flex-1 px-4 py-3 rounded-sm border border-border bg-secondary/50 text-sm focus:ring-2 focus:ring-primary focus:bg-background outline-none transition-all"
          placeholder="name@company.com"
          type="email"
          required
        />
        <Button className="uppercase tracking-widest text-xs px-8">Start Reading</Button>
      </form>
    </div>
  );
}
