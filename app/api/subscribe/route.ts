import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import sendEmail from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, preference } = body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    await dbConnect();

    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (preference === 'unsubscribe') {
      if (!existingSubscriber || !existingSubscriber.isActive) {
        return NextResponse.json({ status: 'info', message: 'You are not subscribed.' }, { status: 200 });
      }

      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      existingSubscriber.otp = otp;
      await existingSubscriber.save();

      await sendEmail({
        slug: 'otp-verification',
        to: email,
        replacements: { otp },
      });

      return NextResponse.json({ message: 'OTP sent to confirm unsubscription' }, { status: 200 });
    }

    if (existingSubscriber) {
      const isPreferenceMatch = existingSubscriber.preference === preference;

      if (isPreferenceMatch && existingSubscriber.isActive) {
        return NextResponse.json(
          { status: 'already_subscribed', message: 'You are already subscribed!' },
          { status: 200 },
        );
      }

      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      existingSubscriber.otp = otp;
      await existingSubscriber.save();

      await sendEmail({
        slug: 'otp-verification',
        to: email,
        replacements: { otp },
      });

      return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: {
          email: email.toLowerCase(),
          preference: preference || 'daily',
          isActive: false,
          otp: otp,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    await sendEmail({
      slug: 'otp-verification',
      to: email,
      replacements: { otp },
    });

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
  }
}
