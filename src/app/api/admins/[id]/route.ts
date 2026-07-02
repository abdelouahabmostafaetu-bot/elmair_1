import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import { getCurrentAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

type Params = { params: { id: string } }

// Super admin only: update an admin's email/name.
export async function PUT(req: Request, { params }: Params) {
  const me = await getCurrentAdmin()
  if (!me || me.role !== "super") return NextResponse.json({ error: "forbidden" }, { status: 403 })
  if (params.id === "super") {
    return NextResponse.json({ error: "cannot edit super admin" }, { status: 400 })
  }

  await connectDB()
  const body = await req.json()
  const email = String(body.email || "").toLowerCase().trim()
  if (!email) return NextResponse.json({ error: "missing email" }, { status: 400 })
  const exists = await Admin.findOne({ email, _id: { $ne: params.id } })
  if (exists) return NextResponse.json({ error: "exists" }, { status: 409 })
  const item = await Admin.findByIdAndUpdate(
    params.id,
    { email, name: String(body.name || "").trim() },
    { new: true }
  ).lean()
  if (!item) return NextResponse.json({ error: "not found" }, { status: 404 })
  return NextResponse.json({ item })
}

// Super admin only: remove an admin. The permanent super admin cannot be deleted.
export async function DELETE(_req: Request, { params }: Params) {
  const me = await getCurrentAdmin()
  if (!me || me.role !== "super") return NextResponse.json({ error: "forbidden" }, { status: 403 })
  if (params.id === "super") {
    return NextResponse.json({ error: "cannot delete super admin" }, { status: 400 })
  }
  await connectDB()
  await Admin.findByIdAndDelete(params.id)
  return NextResponse.json({ ok: true })
}
