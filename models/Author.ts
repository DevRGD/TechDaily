import mongoose, { Schema, Document } from 'mongoose';
import { Author } from '../types';

export interface IAuthor extends Omit<Author, '_id'>, Document {}

const AuthorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String },
    link: { type: String },
  },
  { timestamps: true, collection: 'authors' },
);

export default mongoose.models.authors || mongoose.model<IAuthor>('authors', AuthorSchema);
