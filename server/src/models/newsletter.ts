import mongoose, { Schema, Document } from "mongoose";

export interface INewsletterArticle extends Document {
  title: string;
  source: string;
  author?: string;
  publishedAt: Date;
  summary: string;
  articleUrl: string;
  category: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    source: { type: String, required: true },
    author: { type: String },
    publishedAt: { type: Date, required: true },
    summary: { type: String, required: true },
    articleUrl: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast searching and sorting
NewsletterArticleSchema.index({ publishedAt: -1 });
NewsletterArticleSchema.index({ category: 1 });
NewsletterArticleSchema.index({ articleUrl: 1 }, { unique: true });

export default mongoose.model<INewsletterArticle>("NewsletterArticle", NewsletterArticleSchema);
