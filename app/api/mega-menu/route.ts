import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    const megaMenuData = await Category.aggregate([
      { $sort: { name: 1 } },
      {
        $addFields: {
          idString: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'articles',
          let: { cat: '$idString' },
          pipeline: [
            { $match: { $expr: { $in: ['$$cat', '$categories'] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 2 },
            { $project: { title: 1, slug: 1, image: 1 } },
          ],
          as: 'articles',
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          articles: 1,
        },
      },
    ]);

    return NextResponse.json(megaMenuData);
  } catch (error) {
    console.error('Mega menu fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch mega menu data' }, { status: 500 });
  }
}
