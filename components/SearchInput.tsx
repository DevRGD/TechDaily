'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export default function SearchInput({ className, containerClassName, ...props }: SearchInputProps) {
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative w-full group', containerClassName)}>
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-[18px] group-focus-within:text-primary transition-colors">
        search
      </span>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={cn(
          'w-full bg-secondary/40 border border-border/40 rounded-sm pl-11 pr-4 py-2 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/40 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/30 shadow-none hover:bg-secondary/60',
          className,
        )}
        {...props}
      />
    </form>
  );
}
