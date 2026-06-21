import { currentUser } from "@clerk/nextjs/server"
import connectDB from "./mongodb"
import Admin from "@/models/Admin"

export type AdminInfo = { email: string; role: "super" | "admin" }

// Returns the current signed-in admin, or null if the user is not an admin.
export async function getCurrentAdmin(): Promise<AdminInfo | null> {
  const user = await currentUser()
  if (!user) return null

  const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase()
  if (!email) return null

  const superAdmin = (process.env.SUPER_ADMIN_EMAIL || "").toLowerCase()
  if (email === superAdmin) return { email, role: "super" }

  try {
    await connectDB()
    const found = await Admin.findOne({ email })
    if (found) return { email, role: "admin" }
  } catch {
    return null
  }
  return null
}

export async function isAdmin(): Promise<boolean> {
  return (await getCurrentAdmin()) !== null
}
