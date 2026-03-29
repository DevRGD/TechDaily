import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import sendEmail from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const authHeader = req.headers.get('Authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.warn('Unauthorized newsletter dispatch attempt blocked');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!type || !['daily', 'weekly', 'monthly'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    await dbConnect();

    const now = new Date();
    const todayOnly = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    let query: any = {
      isActive: true,
      preference: type,
    };

    let slug = '';

    if (type === 'daily') {
      query.sentAt = { $lt: todayOnly };
      slug = 'daily-dispatch';
    } else if (type === 'weekly') {
      const sixDaysAgo = new Date(todayOnly);
      sixDaysAgo.setUTCDate(todayOnly.getUTCDate() - 6);
      query.sentAt = { $lte: sixDaysAgo };
      slug = 'weekly-pulse';
    } else if (type === 'monthly') {
      const twentyNineDaysAgo = new Date(todayOnly);
      twentyNineDaysAgo.setUTCDate(todayOnly.getUTCDate() - 29);
      query.sentAt = { $lte: twentyNineDaysAgo };
      slug = 'monthly-pulse';
    }

    const subscribers = await Subscriber.find(query);

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        {
          message: `No eligible ${type} subscribers found for ${todayOnly.toISOString()}`,
        },
        { status: 200 },
      );
    }

    const recipientEmails = subscribers.map((s) => s.email);

    const formattedDate = todayOnly.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    await sendEmail({
      slug,
      to: [],
      bcc: recipientEmails,
      replacements: { date: formattedDate },
    });

    await Subscriber.updateMany({ _id: { $in: subscribers.map((s) => s._id) } }, { $set: { sentAt: todayOnly } });

    return NextResponse.json({
      success: true,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} newsletter dispatched successfully.`,
      recipients: subscribers.length,
      timestamp: todayOnly.toISOString(),
    });
  } catch (error: any) {
    console.error('NEWSLETTER_DISPATCH_ERROR:', error);
    return NextResponse.json(
      {
        error: error.message || 'Internal server error during newsletter dispatch',
      },
      { status: 500 },
    );
  }
}
