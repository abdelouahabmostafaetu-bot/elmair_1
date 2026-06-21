import { getCurrentAdmin } from "@/lib/auth"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { SignOutButton } from "@clerk/nextjs"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const me = await getCurrentAdmin()

  if (!me) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-navy text-white p-6 text-center" dir="rtl">
        <h1 className="text-2xl font-display font-bold">لا تملك صلاحية الدخول</h1>
        <p className="mt-3 text-white/70 max-w-sm">هذا الحساب غير مصرّح له بالدخول إلى لوحة الإدارة.</p>
        <SignOutButton>
          <button className="btn btn-primary mt-6">تسجيل الخروج بحساب آخر</button>
        </SignOutButton>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-cream" dir="rtl">
      <AdminSidebar role={me.role} email={me.email} />
      <main className="flex-1 p-5 md:p-10 overflow-x-hidden">{children}</main>
    </div>
  )
}
