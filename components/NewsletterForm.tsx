'use client';

import { useState } from 'react';
import Typography from './ui/Typography';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'card' | 'mega';
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

type Status = 'idle' | 'otp' | 'success' | 'error';

export default function NewsletterForm({ variant = 'default', className, onFocus, onBlur }: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'idle') {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setStatus('error');
        setErrorMsg('Invalid email address');
        setTimeout(() => setStatus('idle'), 3000);
        return;
      }

      console.log(`OTP sent to ${email}`);
      setStatus('otp');
      setOtp('');
    } else if (status === 'otp') {
      if (!otp) {
        setStatus('error');
        setErrorMsg('Please enter OTP');
        setTimeout(() => setStatus('otp'), 3000);
        return;
      }

      if (otp.length >= 4) {
        console.log(`Success: OTP verified for ${email}`);
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setEmail('');
          setOtp('');
        }, 3000);
      } else {
        console.log(`Error: Invalid OTP (${otp}) for ${email}`);
        setStatus('error');
        setErrorMsg('Invalid OTP. Try again.');
        setTimeout(() => setStatus('otp'), 3000);
      }
    }
  };

  const isCard = variant === 'card';
  const isMega = variant === 'mega';

  const cardInputClasses =
    'w-full bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-sm focus:ring-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all font-sans';
  const defaultInputClasses =
    'w-full px-5 py-4 rounded-sm border border-border bg-secondary/50 text-base focus:ring-2 focus:ring-primary focus:bg-background outline-none transition-all pr-48';
  const megaInputClasses =
    'w-full bg-background border border-border/60 px-4 py-2 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-sans placeholder:text-muted-foreground/50';

  const renderInput = (baseClasses: string, defaultPlaceholder: string) => {
    if (status === 'success') {
      return (
        <div
          className={cn(
            baseClasses,
            'flex items-center gap-3',
            isCard
              ? 'bg-green-500/20 text-green-100 border-transparent'
              : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
          )}
        >
          <span className="material-symbols-outlined text-green-500 animate-bounce">check_circle</span>
          <span className="font-medium overflow-hidden whitespace-nowrap">Success!</span>
        </div>
      );
    }
    if (status === 'error') {
      return (
        <div
          className={cn(
            baseClasses,
            'flex items-center gap-3',
            isCard
              ? 'bg-red-500/20 text-red-100 border-transparent'
              : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
          )}
        >
          <span className="material-symbols-outlined text-red-500 animate-pulse">error</span>
          <span className="font-medium truncate">{errorMsg}</span>
        </div>
      );
    }
    if (status === 'otp') {
      return (
        <input
          className={baseClasses}
          placeholder="Enter OTP (e.g. 1234)"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          required
          autoFocus
        />
      );
    }
    return (
      <input
        className={baseClasses}
        placeholder={defaultPlaceholder}
        type="text"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  };

  const buttonText =
    status === 'otp' ? 'Verify' : status === 'success' ? 'Done' : status === 'error' ? 'Wait' : 'Subscribe';
  const buttonDisabled = status === 'success' || status === 'error';

  if (isCard) {
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
          <form className="space-y-3 pt-2" onSubmit={handleSubmit} noValidate>
            {renderInput(cardInputClasses, 'you@company.com')}
            <Button
              type="submit"
              disabled={buttonDisabled}
              className={cn(
                'w-full bg-white text-primary hover:bg-white/90 uppercase tracking-widest text-xs transition-colors',
                buttonDisabled && 'opacity-50 cursor-not-allowed hover:bg-white',
              )}
            >
              {buttonText}
            </Button>
          </form>
          <Typography variant="caption" className="text-primary-foreground/50 text-center block">
            No spam. Unsubscribe anytime.
          </Typography>
        </div>
      </section>
    );
  }

  if (isMega) {
    return (
      <form className={cn('space-y-3', className)} onSubmit={handleSubmit} noValidate>
        {renderInput(megaInputClasses, 'Email address')}
        <Button
          type="submit"
          disabled={buttonDisabled}
          className={cn(
            'w-full bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-[0.2em] text-[11px] font-black h-11 rounded-none shadow-none transition-colors',
            buttonDisabled && 'opacity-50 cursor-not-allowed hover:bg-primary',
          )}
        >
          {buttonText}
        </Button>
      </form>
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
      <form className="flex flex-col gap-5 max-w-xl" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-wrap items-center gap-6 mb-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="checkbox" value="daily" className="peer sr-only" defaultChecked />
              <span className="material-symbols-outlined text-[16px] text-primary opacity-0 peer-checked:opacity-100 transition-opacity absolute">
                check
              </span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">
              Daily
            </Typography>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="checkbox" value="weekly" className="peer sr-only" />
              <span className="material-symbols-outlined text-[16px] text-primary opacity-0 peer-checked:opacity-100 transition-opacity absolute">
                check
              </span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">
              Weekly
            </Typography>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="checkbox" value="monthly" className="peer sr-only" />
              <span className="material-symbols-outlined text-[16px] text-primary opacity-0 peer-checked:opacity-100 transition-opacity absolute">
                check
              </span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">
              Monthly
            </Typography>
          </label>
        </div>

        <div className="relative flex items-center w-full">
          {renderInput(defaultInputClasses, 'name@company.com')}
          <Button
            type="submit"
            disabled={buttonDisabled}
            className={cn(
              'absolute right-2 top-2 bottom-2 h-auto text-xs uppercase tracking-widest px-6 w-36 transition-colors',
              buttonDisabled && 'opacity-50 cursor-not-allowed hover:bg-primary',
            )}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
}
