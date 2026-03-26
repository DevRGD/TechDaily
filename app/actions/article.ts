'use server';

import dbConnect from '@/lib/db';
import Article from '@/models/Article';

export async function incrementReads(slug: string) {
  try {
    await dbConnect();
    await Article.updateOne({ slug }, { $inc: { reads: 1 } });
  } catch (error) {
    console.error('Failed to increment reads:', error);
  }
}
