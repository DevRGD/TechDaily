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
      <form className="flex flex-col gap-5 max-w-xl" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap items-center gap-6 mb-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="checkbox" value="daily" className="peer sr-only" defaultChecked />
              <span className="material-symbols-outlined text-[16px] text-primary opacity-0 peer-checked:opacity-100 transition-opacity absolute">check</span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">Daily</Typography>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="checkbox" value="weekly" className="peer sr-only" />
              <span className="material-symbols-outlined text-[16px] text-primary opacity-0 peer-checked:opacity-100 transition-opacity absolute">check</span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">Weekly</Typography>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="checkbox" value="monthly" className="peer sr-only" />
              <span className="material-symbols-outlined text-[16px] text-primary opacity-0 peer-checked:opacity-100 transition-opacity absolute">check</span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">Monthly</Typography>
          </label>
        </div>

        <div className="relative flex items-center w-full">
          <input
            className="w-full px-5 py-4 rounded-sm border border-border bg-secondary/50 text-base focus:ring-2 focus:ring-primary focus:bg-background outline-none transition-all pr-48"
            placeholder="name@company.com"
            type="email"
            required
          />
          <Button className="absolute right-2 top-2 bottom-2 h-auto text-xs uppercase tracking-widest px-6 w-36">
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
}
