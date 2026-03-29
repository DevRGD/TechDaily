import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import sendEmail from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp, preference } = body;

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    await dbConnect();

    const subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    if (subscriber.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    const isUnsubscribing = preference === 'unsubscribe';
    if (isUnsubscribing) {
      subscriber.isActive = false;
    } else {
      subscriber.isActive = true;
      if (preference) {
        subscriber.preference = preference;
      }
    }
    subscriber.otp = '';
    await subscriber.save();

    await sendEmail({
      slug: isUnsubscribing ? 'unsubscribed-confirmation' : 'subscribed-confirmation',
      to: email,
      replacements: {
        preheader: isUnsubscribing 
          ? 'You have successfully unsubscribed from TechDaily.' 
          : 'Welcome to the network! Your subscription is now active.'
      }
    });

    return NextResponse.json({ message: 'Subscription successfully verified' }, { status: 200 });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
