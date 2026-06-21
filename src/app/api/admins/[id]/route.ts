import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import { getCurrentAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

type Params = { params: { id: string } }

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
