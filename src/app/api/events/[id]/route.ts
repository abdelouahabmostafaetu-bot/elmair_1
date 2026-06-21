import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import EventItem from "@/models/EventItem"
import { isAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

type Params = { params: { id: string } }

// Public: read one event
export async function GET(_req: Request, { params }: Params) {
  await connectDB()
  try {
    const item = await EventItem.findById(params.id).lean()
    if (!item) return NextResponse.json({ error: "not found" }, { status: 404 })
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }
}

// Admin only: update
export async function PUT(req: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const item = await EventItem.findByIdAndUpdate(params.id, body, { new: true }).lean()
  return NextResponse.json({ item })
}

// Admin only: delete
export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  await EventItem.findByIdAndDelete(params.id)
  return NextResponse.json({ ok: true })
}
