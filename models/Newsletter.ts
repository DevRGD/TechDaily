import mongoose, { Schema, Model } from 'mongoose';
import { INewsletter } from '@/types';

const NewsletterSchema: Schema = new Schema(
  {
    subject: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    status: { type: String, enum: ['draft', 'sent'], default: 'draft' },
    sentAt: { type: Date },
  },
  { timestamps: true },
);

const Newsletter: Model<INewsletter> =
  mongoose.models.newsletters || mongoose.model<INewsletter>('newsletters', NewsletterSchema);

export default Newsletter;
