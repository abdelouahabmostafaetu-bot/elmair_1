"use client"

import Link from "next/link"
import Logo from "../Logo"
import { usePathname } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { LayoutDashboard, FileText, CalendarDays, MailOpen, Users, LogOut, Home, Briefcase } from "lucide-react"

const links = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/blog", label: "المقالات", icon: FileText },
  { href: "/admin/events", label: "الفعاليات", icon: CalendarDays },
  { href: "/admin/services", label: "الخدمات", icon: Briefcase },
  { href: "/admin/messages", label: "الرسائل", icon: MailOpen },
  { href: "/admin/admins", label: "المدراء", icon: Users },
]

export default function AdminSidebar({ role, email }: { role: string; email: string }) {
  const pathname = usePathname()
  return (
    <aside className="w-60 shrink-0 bg-navy text-white min-h-screen sticky top-0 hidden md:flex flex-col">
      <div className="p-5 flex items-center gap-3 border-b border-white/10">
        <Logo size={40} />
        <div className="leading-tight">
          <p className="font-display font-bold">مركز المعيار</p>
          <p className="text-[11px] text-white/50">لوحة الإدارة</p>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map((l) => {
          const active = pathname === l.href
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active ? "bg-accent text-navy font-semibold" : "text-white/75 hover:bg-white/10"
              }`}
            >
              <l.icon size={18} /> {l.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-1">
        <p className="px-3 pb-1 text-[11px] text-white/45 truncate">
          {email}{role === "super" ? " · مدير عام" : ""}
        </p>
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10">
          <Home size={18} /> العودة للموقع
        </Link>
        <SignOutButton>
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10">
            <LogOut size={18} /> تسجيل الخروج
          </button>
        </SignOutButton>
      </div>
    </aside>
  )
}
