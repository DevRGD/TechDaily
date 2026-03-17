'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './ui/Button';
import Typography from './ui/Typography';
import SearchInput from './SearchInput';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Articles', href: '/articles' },
  { label: 'AI', href: '/categories/ai' },
  { label: 'Startups', href: '/categories/startups' },
  { label: 'Apps', href: '/categories/apps' },
];

interface MegaMenuCategory {
  name: string;
  slug: string;
  articles: {
    title: string;
    slug: string;
    image: string;
  }[];
}

interface TrendingTag {
  name: string;
  slug: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [categoriesData, setCategoriesData] = React.useState<MegaMenuCategory[]>([]);
  const [trendingTags, setTrendingTags] = React.useState<TrendingTag[]>([]);
  const [loading, setLoading] = React.useState(true);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [megaMenuRes, tagsRes] = await Promise.all([fetch('/api/mega-menu'), fetch('/api/tags')]);
        const megaMenu = await megaMenuRes.json();
        const tags = await tagsRes.json();
        setCategoriesData(megaMenu);
        setTrendingTags(tags);
      } catch (error) {
        console.error('Error fetching navbar data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpen = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleClose = () => {
    if (isInputFocused) return;
    closeTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="material-symbols-outlined text-primary text-[28px] font-bold leading-none select-none">
              terminal
            </span>
            <Typography variant="h4" as="h2" className="uppercase tracking-tighter leading-none pt-1">
              TechDaily
            </Typography>
          </Link>

          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group h-16 flex items-center" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
              <Link
                href="/categories"
                onClick={() => setIsMegaMenuOpen(false)}
                className="flex items-center gap-1 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest"
              >
                All Categories{' '}
                <ChevronDown className={cn('size-3 transition-transform', isMegaMenuOpen && 'rotate-180')} />
              </Link>
            </div>
          </nav>

          <div className="flex items-center justify-end gap-2 md:gap-4 flex-1 lg:flex-none">
            <div className="hidden xl:block w-full max-w-[280px]">
              <SearchInput placeholder="Search articles..." />
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="lg:hidden w-9 h-9" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'absolute left-0 top-16 w-full bg-background border-b border-border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top shadow-2xl z-40',
          isMegaMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none',
        )}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <div className="container mx-auto max-w-[1440px] flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border max-h-[85vh] overflow-y-auto no-scrollbar scroll-smooth">
          <div className="flex-1 px-8 py-12 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-6 animate-pulse">
                      <div className="h-6 w-32 bg-muted/60" />
                      <div className="space-y-4">
                        <div className="h-12 w-full bg-muted/40" />
                        <div className="h-12 w-full bg-muted/40" />
                      </div>
                    </div>
                  ))
                : categoriesData.map((cat) => (
                    <div key={cat.slug} className="space-y-6">
                      <Link
                        href={`/categories/${cat.slug}`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="flex items-center justify-between border-b border-border pb-2 group cursor-pointer"
                      >
                        <Typography
                          variant="h4"
                          className="uppercase tracking-widest text-[13px] font-black group-hover:text-primary transition-colors"
                        >
                          {cat.name}
                        </Typography>
                        <span className="material-symbols-outlined text-sm opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          arrow_forward
                        </span>
                      </Link>

                      <div className="space-y-6">
                        {cat.articles.map((art) => (
                          <Link
                            key={art.slug}
                            href={`/articles/${art.slug}`}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="flex gap-4 group/item"
                          >
                            {art.image && (
                              <div className="relative aspect-video w-24 shrink-0 overflow-hidden bg-muted">
                                <Image
                                  src={art.image}
                                  alt={art.title}
                                  fill
                                  className="object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500"
                                />
                              </div>
                            )}
                            <Typography
                              variant="body-sm"
                              className={cn(
                                'line-clamp-2 !text-sm !font-normal !leading-snug text-foreground group-hover/item:text-primary transition-colors',
                                !art.image && '!text-xs text-muted-foreground',
                              )}
                            >
                              {art.title}
                            </Typography>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="w-[320px] bg-background border-l border-border px-8 py-12 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">sell</span>
                <Typography variant="caption" className="text-foreground font-black">
                  Trending Topics
                </Typography>
              </div>
              <div className="flex flex-wrap gap-2">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-6 w-16 bg-muted/60 animate-pulse" />
                    ))
                  : trendingTags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/search?tags=${tag.slug}`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-[11px] font-bold text-muted-foreground rounded-none transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
              </div>
            </div>

            <div className="bg-secondary/20 p-6 border border-border/50">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 px-0.5">
                  <span className="material-symbols-outlined text-[10px] opacity-40">mail</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] font-black whitespace-nowrap font-sans text-foreground/90">
                    The Daily Briefing
                  </span>
                </div>
                <Typography variant="body-sm" className="text-[12px] leading-relaxed text-muted-foreground">
                  Get the top stories delivered to your inbox every morning. Join 50,000+ readers.
                </Typography>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="w-full bg-background border border-border/60 px-4 py-2 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-sans placeholder:text-muted-foreground/50"
                    placeholder="Email address"
                    type="email"
                    required
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => {
                      setIsInputFocused(false);
                      handleClose();
                    }}
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-[0.2em] text-[11px] font-black h-11 rounded-none shadow-none">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-16 bg-background border-b border-border p-6 space-y-6 transition-all duration-300 origin-top shadow-xl',
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none',
        )}
      >
        <SearchInput className="w-full" placeholder="Search stories..." />
        <nav className="flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-foreground hover:text-primary transition-colors flex items-center justify-between"
            >
              {link.label}
              <span className="material-symbols-outlined text-muted-foreground/50">chevron_right</span>
            </Link>
          ))}
          <Link
            href="/categories"
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold text-foreground hover:text-primary transition-colors flex items-center justify-between"
          >
            All Categories
            <span className="material-symbols-outlined text-muted-foreground/50">chevron_right</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
