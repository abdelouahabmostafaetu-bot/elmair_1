"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, User, Calendar, Paperclip } from "lucide-react"

type Msg = {
  _id: string
  name: string
  email: string
  phone: string
  profileType: string
  service: string
  companySize: string
  organization: string
  subject: string
  message: string
  attachments?: { name: string; type: string; size: number; data: string }[]
  createdAt: string
}

export default function AdminMessages() {
  const [items, setItems] = useState<Msg[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">الرسائل الواردة</h1>
      <p className="mt-2 text-ink/60">كل الرسائل محفوظة بشكل دائم في قاعدة البيانات (للقراءة فقط).</p>

      <div className="mt-8 space-y-4">
        {items.map((m) => (
          <div key={m._id} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink/60">
              <span className="flex items-center gap-1.5 font-semibold text-navy"><User size={15} /> {m.name}</span>
              <span className="flex items-center gap-1.5"><Mail size={15} className="text-accent" /> {m.email}</span>
              {m.phone ? <span className="flex items-center gap-1.5"><Phone size={15} className="text-accent" /> {m.phone}</span> : null}
              <span className="flex items-center gap-1.5"><Calendar size={15} /> {new Date(m.createdAt).toLocaleString("ar")}</span>
            </div>
            {(m.subject || m.service || m.profileType) ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {m.profileType ? <span className="text-xs rounded-full bg-navy/5 px-3 py-1 text-ink/70">{m.profileType}</span> : null}
                {m.service ? <span className="text-xs rounded-full bg-accent/12 px-3 py-1 text-accent">{m.service}</span> : null}
                {m.companySize ? <span className="text-xs rounded-full bg-navy/5 px-3 py-1 text-ink/70">{m.companySize}</span> : null}
                {m.organization ? <span className="text-xs rounded-full bg-navy/5 px-3 py-1 text-ink/70">{m.organization}</span> : null}
              </div>
            ) : null}
            {m.subject ? <p className="mt-3 font-semibold text-navy">{m.subject}</p> : null}
            <p className="mt-2 text-ink/75 whitespace-pre-line">{m.message}</p>
            {m.attachments && m.attachments.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {m.attachments.map((a, i) =>
                  a.type.startsWith("image/") ? (
                    <a key={i} href={a.data} target="_blank" rel="noreferrer">
                      <img src={a.data} alt={a.name} className="w-24 h-24 object-cover rounded-xl border border-ink/10" />
                    </a>
                  ) : (
                    <a key={i} href={a.data} download={a.name} className="text-xs rounded-full bg-accent/12 px-3 py-1.5 text-accent flex items-center gap-1.5">
                      <Paperclip size={13} /> {a.name}
                    </a>
                  )
                )}
              </div>
            ) : null}
          </div>
        ))}
        {loaded && items.length === 0 ? <p className="text-ink/50 text-sm">لا توجد رسائل بعد.</p> : null}
      </div>
    </div>
  )
}
