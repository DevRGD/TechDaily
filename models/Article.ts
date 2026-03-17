import { Article } from '../types';
import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Omit<Article, 'author' | 'categories' | 'tags' | '_id'>, Document {
  author: string;
  categories: string[];
  tags: string[];
}

const ArticleSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    categories: [{ type: String, ref: 'categories', required: true }],
    tags: [{ type: String, ref: 'tags' }],
    image: { type: String, required: true },
    author: { type: String, ref: 'authors', required: true },
    time: { type: Number, required: true },
    source: { name: { type: String }, link: { type: String } },
    reads: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'articles' },
);

export default mongoose.models.articles || mongoose.model<IArticle>('articles', ArticleSchema);
