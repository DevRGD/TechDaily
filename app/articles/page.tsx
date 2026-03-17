'use client';

import * as React from 'react';
import ArticleCard from '@/components/ArticleCard';
import Typography from '@/components/ui/Typography';
import ArticleListSkeleton from '@/components/ArticleListSkeleton';
import { Article } from '@/types';

const BATCH_SIZE = 5;

export default function ArticlesPage() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const loadingRef = React.useRef(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles?page=1&limit=${BATCH_SIZE}`);
        const data = await res.json();
        if (isMounted) {
          setArticles(data.articles || []);
          setHasMore(data.hasMore);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching initial articles:', error);
        if (isMounted) setLoading(false);
      }
    };
    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMore = React.useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/articles?page=${nextPage}&limit=${BATCH_SIZE}`);
      const data = await res.json();

      setArticles((prev) => [...prev, ...data.articles]);
      setPage(nextPage);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [page, hasMore]);

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
              Live Feed
            </Typography>
            <Typography variant="h1" className="uppercase text-left tracking-tighter">
              Latest Stories
            </Typography>
            <Typography variant="lead" className="max-w-4xl text-left opacity-70 italic font-serif">
              Our continuous dispatch from the frontiers of technology, policy, and human progress. Updated every hour
              by our global editorial board.
            </Typography>
          </div>

          <div className="space-y-12">
            <div ref={containerRef} className="grid grid-cols-1 gap-12">
              {articles.map((article) => (
                <div key={article._id}>
                  <ArticleCard {...article} variant="list" />
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
