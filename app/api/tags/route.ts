import { NextResponse } from 'next/server';
import { Tag as TagType } from '@/types';
import dbConnect from '@/lib/db';
import TagModel from '@/models/Tag';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    const tags = await TagModel.find({}).sort({ name: 1 }).limit(10).lean();

    return NextResponse.json(
      tags.map((tag: TagType) => ({
        name: tag.name,
        slug: tag.slug,
      })),
    );
  } catch (error) {
    console.error('Tags fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
