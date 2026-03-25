'use client';

import Link from 'next/link';
import Typography from './ui/Typography';
import AuthorMeta from './AuthorMeta';
import { cn } from '@/lib/utils';
import { Article } from '@/types';
import { formatRelativeTime } from '@/lib/date-utils';

export interface ArticleCardProps extends Article {
  variant?: 'hero' | 'grid' | 'list' | 'featured';
  activeCategorySlug?: string;
}

const MetadataEyebrow = ({
  className,
  author,
  createdAt,
  categories,
  displayDate,
  time,
  source,
  reads,
  activeCategorySlug,
}: {
  className?: string;
  author: Article['author'];
  createdAt?: string;
  categories: Article['categories'];
  categoryLink?: string;
  displayDate: string;
  time: number;
  source?: Article['source'];
  reads: number;
  activeCategorySlug?: string;
}) => {
  const activeCategory = activeCategorySlug
    ? categories.find((cat) => (typeof cat === 'string' ? cat.toLowerCase() : cat.slug) === activeCategorySlug)
    : categories[0];

  const primaryCategory = activeCategory || categories[0];
  const categoryName = typeof primaryCategory === 'string' ? primaryCategory : primaryCategory?.name;
  const categorySlug = typeof primaryCategory === 'string' ? primaryCategory.toLowerCase() : primaryCategory?.slug;

  return (
    <div
      className={cn('flex items-center gap-x-4 gap-y-2 flex-wrap relative z-20 text-muted-foreground/60', className)}
    >
      <AuthorMeta
        name={author.name}
        avatar={author.avatar}
        date={createdAt || ''}
        link={author.link}
        variant="inline"
        className="shrink-0"
      />
      <Link
        href={`/categories/${categorySlug}`}
        onClick={(e) => e.stopPropagation()}
        className="text-primary hover:underline cursor-pointer relative z-30 inline-block focus:outline-none whitespace-nowrap shrink-0"
      >
        <Typography variant="caption">{categoryName}</Typography>
      </Link>
      <span className="opacity-30 shrink-0">•</span>
      <Typography variant="caption" className="whitespace-nowrap shrink-0" suppressHydrationWarning>
        {displayDate}
      </Typography>
      <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
        <span className="material-symbols-outlined text-[14px] text-primary/40">visibility</span>
        <Typography variant="caption" className="mt-0.5">
          {reads >= 1000 ? `${(reads / 1000).toFixed(1)}k` : reads} Reads
        </Typography>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
        <span className="material-symbols-outlined text-[14px] text-primary/40">schedule</span>
        <Typography variant="caption" className="mt-0.5">
          {time} Min Read
        </Typography>
      </div>
      {source && (
        <>
          <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
            <span className="text-[10px] lowercase font-sans opacity-60 tracking-normal">via</span>
            {source.link ? (
              <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] font-bold text-foreground/80 hover:text-primary transition-all cursor-pointer relative z-30 not-italic uppercase tracking-widest font-sans"
              >
                {source.name}
              </a>
            ) : (
              <span className="text-[11px] font-bold text-foreground/80 uppercase tracking-widest font-sans not-italic">
                {source.name}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const ListMetadata = ({
  isNested = false,
  author,
  createdAt,
  categories,
  displayDate,
  time,
  source,
  reads,
  activeCategorySlug,
}: {
  isNested?: boolean;
  author: Article['author'];
  createdAt?: string;
  categories: Article['categories'];
  displayDate: string;
  time: number;
  source?: Article['source'];
  reads: number;
  activeCategorySlug?: string;
}) => {
  const activeCategory = activeCategorySlug
    ? categories.find((cat) => (typeof cat === 'string' ? cat.toLowerCase() : cat.slug) === activeCategorySlug)
    : categories[0];

  const primaryCategory = activeCategory || categories[0];
  const categoryName = typeof primaryCategory === 'string' ? primaryCategory : primaryCategory?.name;
  const categorySlug = typeof primaryCategory === 'string' ? primaryCategory.toLowerCase() : primaryCategory?.slug;

  return (
    <div
      className={cn(
        'relative z-20 flex flex-wrap items-center gap-x-6 gap-y-4 pt-6 text-muted-foreground/40',
        isNested ? 'border-none pt-2' : 'border-t border-border/30',
      )}
    >
      <div className="flex items-center gap-x-6 gap-y-2 flex-wrap min-w-0">
        <div className="flex items-center shrink-0">
          <AuthorMeta
            name={author.name}
            avatar={author.avatar}
            date={createdAt || ''}
            link={author.link}
            variant="inline"
          />
        </div>

        <Link
          href={`/categories/${categorySlug}`}
          onClick={(e) => e.stopPropagation()}
          className="text-primary hover:underline cursor-pointer relative z-30 focus:outline-none shrink-0"
        >
          <Typography variant="caption" className="tracking-[0.2em] text-[11px] font-bold whitespace-nowrap">
            {categoryName}
          </Typography>
        </Link>

        <div className="flex items-center gap-2 font-sans whitespace-nowrap shrink-0 text-[11px] uppercase tracking-[0.15em]">
          <span className="material-symbols-outlined text-[14px] text-primary/40">calendar_today</span>
          <span className="mt-0.5" suppressHydrationWarning>
            {displayDate}
          </span>
        </div>

        <div className="flex items-center gap-2 font-sans whitespace-nowrap shrink-0 text-[11px] uppercase tracking-[0.15em]">
          <span className="material-symbols-outlined text-[14px] text-primary/40">visibility</span>
          <span className="mt-0.5">{reads >= 1000 ? `${(reads / 1000).toFixed(1)}k` : reads} Reads</span>
        </div>

        <div className="flex items-center gap-2 font-sans whitespace-nowrap shrink-0 text-[11px] uppercase tracking-[0.15em]">
          <span className="material-symbols-outlined text-[14px] text-primary/40">schedule</span>
          <span className="mt-0.5">{time} Min Read</span>
        </div>

        {source && (
          <>
            <div className="flex items-center gap-2 italic font-serif tracking-normal normal-case whitespace-nowrap shrink-0">
              <span className="text-muted-foreground/30 not-italic uppercase text-[10px] font-sans font-bold tracking-[0.15em]">
                via
              </span>
              {source.link ? (
                <a
                  href={source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[12px] font-bold text-foreground/80 hover:text-primary transition-all cursor-pointer relative z-30 not-italic uppercase tracking-widest font-sans"
                >
                  {source.name}
                </a>
              ) : (
                <span className="text-[12px] font-bold text-foreground/80 uppercase tracking-widest font-sans not-italic">
                  {source.name}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function ArticleCard({
  slug,
  title,
  excerpt,
  categories,
  image,
  author,
  createdAt,
  time,
  variant = 'grid',
  source,
  categoryLink,
  reads,
  activeCategorySlug,
}: ArticleCardProps) {
  const displayDate = formatRelativeTime(createdAt);
  const articleLink = `/articles/${slug}`;

  const primaryCategory = categories[0];
  const categoryName = typeof primaryCategory === 'string' ? primaryCategory : primaryCategory?.name;
  const categorySlug = typeof primaryCategory === 'string' ? primaryCategory.toLowerCase() : primaryCategory?.slug;

  if (variant === 'hero') {
    return (
      <div className="group block relative overflow-hidden rounded-sm border border-border bg-background transition-all duration-500 hover:border-primary/30">
        <Link href={articleLink} className="absolute inset-0 z-10" aria-label={title} />

        <div className="flex flex-col space-y-0 relative">
          <div className="relative overflow-hidden aspect-video md:aspect-21/9 border-b border-border">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${image})` }}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
          </div>

          <div className="p-8 md:p-12 lg:p-16 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
            <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-y-6 pb-6 border-b border-border/50">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center shrink-0">
                  <Link
                    href={`/categories/${categorySlug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/10 px-3.5 py-1.5 rounded-sm hover:bg-primary/20 transition-all cursor-pointer whitespace-nowrap relative z-30 focus:outline-none"
                  >
                    {categoryName}
                  </Link>
                </div>

                <div className="h-4 w-px bg-border/40 hidden sm:block" />

                <div className="flex items-center shrink-0">
                  <AuthorMeta
                    name={author.name}
                    avatar={author.avatar}
                    date={createdAt || ''}
                    link={author.link}
                    variant="inline"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest whitespace-nowrap shrink-0">
                <div className="flex items-center gap-4 flex-nowrap">
                  <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-primary/40">calendar_today</span>
                    <span className="mt-0.5" suppressHydrationWarning>
                      {displayDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-primary/40">visibility</span>
                    <span className="mt-0.5">{reads >= 1000 ? `${(reads / 1000).toFixed(1)}k` : reads} Reads</span>
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-primary/40">schedule</span>
                    <span className="mt-0.5">{time} Min Read</span>
                  </div>
                </div>

                {source && (
                  <>
                    <div className="h-4 w-px bg-border/40 hidden sm:block shrink-0" />
                    <div className="flex items-center gap-2 italic font-serif tracking-normal normal-case whitespace-nowrap shrink-0">
                      <span className="text-muted-foreground/40 not-italic uppercase text-[9px] font-sans tracking-widest">
                        Source:
                      </span>
                      {source.link ? (
                        <a
                          href={source.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-bold text-foreground/90 hover:text-primary transition-all cursor-pointer relative z-30"
                        >
                          {source.name}
                        </a>
                      ) : (
                        <span className="text-[11px] font-bold text-foreground/90">{source.name}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-6 w-full">
              <Typography
                variant="h1"
                className="group-hover:text-primary transition-all duration-700 text-left uppercase italic leading-[1.1]"
              >
                {title}
              </Typography>

              <Typography variant="lead" className="text-left border-l-2 border-primary/20 pl-6 md:pl-8 max-w-none">
                {excerpt}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="@container group relative flex flex-col gap-10 py-12 md:py-16 border-b border-border/60 transition-all hover:bg-secondary/5 px-4 -mx-4 overflow-hidden">
        <Link href={articleLink} className="absolute inset-0 z-10" aria-label={title} />

        <div className="grid grid-cols-12 gap-5 @md:gap-12 items-start">
          <div className="col-span-12 @[400px]:col-span-5 @[1024px]:col-span-4 aspect-video relative overflow-hidden rounded-sm border border-border/80 shadow-sm">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
          <div className="col-span-12 @[400px]:col-span-7 @[1024px]:col-span-8 flex flex-col space-y-2 @md:space-y-4">
            <Typography
              variant="h2"
              className="group-hover:text-primary transition-colors font-serif leading-[1.2] @md:leading-[1.1] tracking-tight text-lg @md:text-3xl"
            >
              {title}
            </Typography>
            <Typography
              variant="body"
              className="opacity-70 line-clamp-2 @md:line-clamp-2 font-serif text-sm @md:text-lg leading-relaxed"
            >
              {excerpt}
            </Typography>

            <div className="hidden @[1024px]:block pt-4">
              <ListMetadata
                isNested={true}
                author={author}
                createdAt={createdAt}
                categories={categories}
                displayDate={displayDate}
                time={time}
                source={source}
                reads={reads}
                activeCategorySlug={activeCategorySlug}
              />
            </div>
          </div>
        </div>

        <div className="@[1024px]:hidden w-full">
          <ListMetadata
            author={author}
            createdAt={createdAt}
            categories={categories}
            displayDate={displayDate}
            time={time}
            source={source}
            reads={reads}
            activeCategorySlug={activeCategorySlug}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="group block relative space-y-6">
      <Link href={articleLink} className="absolute inset-0 z-10" aria-label={title} />

      <div className="aspect-video relative overflow-hidden rounded-sm border border-border">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      <div className="space-y-4 relative">
        <MetadataEyebrow
          author={author}
          createdAt={createdAt}
          categories={categories}
          categoryLink={categoryLink}
          displayDate={displayDate}
          time={time}
          source={source}
          reads={reads}
          activeCategorySlug={activeCategorySlug}
        />
        <Typography variant="h3" className="group-hover:text-primary transition-colors uppercase tracking-tight">
          {title}
        </Typography>
        <Typography variant="body-sm" className="opacity-60 line-clamp-2">
          {excerpt}
        </Typography>
      </div>
    </div>
  );
}
