'use client';

import { cn } from '@/lib/utils';
import Typography from './ui/Typography';

interface AuthorMetaProps {
  name: string;
  avatar?: string;
  date: string;
  readTime?: string;
  link?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'inline';
}

const AuthorName = ({ name }: { name: string }) => (
  <Typography variant="caption" className="text-foreground">
    {name}
  </Typography>
);

export default function AuthorMeta({ name, avatar, readTime, link, className, variant = 'default' }: AuthorMetaProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div
          className="size-5 shrink-0 bg-secondary rounded-full bg-cover bg-center border border-border"
          style={avatar ? { backgroundImage: `url(${avatar})` } : {}}
        />
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:text-primary transition-colors cursor-pointer relative z-30"
          >
            <AuthorName name={name} />
          </a>
        ) : (
          <AuthorName name={name} />
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'shrink-0 bg-secondary rounded-full bg-cover bg-center border border-border',
          variant === 'default' ? 'size-10' : 'size-6',
        )}
        style={avatar ? { backgroundImage: `url(${avatar})` } : {}}
      />
      <div className="flex flex-col">
        <Typography variant="body-sm" className="font-bold text-foreground">
          {name}
        </Typography>
        <div className="flex items-center gap-2">
          {readTime && (
            <Typography variant="caption" className="normal-case font-medium">
              {readTime}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
