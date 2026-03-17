import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Category from '@/models/Category';
import Tag from '@/models/Tag';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const tags = searchParams.get('tags');
    const categories = searchParams.get('categories');

    await dbConnect();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = { $and: [] };

    if (tags) {
      const tagDoc = (await Tag.findOne({ slug: tags.toLowerCase() }).lean()) as { _id: string } | null;
      if (tagDoc) {
        query.$and.push({ tags: tagDoc._id.toString() });
      } else {
        return NextResponse.json({ articles: [] });
      }
    }

    if (categories) {
      const category = (await Category.findOne({ slug: categories.toLowerCase() }).lean()) as { _id: string } | null;
      if (category) {
        query.$and.push({ categories: category._id.toString() });
      } else {
        return NextResponse.json({ articles: [] });
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

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Search fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
