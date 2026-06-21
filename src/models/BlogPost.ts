import mongoose, { Schema, models, model } from "mongoose"

const BlogPostSchema = new Schema(
  {
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, default: "", trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerptAr: { type: String, default: "" },
    excerptEn: { type: String, default: "" },
    contentAr: { type: String, default: "" },
    contentEn: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    category: { type: String, default: "news" },
    author: { type: String, default: "" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export type BlogPostDoc = {
  _id: string
  titleAr: string
  titleEn: string
  slug: string
  excerptAr: string
  excerptEn: string
  contentAr: string
  contentEn: string
  coverImage: string
  category: string
  author: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default models.BlogPost || model("BlogPost", BlogPostSchema)
