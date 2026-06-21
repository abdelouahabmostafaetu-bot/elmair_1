import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Message from "@/models/Message"
import { isAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

// Public: submit a contact message. Messages are stored permanently and are
// never deleted by the app (admins can only read them).
export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 })
  }
  const msg = await Message.create({
    name: body.name,
    email: body.email,
    phone: body.phone || "",
    profileType: body.profile || "",
    service: body.service || "",
    companySize: body.companySize || "",
    subject: body.subject || "",
    message: body.message,
  })
  return NextResponse.json({ ok: true, id: msg._id }, { status: 201 })
}

// Admin only: read all messages (newest first). No DELETE endpoint exists
// on purpose, so messages can never be removed.
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const items = await Message.find().sort({ createdAt: -1 }).lean()
  return NextResponse.json({ items })
}
