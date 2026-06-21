"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, CalendarDays, MailOpen, Users, Plus } from "lucide-react"

export default function AdminHome() {
  const [c, setC] = useState({ blog: 0, events: 0, messages: 0, admins: 0 })

  useEffect(() => {
    Promise.all([
      fetch("/api/blog").then((r) => r.json()).catch(() => ({ items: [] })),
      fetch("/api/events").then((r) => r.json()).catch(() => ({ items: [] })),
      fetch("/api/contact").then((r) => r.json()).catch(() => ({ items: [] })),
      fetch("/api/admins").then((r) => r.json()).catch(() => ({ items: [] })),
    ]).then(([b, e, m, a]) =>
      setC({
        blog: (b.items || []).length,
        events: (e.items || []).length,
        messages: (m.items || []).length,
        admins: (a.items || []).length,
      })
    )
  }, [])

  const cards = [
    { href: "/admin/blog", label: "المقالات", value: c.blog, icon: FileText },
    { href: "/admin/events", label: "الفعاليات", value: c.events, icon: CalendarDays },
    { href: "/admin/messages", label: "الرسائل", value: c.messages, icon: MailOpen },
    { href: "/admin/admins", label: "المدراء", value: c.admins, icon: Users },
  ]

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">مرحباً بك في لوحة الإدارة</h1>
      <p className="mt-2 text-ink/60">من هنا يمكنك إدارة المقالات والفعاليات والرسائل والمدراء.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-accent/12 text-accent flex items-center justify-center">
              <card.icon size={22} />
            </div>
            <p className="mt-4 text-3xl font-bold text-navy">{card.value}</p>
            <p className="text-sm text-ink/60">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/blog" className="btn btn-dark"><Plus size={18} /> مقال جديد</Link>
        <Link href="/admin/events" className="btn btn-dark"><Plus size={18} /> فعالية جديدة</Link>
      </div>
    </div>
  )
}
