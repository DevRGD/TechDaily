'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setTheme(next);
    document.documentElement.setAttribute('data-theme-choice', next);
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var t = localStorage.getItem('theme') || 'system';
                document.documentElement.setAttribute('data-theme-choice', t);
              } catch (e) {}
            })()
          `,
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'theme-toggle-btn text-muted-foreground hover:text-primary transition-colors w-9 h-9 relative rounded-none border border-transparent hover:border-border/30 bg-transparent hover:bg-secondary/20 flex items-center justify-center p-0',
        )}
        onClick={toggleTheme}
        data-theme-mounted={mounted ? theme : undefined}
      >
        <Sun className="h-[18px] w-[18px] theme-icon theme-icon-light" />
        <Moon className="h-[18px] w-[18px] theme-icon theme-icon-dark" />
        <Monitor className="h-[18px] w-[18px] theme-icon theme-icon-monitor" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
