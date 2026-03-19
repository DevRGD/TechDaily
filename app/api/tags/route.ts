import { NextResponse } from 'next/server';
import { Tag as TagType } from '@/types';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    const topTags = await Article.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 12 },
      {
        $lookup: {
          from: 'tags',
          let: { tagId: '$_id' },
          pipeline: [{ $match: { $expr: { $eq: [{ $toString: '$_id' }, '$$tagId'] } } }],
          as: 'tagDoc',
        },
      },
      { $unwind: '$tagDoc' },
      {
        $project: {
          _id: 0,
          name: '$tagDoc.name',
          slug: '$tagDoc.slug',
        },
      },
    ]);

    return NextResponse.json(topTags);
  } catch (error) {
    console.error('Tags fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
