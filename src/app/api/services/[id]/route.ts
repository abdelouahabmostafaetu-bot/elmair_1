import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Service from "@/models/Service"
import { isAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

type Params = { params: { id: string } }

// Admin only: update a service.
export async function PUT(req: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  const body = await req.json()
  const item = await Service.findByIdAndUpdate(
    params.id,
    {
      sector: body.sector === "corporate" ? "corporate" : "academic",
      icon: body.icon || "Sparkles",
      titleAr: body.titleAr || "",
      titleEn: body.titleEn || "",
      descAr: body.descAr || "",
      descEn: body.descEn || "",
      pointsAr: Array.isArray(body.pointsAr) ? body.pointsAr : [],
      pointsEn: Array.isArray(body.pointsEn) ? body.pointsEn : [],
      order: Number(body.order) || 0,
    },
    { new: true }
  ).lean()
  return NextResponse.json({ item })
}

// Admin only: delete a service.
export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  await connectDB()
  await Service.findByIdAndDelete(params.id)
  return NextResponse.json({ ok: true })
}
