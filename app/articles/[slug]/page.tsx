import Image from 'next/image';
import Typography from '@/components/ui/Typography';
import AuthorMeta from '@/components/AuthorMeta';
import ArticleCard from '@/components/ArticleCard';
import ViewCounter from '@/components/ViewCounter';
import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';

import { formatRelativeTime } from '@/lib/date-utils';
import { Metadata } from 'next';
import { cache } from 'react';
import { Category, Tag, Article as ArticleType } from '@/types';

const getArticleDataCached = cache(getArticleData);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticleDataCached(slug);

  if (!data) return {};

  const { article } = data;

  return {
    metadataBase: new URL('https://techdaily-devrgd.vercel.app'),
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `/articles/${article.slug}`,
      siteName: 'TechDaily',
      images: [
        {
          url: article.image,
          secureUrl: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.createdAt,
      authors: [article.author.name],
      tags: article.tags?.map((t: { name: string }) => t.name) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

async function markdownToHtml(markdown: string) {
  const processedMarkdown = markdown.replace(/\\n/g, '\n');
  const result = await remark().use(gfm).use(html, { sanitize: false }).process(processedMarkdown);
  return result.toString();
}

export const dynamic = 'force-dynamic';

async function getArticleData(slug: string) {
  await dbConnect();

  const articles = await Article.aggregate([
    { $match: { slug: slug } },
    { $limit: 1 },
    {
      $addFields: {
        authorId: '$author',
        categoryIds: '$categories',
        tagIds: { $ifNull: ['$tags', []] },
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
      $lookup: {
        from: 'tags',
        let: { tagIds: '$tagIds' },
        pipeline: [{ $match: { $expr: { $in: [{ $toString: '$_id' }, '$$tagIds'] } } }],
        as: 'tags',
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
        tags: {
          $map: {
            input: '$tags',
            as: 't',
            in: {
              _id: { $toString: '$$t._id' },
              name: '$$t.name',
              slug: '$$t.slug',
            },
          },
        },
      },
    },
  ]);

  if (articles.length === 0) return null;

  const article = articles[0];

  const categoryId = article.categories[0]?._id;
  const relatedArticles = await Article.aggregate([
    {
      $match: {
        slug: { $ne: slug },
        categories: categoryId,
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: 2 },
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
        image: 1,
        time: 1,
        reads: 1,
        source: 1,
        createdAt: { $dateToString: { format: '%Y-%m-%dT%H:%M:%S.%LZ', date: { $toDate: '$createdAt' } } },
        author: {
          name: '$author.name',
          avatar: '$author.avatar',
        },
        categories: {
          $map: {
            input: '$categories',
            as: 'cat',
            in: {
              name: '$$cat.name',
              slug: '$$cat.slug',
            },
          },
        },
      },
    },
  ]);

  return { article, relatedArticles };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getArticleDataCached(slug);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Typography variant="h4">Article not found.</Typography>
      </div>
    );
  }

  const { article, relatedArticles } = data;
  const displayDate = formatRelativeTime(article.createdAt);
  const contentHtml = await markdownToHtml(article.content || '');

  return (
    <div className="relative flex min-h-screen flex-col">
      <ViewCounter slug={slug} />
      <main className="flex-1">
        <article className="container mx-auto max-w-7xl px-4 py-16 md:py-24 space-y-12">
          <div className="space-y-8 w-full">
            <Typography variant="h1" className="text-left uppercase italic leading-[1.1]">
              {article.title}
            </Typography>

            <Typography variant="lead" className="text-left border-l-2 border-primary/20 pl-6 md:pl-8 max-w-none">
              {article.excerpt}
            </Typography>
          </div>

          <div className="space-y-6">
            <div className="aspect-video relative overflow-hidden rounded-sm border border-border shadow-2xl">
              <Image src={article.image} alt={article.title} fill className="object-cover" priority />
            </div>

            <div className="relative z-20 py-6 border-y border-border/50 text-muted-foreground/70 w-full">
              <div className="flex items-center gap-x-6 gap-y-3 flex-wrap w-full">
                <div className="flex items-center shrink-0">
                  <AuthorMeta
                    name={article.author.name}
                    avatar={article.author.avatar}
                    date={article.createdAt || ''}
                    link={article.author.link}
                    variant="inline"
                  />
                </div>
                {article.source && (
                  <div className="flex items-center gap-2 italic font-serif tracking-normal normal-case whitespace-nowrap shrink-0">
                    <span className="text-muted-foreground/40 not-italic uppercase text-[9px] font-sans tracking-widest">
                      via
                    </span>
                    {article.source.link ? (
                      <a
                        href={article.source.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-foreground/90 hover:text-primary transition-all uppercase tracking-widest font-sans not-italic"
                      >
                        {article.source.name}
                      </a>
                    ) : (
                      <span className="text-[11px] font-bold text-foreground/90 uppercase tracking-widest font-sans not-italic">
                        {article.source.name}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center shrink-0 md:mx-auto">
                  <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
                    {article.categories.map((cat: Category, index: number) => (
                      <Link
                        key={index}
                        href={`/categories/${cat.slug}`}
                        className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/10 px-3.5 py-1.5 rounded-sm hover:bg-primary/20 transition-all cursor-pointer whitespace-nowrap relative z-30 focus:outline-none"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 whitespace-nowrap shrink-0 text-[10px] font-semibold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[14px] text-primary/40">calendar_today</span>
                  <span className="mt-0.5">{displayDate}</span>
                </div>

                <div className="flex items-center gap-2 whitespace-nowrap shrink-0 text-[10px] font-semibold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[14px] text-primary/40">visibility</span>
                  <span className="mt-0.5">
                    {article.reads >= 1000 ? `${(article.reads / 1000).toFixed(1)}k` : article.reads} Reads
                  </span>
                </div>

                <div className="flex items-center gap-2 whitespace-nowrap shrink-0 text-[10px] font-semibold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[14px] text-primary/40">schedule</span>
                  <span className="mt-0.5">{article.time} min read</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto md:mx-0">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-12 border-t border-border/30">
              {article.tags.map((tag: Tag, index: number) => {
                const tagName = typeof tag === 'string' ? tag : tag.name;
                return (
                  <Link
                    key={index}
                    href={`/search?tags=${tagName.toLowerCase()}`}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground bg-muted/30 px-4 py-2 hover:bg-muted/50 hover:text-primary transition-all cursor-pointer whitespace-nowrap"
                  >
                    {`#${tagName}`}
                  </Link>
                );
              })}
            </div>
          )}

          <section className="pt-24 space-y-12 border-t border-border">
            <div className="flex items-center gap-4">
              <Typography variant="h2" className="uppercase">
                Related Investigator Reports
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {relatedArticles.map((rel: ArticleType) => (
                <ArticleCard key={rel._id} {...rel} variant="grid" />
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
