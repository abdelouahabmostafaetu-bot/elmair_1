"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Briefcase, CalendarDays, FileText, MailOpen, Plus, Users } from "lucide-react"

type Counts = {
  blog: number
  events: number
  services: number
  messages: number
  unhandled: number
  admins: number
}

export default function AdminHome() {
  const [c, setC] = useState<Counts>({ blog: 0, events: 0, services: 0, messages: 0, unhandled: 0, admins: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch("/api/blog?admin=true").then((r) => r.json()).catch(() => ({ items: [] })),
      fetch("/api/events?admin=true").then((r) => r.json()).catch(() => ({ items: [] })),
      fetch("/api/services").then((r) => r.json()).catch(() => ({ items: [] })),
      fetch("/api/contact").then((r) => r.json()).catch(() => ({ items: [] })),
      fetch("/api/admins").then((r) => r.json()).catch(() => ({ items: [] })),
    ])
      .then(([b, e, s, m, a]) =>
        setC({
          blog: (b.items || []).length,
          events: (e.items || []).length,
          services: (s.items || []).length,
          messages: (m.items || []).length,
          unhandled: (m.items || []).filter((item: { handled?: boolean }) => !item.handled).length,
          admins: (a.items || []).length,
        })
      )
      .finally(() => setLoaded(true))
  }, [])

  const cards = [
    { href: "/admin/blog", label: "المقالات", value: c.blog, icon: FileText },
    { href: "/admin/events", label: "الفعاليات", value: c.events, icon: CalendarDays },
    { href: "/admin/services", label: "الخدمات", value: c.services, icon: Briefcase },
    { href: "/admin/messages", label: "الرسائل", value: c.messages, extra: `${c.unhandled} غير معالجة`, icon: MailOpen },
    { href: "/admin/admins", label: "المدراء", value: c.admins, icon: Users },
  ]

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">مرحباً بك في لوحة الإدارة</h1>
      <p className="mt-2 text-ink/60">من هنا يمكن إدارة محتوى الموقع والرسائل بطريقة واضحة وسريعة.</p>

      <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="min-h-[160px] rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/12 text-accent">
              <card.icon size={22} />
            </div>
            <p className="mt-4 text-3xl font-bold text-navy">{loaded ? card.value : "..."}</p>
            <p className="text-sm text-ink/60">{card.label}</p>
            {card.extra ? <p className="mt-1 text-xs font-semibold text-accent">{card.extra}</p> : null}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/blog" className="btn btn-dark"><Plus size={18} /> مقال جديد</Link>
        <Link href="/admin/events" className="btn btn-dark"><Plus size={18} /> فعالية جديدة</Link>
        <Link href="/admin/services" className="btn btn-dark"><Plus size={18} /> خدمة جديدة</Link>
      </div>
    </div>
  )
}
