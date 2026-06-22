import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Service from "@/models/Service"
import { isAdmin } from "@/lib/auth"
import { academicServices, corporateServices } from "@/lib/services-data"

export const dynamic = "force-dynamic"

// Public: list all services. On first run (empty collection) the current
// default services are seeded into the database so nothing disappears and the
// admin can edit them right away.
export async function GET() {
  await connectDB()
  const count = await Service.countDocuments()
  if (count === 0) {
    const seed = [
      ...academicServices.map((s, i) => ({ ...s, sector: "academic", order: i })),
      ...corporateServices.map((s, i) => ({ ...s, sector: "corporate", order: i })),
    ].map((s) => {
      const { id, ...rest } = s as Record<string, unknown>
      return rest
    })
    try {
      await Service.insertMany(seed)
    } catch {}
  }
  const items = await Service.find().sort({ sector: 1, order: 1, createdAt: 1 }).lean()
  return NextResponse.json({ items })
}

// Admin only: create a service.
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const item = await Service.create({
    sector: body.sector === "corporate" ? "corporate" : "academic",
    icon: body.icon || "Sparkles",
    titleAr: body.titleAr || "",
    titleEn: body.titleEn || "",
    descAr: body.descAr || "",
    descEn: body.descEn || "",
    pointsAr: Array.isArray(body.pointsAr) ? body.pointsAr : [],
    pointsEn: Array.isArray(body.pointsEn) ? body.pointsEn : [],
    order: Number(body.order) || 0,
  })
  return NextResponse.json({ item }, { status: 201 })
}
