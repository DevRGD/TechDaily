import mongoose, { Schema, Document } from 'mongoose';
import { Category } from '../types';

export interface ICategory extends Omit<Category, '_id'>, Document {}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: 'categories' },
);

export default mongoose.models.categories || mongoose.model<ICategory>('categories', CategorySchema);
