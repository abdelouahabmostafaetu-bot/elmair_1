import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { getCurrentAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

// Lightweight endpoint for the navbar to know if the current user is an admin.
// Also returns diagnostic info to help debug admin recognition.
export async function GET() {
  const user = await currentUser()
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase() ?? null
  const superConfigured = (process.env.SUPER_ADMIN_EMAIL || "").toLowerCase()
  const me = await getCurrentAdmin()

  return NextResponse.json({
    isAdmin: !!me,
    role: me?.role ?? null,
    signedIn: !!user,
    yourEmail: email,
    superAdminConfigured: superConfigured ? true : false,
    superAdminMatchesYou: !!email && email === superConfigured,
  })
}
