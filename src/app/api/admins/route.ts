import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import { getCurrentAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

// Admin only: list admins. The super admin (from .env) is always returned
// first as a permanent row that cannot be removed.
export async function GET() {
  const me = await getCurrentAdmin()
  if (!me) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const extra = await Admin.find().sort({ createdAt: -1 }).lean()
  const superEmail = (process.env.SUPER_ADMIN_EMAIL || "").toLowerCase()
  const superRow = { _id: "super", email: superEmail, role: "super", permanent: true }
  const items = [
    superRow,
    ...extra.map((a: any) => ({ _id: String(a._id), email: a.email, name: a.name || "", role: "admin", permanent: false })),
  ]
  return NextResponse.json({ items, me })
}

// Super admin only: add a new admin by email.
export async function POST(req: Request) {
  const me = await getCurrentAdmin()
  if (!me || me.role !== "super") return NextResponse.json({ error: "forbidden" }, { status: 403 })
  await connectDB()
  const body = await req.json()
  const email = (body.email || "").toLowerCase().trim()
  if (!email) return NextResponse.json({ error: "missing email" }, { status: 400 })
  const exists = await Admin.findOne({ email })
  if (exists) return NextResponse.json({ error: "exists" }, { status: 409 })
  const admin = await Admin.create({ email, name: body.name || "", addedBy: me.email })
  return NextResponse.json({ item: admin }, { status: 201 })
}
