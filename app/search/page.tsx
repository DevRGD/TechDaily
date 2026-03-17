import * as React from 'react';
import ArticleCard from '@/components/ArticleCard';
import Typography from '@/components/ui/Typography';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Tag from '@/models/Tag';
import Category from '@/models/Category';
import { Metadata } from 'next';
import { Article as ArticleType } from '@/types';

async function getSearchResults(q?: string, tags?: string, categories?: string) {
  await dbConnect();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = { $and: [] };

  if (tags) {
    const tagDoc = (await Tag.findOne({ slug: tags.toLowerCase() }).lean()) as { _id: string } | null;
    if (tagDoc) {
      query.$and.push({ tags: tagDoc._id.toString() });
    } else {
      return [];
    }
  }

  if (categories) {
    const category = (await Category.findOne({ slug: categories.toLowerCase() }).lean()) as { _id: string } | null;
    if (category) {
      query.$and.push({ categories: category._id.toString() });
    } else {
      return [];
    }
  }

  if (q) {
    const qRegex = { $regex: new RegExp(q, 'i') };
    query.$and.push({
      $or: [{ title: qRegex }, { excerpt: qRegex }, { content: qRegex }],
    });
  }

  if (query.$and.length === 0) {
    query = {};
  }

  const articles = await Article.aggregate([
    { $match: query },
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
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
  ]);

  return articles;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tags?: string; categories?: string }>;
}): Promise<Metadata> {
  const { q, tags, categories } = await searchParams;

  let title = 'Search Reports';
  if (q) title = `Search: ${q}`;
  else if (tags) title = `Tag: ${tags}`;
  else if (categories) title = `Category: ${categories}`;

  return {
    title: title,
    description: `Exploring matched reports, technical analysis, and industrial shifts related to ${
      q || tags || categories || 'the global tech landscape'
    }.`,
    openGraph: {
      title: `${title} | TechDaily`,
      description: `Search results and authority data for ${q || tags || categories || 'innovation and policy'}.`,
      type: 'website',
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tags?: string; categories?: string }>;
}) {
  const { q, tags, categories } = await searchParams;
  const results = await getSearchResults(q, tags, categories);

  const searchTitle = (() => {
    if (tags) return `Tags: ${tags}`;
    if (categories) return `Category: ${categories}`;
    if (q) return `Search: ${q}`;
    return 'All Stories';
  })();

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="space-y-6 mb-24 text-left border-b border-border pb-16">
            <Typography variant="caption" className="text-primary font-bold uppercase tracking-widest">
              Search Results
            </Typography>
            <Typography variant="h1" className="uppercase text-left tracking-tighter">
              {searchTitle}
            </Typography>
            <Typography variant="lead" className="max-w-4xl text-left opacity-70 italic font-serif">
              Displaying {results.length} matched reports from our global database.
            </Typography>
          </div>

          <div className="space-y-12">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-12">
                {results.map((article: ArticleType) => (
                  <div key={article._id}>
                    <ArticleCard {...article} variant="list" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center space-y-4">
                <Typography variant="h3" className="opacity-40 uppercase">
                  No internal files found
                </Typography>
                <Typography variant="body" className="opacity-60 font-serif italic text-lg">
                  Try adjusting your search parameters or browsing our archives.
                </Typography>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
