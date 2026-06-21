import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"
import { isAdmin } from "@/lib/auth"
import { slugify } from "@/lib/slug"

export const dynamic = "force-dynamic"

// Public: list published posts (optional ?limit=N)
export async function GET(req: Request) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get("limit")) || 0
  let query = BlogPost.find({ published: true }).sort({ createdAt: -1 })
  if (limit > 0) query = query.limit(limit)
  const items = await query.lean()
  return NextResponse.json({ items })
}

// Admin only: create a post
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const slug = slugify(body.titleEn || body.titleAr || "post")
  const post = await BlogPost.create({ ...body, slug })
  return NextResponse.json({ item: post }, { status: 201 })
}
