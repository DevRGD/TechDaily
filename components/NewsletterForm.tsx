'use client';

import { useState, useEffect } from 'react';
import Typography from './ui/Typography';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'card' | 'mega';
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

type Status = 'idle' | 'otp' | 'success' | 'error' | 'info';

export default function NewsletterForm({ variant = 'default', className, onFocus, onBlur }: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preference, setPreference] = useState('daily');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlEmail = searchParams.get('email');
      const urlType = searchParams.get('type');

      if (urlEmail) setEmail(decodeURIComponent(urlEmail));

      if (urlType) {
        const typeLower = urlType.toLowerCase();
        if (['daily', 'weekly', 'monthly', 'unsubscribe'].includes(typeLower)) {
          setPreference(typeLower);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const formData = new FormData(e.currentTarget);

    if (status === 'idle') {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setStatus('error');
        setErrorMsg('Invalid email address');
        setTimeout(() => setStatus('idle'), 3000);
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, preference }),
        });

        const data = await res.json();

        if (res.ok) {
          if (data.status === 'already_subscribed' || data.status === 'info') {
            setStatus('info');
            setErrorMsg(data.message);
            setTimeout(() => setStatus('idle'), 4000);
          } else {
            setStatus('otp');
            setOtp('');
          }
        } else {
          setStatus('error');
          setErrorMsg(data.error || 'Failed to subscribe');
          setTimeout(() => setStatus('idle'), 3000);
        }
      } catch (err) {
        setStatus('error');
        setErrorMsg('Network error. Try again.');
        setTimeout(() => setStatus('idle'), 3000);
      } finally {
        setIsLoading(false);
      }
    } else if (status === 'otp') {
      if (!otp) {
        setStatus('error');
        setErrorMsg('Please enter OTP');
        setTimeout(() => setStatus('otp'), 3000);
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch('/api/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, preference }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setTimeout(() => {
            setStatus('idle');
            setEmail('');
            setOtp('');
          }, 3000);
        } else {
          setStatus('error');
          setErrorMsg(data.error || 'Invalid OTP. Try again.');
          setTimeout(() => setStatus('otp'), 3000);
        }
      } catch (err) {
        setStatus('error');
        setErrorMsg('Network error. Try again.');
        setTimeout(() => setStatus('otp'), 3000);
      } finally {
        setIsLoading(false);
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
          <style>{`
            .draw-circle { stroke-dasharray: 63; stroke-dashoffset: 63; animation: draw 0.6s ease-out forwards; }
            .draw-check { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw 0.4s ease-out 0.6s forwards; }
            @keyframes draw { to { stroke-dashoffset: 0; } }
            .fade-in-text { opacity: 0; animation: fadeIn 0.3s ease-out 0.8s forwards; }
            @keyframes fadeIn { to { opacity: 1; } }
          `}</style>
          <svg
            className="w-6 h-6 text-green-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" className="draw-circle" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" className="draw-check" />
          </svg>
          <span className="font-medium overflow-hidden whitespace-nowrap fade-in-text">Success!</span>
        </div>
      );
    }
    if (status === 'info') {
      return (
        <div
          className={cn(
            baseClasses,
            'flex items-center gap-3',
            isCard
              ? 'bg-blue-500/20 text-blue-100 border-transparent'
              : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
          )}
        >
          <span className="material-symbols-outlined text-blue-500">info</span>
          <span className="font-medium truncate">{errorMsg}</span>
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
          placeholder={`Enter OTP sent to ${email}`}
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

  const buttonText = isLoading
    ? 'Wait...'
    : status === 'otp'
      ? 'Verify'
      : status === 'success'
        ? 'Done'
        : status === 'error'
          ? 'Wait'
          : status === 'info'
            ? 'Confirmed'
            : preference === 'unsubscribe'
              ? 'Unsubscribe'
              : 'Subscribe';
  const buttonDisabled = status === 'success' || status === 'error' || status === 'info' || isLoading;

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
        <Typography variant="h2">Manage Subscription</Typography>
        <Typography variant="body-sm" className="max-w-md text-foreground/80 leading-relaxed">
          Subscribe to The Daily Dispatch, change your subscription type, or gracefully unsubscribe. Enter your email and select your preference below.
        </Typography>
      </div>
      <form className="flex flex-col gap-5 max-w-xl" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-wrap items-center gap-6 mb-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="radio" name="preference" value="daily" className="peer sr-only" checked={preference === 'daily'} onChange={(e) => setPreference(e.target.value)} />
              <span className="material-symbols-outlined text-[16px] text-green-500 opacity-0 peer-checked:opacity-100 transition-opacity absolute">
                check
              </span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">
              Daily
            </Typography>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="radio" name="preference" value="weekly" className="peer sr-only" checked={preference === 'weekly'} onChange={(e) => setPreference(e.target.value)} />
              <span className="material-symbols-outlined text-[16px] text-green-500 opacity-0 peer-checked:opacity-100 transition-opacity absolute">
                check
              </span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">
              Weekly
            </Typography>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="radio" name="preference" value="monthly" className="peer sr-only" checked={preference === 'monthly'} onChange={(e) => setPreference(e.target.value)} />
              <span className="material-symbols-outlined text-[16px] text-green-500 opacity-0 peer-checked:opacity-100 transition-opacity absolute">
                check
              </span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">
              Monthly
            </Typography>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-background rounded-sm group-hover:border-primary transition-colors">
              <input type="radio" name="preference" value="unsubscribe" className="peer sr-only" checked={preference === 'unsubscribe'} onChange={(e) => setPreference(e.target.value)} />
              <span className="material-symbols-outlined text-[16px] text-green-500 opacity-0 peer-checked:opacity-100 transition-opacity absolute">
                check
              </span>
            </div>
            <Typography variant="body-sm" className="font-semibold uppercase tracking-wider text-xs text-foreground/80">
              Unsubscribe
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
