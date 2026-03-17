'use client';

import React from 'react';

import ArticleCard from '@/components/ArticleCard';
import Typography from '@/components/ui/Typography';
import ArticleListSkeleton from '@/components/ArticleListSkeleton';
import { Article } from '@/types';

const BATCH_SIZE = 5;

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);

  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const loadingRef = React.useRef(false);

  React.useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/categories/${slug}?page=1&limit=${BATCH_SIZE}`);
        const data = await res.json();
        if (isMounted) {
          setArticles(data.articles || []);
          setHasMore(data.hasMore);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching initial category articles:', error);
        if (isMounted) setLoading(false);
      }
    };
    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const loadMore = React.useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/categories/${slug}?page=${nextPage}&limit=${BATCH_SIZE}`);
      const data = await res.json();

      if (data.articles && data.articles.length > 0) {
        setArticles((prev) => [...prev, ...data.articles]);
        setPage(nextPage);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more category stories:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [slug, page, hasMore]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current && hasMore) {
          loadMore();
        }
      },
      { rootMargin: '0px 0px 800px 0px' },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="space-y-6 mb-24 text-left border-b border-border pb-16">
            <Typography variant="caption" className="text-primary font-bold uppercase tracking-widest">
              Collection
            </Typography>

            <Typography variant="h1" className="uppercase text-left tracking-tighter">
              {slug.replace('-', ' ')}
            </Typography>

            <Typography variant="lead" className="max-w-4xl text-left opacity-70 italic font-serif">
              A comprehensive deep-dive into the technical architecture, regulatory shifts, and human impact within the{' '}
              {slug} landscape. Curated for the global tech elite.
            </Typography>
          </div>

          <div className="space-y-12">
            <div ref={containerRef} className="grid grid-cols-1 gap-12 w-full">
              {articles.map((article) => (
                <div key={article._id}>
                  <ArticleCard {...article} variant="list" activeCategorySlug={slug} />
                </div>
              ))}

              {loading && (
                <>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <ArticleListSkeleton key={`skeleton-${i}`} />
                  ))}
                </>
              )}
            </div>

            {hasMore && <div ref={triggerRef} className="h-1 lg:h-20 w-full" aria-hidden="true" />}
          </div>
        </section>
      </main>
    </div>
  );
}
