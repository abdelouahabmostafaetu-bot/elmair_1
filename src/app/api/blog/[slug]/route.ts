import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"
import { isAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

type Params = { params: { slug: string } }

// Public: read one post
export async function GET(_req: Request, { params }: Params) {
  await connectDB()
  const item = await BlogPost.findOne({ slug: params.slug }).lean()
  if (!item) return NextResponse.json({ error: "not found" }, { status: 404 })
  return NextResponse.json({ item })
}

// Admin only: update
export async function PUT(req: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const item = await BlogPost.findOneAndUpdate({ slug: params.slug }, body, { new: true }).lean()
  return NextResponse.json({ item })
}

// Admin only: delete
export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  await BlogPost.findOneAndDelete({ slug: params.slug })
  return NextResponse.json({ ok: true })
}
