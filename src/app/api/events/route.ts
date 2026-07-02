import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import EventItem from "@/models/EventItem"
import { isAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

// Public: list events (optional ?limit=N and ?upcoming=true)
export async function GET(req: Request) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get("limit")) || 0
  const upcoming = searchParams.get("upcoming") === "true"
  const adminList = searchParams.get("admin") === "true" && (await isAdmin())
  const filter: Record<string, unknown> = adminList ? {} : { published: true }
  if (upcoming) filter.startDate = { $gte: new Date() }
  let query = EventItem.find(filter).sort({ startDate: upcoming ? 1 : -1 })
  if (limit > 0) query = query.limit(limit)
  const items = await query.lean()
  return NextResponse.json({ items })
}

// Admin only: create an event
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const item = await EventItem.create(body)
  return NextResponse.json({ item }, { status: 201 })
}
