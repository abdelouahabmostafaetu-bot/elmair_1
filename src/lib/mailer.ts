import nodemailer from "nodemailer"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"

function missingSmtpConfig() {
  return !(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.MAIL_FROM
  )
}

export async function sendToAdmins(subject: string, html: string) {
  try {
    if (missingSmtpConfig()) {
      console.warn("SMTP is not configured; skipping admin email notification.")
      return
    }

    await connectDB()
    const extraAdmins = await Admin.find().select("email").lean()
    const recipients = new Set<string>()
    const superAdmin = (process.env.SUPER_ADMIN_EMAIL || "").trim().toLowerCase()
    if (superAdmin) recipients.add(superAdmin)
    for (const admin of extraAdmins as Array<{ email?: string }>) {
      const email = (admin.email || "").trim().toLowerCase()
      if (email) recipients.add(email)
    }

    if (recipients.size === 0) {
      console.warn("No admin email recipients found; skipping notification.")
      return
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: Array.from(recipients),
      subject,
      html,
    })
  } catch (error) {
    console.warn("Failed to send admin email notification.", error)
  }
}
