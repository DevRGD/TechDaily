import mongoose, { Schema, Document } from 'mongoose';
import { Tag } from '../types';

export interface ITag extends Omit<Tag, '_id'>, Document {}

const TagSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: 'tags' },
);

export default mongoose.models.tags || mongoose.model<ITag>('tags', TagSchema);
