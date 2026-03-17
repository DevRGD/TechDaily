import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const skip = (page - 1) * limit;

    await dbConnect();

    const articles = await Article.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
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
    ]);

    const total = await Article.countDocuments();

    return NextResponse.json({
      articles,
      hasMore: skip + articles.length < total,
    });
  } catch (error) {
    console.error('Articles fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
