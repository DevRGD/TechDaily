import Typography from '@/components/ui/Typography';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { Article } from '@/types';

async function getCategoriesData() {
  await dbConnect();

  const categories = await Category.aggregate([
    {
      $lookup: {
        from: 'articles',
        let: { categoryId: { $toString: '$_id' } },
        pipeline: [
          { $match: { $expr: { $in: ['$$categoryId', '$categories'] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
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
              as: 'allCategories',
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
                  input: '$allCategories',
                  as: 'cat',
                  in: {
                    name: '$$cat.name',
                    slug: '$$cat.slug',
                  },
                },
              },
            },
          },
        ],
        as: 'articles',
      },
    },
    { $sort: { name: 1 } },
  ]);

  return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategoriesData();

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="space-y-6 mb-24 text-left border-b border-border pb-16">
            <Typography variant="caption" className="text-primary font-bold uppercase tracking-widest">
              Directory
            </Typography>
            <Typography variant="h1" className="uppercase text-left tracking-tighter">
              Technical Categories
            </Typography>
            <Typography variant="lead" className="max-w-4xl text-left opacity-70 italic font-serif">
              Explore our comprehensive archive of technical reporting, policy analysis, and hardware breakthroughs
              categorized by technological frontier.
            </Typography>
          </div>

          <div className="space-y-24">
            {categories.map((category) => (
              <div key={category.slug} className="space-y-12">
                <Link
                  href={`/categories/${category.slug}`}
                  className="group relative flex items-end justify-between gap-6 pb-6 border-b border-border transition-all duration-500 cursor-pointer"
                >
                  <Typography
                    variant="h2"
                    className="uppercase tracking-[0.1em] text-3xl md:text-5xl font-black group-hover:text-primary transition-colors duration-500"
                  >
                    {category.name}
                  </Typography>

                  <div className="flex items-center gap-3 mb-2 shrink-0">
                    <Typography
                      variant="caption"
                      className="font-black tracking-[0.2em] text-[10px] opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all"
                    >
                      EXPLORE ARCHIVE
                    </Typography>
                    <div className="size-8 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-500">
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="grid grid-cols-1 gap-10">
                  {category.articles.length > 0 ? (
                    category.articles.map((article: Article) => (
                      <div key={article._id}>
                        <ArticleCard {...article} variant="list" />
                      </div>
                    ))
                  ) : (
                    <Typography variant="body" className="opacity-40 italic">
                      No reports filed in this category yet.
                    </Typography>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
