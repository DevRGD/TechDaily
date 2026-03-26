import mongoose, { Schema, Model } from 'mongoose';
import { ISubscriber } from '@/types';

const SubscriberSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    preference: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
    isActive: { type: Boolean, default: false },
    otp: { type: String },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Subscriber: Model<ISubscriber> =
  mongoose.models.subscribers || mongoose.model<ISubscriber>('subscribers', SubscriberSchema);

export default Subscriber;
