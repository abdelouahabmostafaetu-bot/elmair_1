import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Message from "@/models/Message"
import { isAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_RE = /^[\p{L}][\p{L}\s.'-]{2,}$/u
const PHONE_RE = /^\+213\d{9}$/
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]
const MAX_FILE_CHARS = Math.ceil((4 * 1024 * 1024 * 4) / 3) + 100 // ~base64 of 4MB

// Public: submit a contact message. Messages are stored permanently and are
// never deleted by the app (admins can only read them).
export async function POST(req: Request) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 })
  }

  const name = String(body.name || "").trim()
  const email = String(body.email || "").trim()
  const phone = String(body.phone || "").trim()
  const message = String(body.message || "").trim()

  if (!NAME_RE.test(name)) return NextResponse.json({ error: "invalid name" }, { status: 400 })
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "invalid email" }, { status: 400 })
  if (!PHONE_RE.test(phone)) return NextResponse.json({ error: "invalid phone" }, { status: 400 })
  if (!message) return NextResponse.json({ error: "missing message" }, { status: 400 })
  if (body.consent !== true) return NextResponse.json({ error: "consent required" }, { status: 400 })

  // Validate attachments (images & PDF only, stored as data URLs).
  const rawAtts = Array.isArray(body.attachments) ? body.attachments.slice(0, 4) : []
  const attachments = [] as Array<{ name: string; type: string; size: number; data: string }>
  for (const a of rawAtts) {
    if (!a || !ALLOWED.includes(a.type)) return NextResponse.json({ error: "invalid file type" }, { status: 400 })
    if (typeof a.data !== "string" || a.data.length > MAX_FILE_CHARS) return NextResponse.json({ error: "file too large" }, { status: 400 })
    attachments.push({
      name: String(a.name || "file").slice(0, 200),
      type: a.type,
      size: Number(a.size) || 0,
      data: a.data,
    })
  }

  await connectDB()
  const msg = await Message.create({
    name,
    email,
    phone,
    profileType: body.profile || "",
    service: body.service || "",
    companySize: body.companySize || "",
    organization: body.organization || "",
    subject: body.subject || "",
    message,
    consent: true,
    attachments,
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
