import mongoose, { Schema, Model } from 'mongoose';
import { IEmail } from '@/types';

const EmailSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    subject: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const Email: Model<IEmail> = mongoose.models.emails || mongoose.model<IEmail>('emails', EmailSchema);

export default Email;
