"use client"

import Link from "next/link"
import Logo from "../Logo"
import { usePathname } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { Briefcase, CalendarDays, FileText, Home, LayoutDashboard, LogOut, MailOpen, Menu, Users, X } from "lucide-react"
import { useState } from "react"

const links = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/blog", label: "المقالات", icon: FileText },
  { href: "/admin/events", label: "الفعاليات", icon: CalendarDays },
  { href: "/admin/services", label: "الخدمات", icon: Briefcase },
  { href: "/admin/messages", label: "الرسائل", icon: MailOpen },
  { href: "/admin/admins", label: "المدراء", icon: Users },
]

function SidebarContent({ role, email, onNavigate }: { role: string; email: string; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      <div className="flex items-center gap-3 border-b border-white/10 p-5">
        <Logo size={40} />
        <div className="leading-tight">
          <p className="font-display font-bold">مركز المعيار</p>
          <p className="text-[11px] text-white/50">لوحة الإدارة</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((l) => {
          const active = pathname === l.href
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active ? "bg-accent text-navy font-semibold" : "text-white/75 hover:bg-white/10"
              }`}
            >
              <l.icon size={18} /> {l.label}
            </Link>
          )
        })}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <p className="px-3 pb-1 text-[11px] text-white/45 truncate">
          <span dir="ltr">{email}</span>{role === "super" ? " · مدير عام" : ""}
        </p>
        <Link href="/" onClick={onNavigate} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10">
          <Home size={18} /> العودة للموقع
        </Link>
        <SignOutButton>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10">
            <LogOut size={18} /> تسجيل الخروج
          </button>
        </SignOutButton>
      </div>
    </>
  )
}

export default function AdminSidebar({ role, email }: { role: string; email: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-navy px-4 py-3 text-white shadow-lg md:hidden">
        <div className="flex items-center gap-3">
          <Logo size={34} />
          <span className="font-display font-bold">لوحة الإدارة</span>
        </div>
        <button onClick={() => setOpen((value) => !value)} className="rounded-xl bg-white/10 p-2" aria-label="فتح القائمة">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? <div className="fixed inset-0 z-30 bg-navy/50 md:hidden" onClick={() => setOpen(false)} /> : null}

      <aside className="sticky top-0 hidden min-h-screen w-60 shrink-0 flex-col bg-navy text-white md:flex">
        <SidebarContent role={role} email={email} />
      </aside>

      <aside className={`fixed bottom-0 top-0 z-40 flex w-72 max-w-[85vw] flex-col bg-navy text-white transition-transform duration-300 md:hidden ${open ? "start-0 translate-x-0" : "start-0 translate-x-full"}`}>
        <SidebarContent role={role} email={email} onNavigate={() => setOpen(false)} />
      </aside>
    </>
  )
}
