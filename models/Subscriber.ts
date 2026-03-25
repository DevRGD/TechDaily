import mongoose, { Schema, Model } from 'mongoose';
import { ISubscriber } from '@/types';

const SubscriberSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    preferences: {
      daily: { type: Boolean, default: false },
      weekly: { type: Boolean, default: false },
      monthly: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
    otp: { type: String },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true },
);

const Subscriber: Model<ISubscriber> =
  mongoose.models.subscribers || mongoose.model<ISubscriber>('subscribers', SubscriberSchema);

export default Subscriber;
