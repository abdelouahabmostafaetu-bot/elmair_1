import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Message from "@/models/Message"
import { isAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

type Params = { params: { id: string } }

export async function PATCH(req: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    await connectDB()
    const item = await Message.findByIdAndUpdate(
      params.id,
      { handled: Boolean(body.handled) },
      { new: true }
    ).lean()
    if (!item) return NextResponse.json({ error: "not found" }, { status: 404 })
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  try {
    await connectDB()
    const item = await Message.findByIdAndDelete(params.id).lean()
    if (!item) return NextResponse.json({ error: "not found" }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 })
  }
}
