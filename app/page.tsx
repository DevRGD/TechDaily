import Link from 'next/link';
import dbConnect from '@/lib/db';

import Article from '@/models/Article';
import ArticleCard from '@/components/ArticleCard';
import Typography from '@/components/ui/Typography';
import NewsletterForm from '@/components/NewsletterForm';
import { formatRelativeTime } from '@/lib/date-utils';
import { Metadata } from 'next';
import { Article as ArticleType } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'TechDaily | Reporting for the Digital Age',
  description:
    'Authority on AI, technical architecture, regulatory shifts, and human impact. Curated for the global tech elite.',
};

async function getHomepageData() {
  await dbConnect();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pipeline = (sortField: string, limit: number): any[] => [
    { $sort: { [sortField]: -1, createdAt: -1 } },
    { $limit: limit },
    {
      $addFields: {
        authorId: '$author',
        categoryIds: '$categories',
      },
    },
    {
      $lookup: {
        from: 'authors',
        let: { authorId: '$authorId' },
        pipeline: [{ $match: { $expr: { $eq: [{ $toString: '$_id' }, '$$authorId'] } } }],
        as: 'author',
      },
    },
    { $unwind: '$author' },
    {
      $lookup: {
        from: 'categories',
        let: { categoryIds: '$categoryIds' },
        pipeline: [{ $match: { $expr: { $in: [{ $toString: '$_id' }, '$$categoryIds'] } } }],
        as: 'categories',
      },
    },
    {
      $project: {
        _id: { $toString: '$_id' },
        slug: 1,
        title: 1,
        excerpt: 1,
        content: 1,
        image: 1,
        time: 1,
        reads: 1,
        source: 1,
        createdAt: { $dateToString: { format: '%Y-%m-%dT%H:%M:%S.%LZ', date: { $toDate: '$createdAt' } } },
        updatedAt: { $dateToString: { format: '%Y-%m-%dT%H:%M:%S.%LZ', date: { $toDate: '$updatedAt' } } },
        author: {
          _id: { $toString: '$author._id' },
          name: '$author.name',
          avatar: '$author.avatar',
          link: '$author.link',
        },
        categories: {
          $map: {
            input: '$categories',
            as: 'cat',
            in: {
              _id: { $toString: '$$cat._id' },
              name: '$$cat.name',
              slug: '$$cat.slug',
            },
          },
        },
      },
    },
  ];

  const [latestArticles, popularArticles] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Article.aggregate(pipeline('createdAt', 5) as any),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Article.aggregate(pipeline('reads', 5) as any),
  ]);

  return {
    latestArticles,
    popularArticles,
  };
}

export default async function Home() {
  const { latestArticles, popularArticles } = await getHomepageData();

  const featureArticle = latestArticles[0];
  const otherLatestArticles = latestArticles.slice(1);

  if (!featureArticle) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Typography variant="h4">No articles found. Please check your database.</Typography>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <ArticleCard {...featureArticle} variant="hero" />
        </section>

        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
          <div className="space-y-20">
            <Link
              href="/articles"
              className="group relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border transition-all duration-500 hover:border-primary/50"
            >
              <Typography variant="h2" className="group-hover:text-primary transition-colors duration-500 uppercase">
                Latest Stories
              </Typography>

              <div className="flex items-center gap-3 mb-2 shrink-0">
                <Typography
                  variant="caption"
                  className="font-black tracking-[0.2em] text-[10px] opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all"
                >
                  BROWSE ALL
                </Typography>
                <div className="size-8 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-500">
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-16">
                <div className="grid grid-cols-1 gap-16">
                  {otherLatestArticles.map((post: ArticleType) => (
                    <ArticleCard key={post._id} {...post} variant="list" />
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-16">
                <NewsletterForm variant="card" />

                <section className="bg-secondary/30 p-10 rounded-sm border border-border space-y-10">
                  <div className="flex items-center justify-between">
                    <Typography variant="caption" className="flex items-center gap-2 font-black text-foreground">
                      <span className="material-symbols-outlined text-primary text-2xl">trending_up</span>
                      Pulse
                    </Typography>
                    <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Live Updates</span>
                  </div>

                  <div className="space-y-8">
                    {popularArticles.map((article: ArticleType, i: number) => (
                      <Link
                        key={article._id}
                        href={`/articles/${article.slug}`}
                        className="flex gap-6 group cursor-pointer items-start"
                      >
                        <Typography
                          variant="h1"
                          className="text-primary/10 group-hover:text-primary transition-colors italic leading-none pt-1"
                        >
                          0{i + 1}
                        </Typography>
                        <div className="space-y-2">
                          <Typography
                            variant="h4"
                            className="group-hover:text-primary transition-colors cursor-pointer"
                          >
                            {article.title}
                          </Typography>
                          <Typography variant="body-sm" className="opacity-50 font-medium">
                            {formatRelativeTime(article.createdAt)} •{' '}
                            {article.reads >= 1000 ? `${(article.reads / 1000).toFixed(1)}k` : article.reads} Reads
                          </Typography>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
