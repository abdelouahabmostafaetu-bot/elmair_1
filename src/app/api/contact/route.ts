import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Message from "@/models/Message"
import { isAdmin } from "@/lib/auth"
import { sendToAdmins } from "@/lib/mailer"

export const dynamic = "force-dynamic"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+213\d{9}$/
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]
const MAX_FILE_CHARS = Math.ceil((4 * 1024 * 1024 * 4) / 3) + 100 // ~base64 of 4MB

function escapeHtml(value: unknown) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function adminMessageEmailHtml(message: {
  name: string
  email: string
  phone: string
  profileType: string
  service: string
  subject: string
  message: string
  attachments: Array<unknown>
}) {
  const rows = [
    ["الاسم", message.name],
    ["البريد", message.email],
    ["الهاتف", message.phone],
    ["نوع الملف الشخصي", message.profileType],
    ["الخدمة", message.service],
    ["الموضوع", message.subject],
    ["الرسالة", message.message],
    ["عدد المرفقات", message.attachments.length],
  ]

  return `
    <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; background:#f7f3ea; padding:24px; color:#1A2230;">
      <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:18px; overflow:hidden; border:1px solid #eee1bf;">
        <div style="background:#0B192C; color:#fff; padding:22px 26px;">
          <h1 style="margin:0; font-size:22px;">طلب تواصل جديد من موقع مركز المعيار</h1>
          <p style="margin:8px 0 0; color:#d8c995;">يرجى مراجعة الرسالة من لوحة الإدارة.</p>
        </div>
        <table style="width:100%; border-collapse:collapse;">
          <tbody>
            ${rows
              .map(
                ([label, value]) => `
                  <tr>
                    <th style="width:190px; text-align:right; vertical-align:top; padding:14px 18px; background:#fbfaf6; border-bottom:1px solid #f0eadc; color:#0B192C;">${escapeHtml(label)}</th>
                    <td style="padding:14px 18px; border-bottom:1px solid #f0eadc; white-space:pre-wrap;">${escapeHtml(value)}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
        <div style="padding:22px 26px;">
          <a href="https://almeiyar.me/admin/messages" style="display:inline-block; background:#D4AF37; color:#0B192C; text-decoration:none; font-weight:700; padding:12px 18px; border-radius:999px;">فتح الرسائل في لوحة الإدارة</a>
        </div>
      </div>
    </div>
  `
}

// Public: submit a contact message. Admin email notifications are best-effort
// so SMTP outages never break the contact form.
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

  if (Array.from(name).length < 3) return NextResponse.json({ error: "invalid name" }, { status: 400 })
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

  try {
    await sendToAdmins(
      "طلب تواصل جديد من موقع مركز المعيار",
      adminMessageEmailHtml({
        name,
        email,
        phone,
        profileType: body.profile || "",
        service: body.service || "",
        subject: body.subject || "",
        message,
        attachments,
      })
    )
  } catch (error) {
    console.warn("Contact message was saved, but admin email failed.", error)
  }

  return NextResponse.json({ ok: true, id: msg._id }, { status: 201 })
}

// Admin only: read all messages (newest first).
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const items = await Message.find().sort({ createdAt: -1 }).lean()
  return NextResponse.json({ items })
}
