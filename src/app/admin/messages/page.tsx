"use client"

import { useEffect, useMemo, useState } from "react"
import { Calendar, CheckCircle2, Download, Mail, MailOpen, Paperclip, Phone, Reply, Trash2, User } from "lucide-react"

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
  handled?: boolean
  attachments?: { name: string; type: string; size: number; data: string }[]
  createdAt: string
}

export default function AdminMessages() {
  const [items, setItems] = useState<Msg[]>([])
  const [loaded, setLoaded] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [notice, setNotice] = useState("")

  const unhandled = useMemo(() => items.filter((m) => !m.handled).length, [items])

  const load = () =>
    fetch("/api/contact")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => setNotice("تعذر تحميل الرسائل. حاول مرة أخرى."))
      .finally(() => setLoaded(true))

  useEffect(() => {
    load()
  }, [])

  async function toggleHandled(message: Msg) {
    setBusyId(message._id)
    setNotice("")
    const res = await fetch(`/api/contact/${message._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handled: !message.handled }),
    })
    setBusyId(null)
    if (!res.ok) {
      setNotice("تعذر تحديث حالة الرسالة.")
      return
    }
    setItems((current) =>
      current.map((item) => (item._id === message._id ? { ...item, handled: !message.handled } : item))
    )
    setNotice("تم الحفظ بنجاح ✅")
  }

  async function remove(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟ لا يمكن التراجع.")) return
    setBusyId(id)
    setNotice("")
    const res = await fetch(`/api/contact/${id}`, { method: "DELETE" })
    setBusyId(null)
    if (!res.ok) {
      setNotice("تعذر حذف الرسالة.")
      return
    }
    setItems((current) => current.filter((item) => item._id !== id))
    setNotice("تم الحذف بنجاح ✅")
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">الرسائل الواردة</h1>
          <p className="mt-2 text-ink/60">تابع طلبات التواصل، علّم الرسائل المعالجة، أو احذف الرسائل غير الضرورية.</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm text-sm text-ink/70">
          <span className="font-bold text-navy">{unhandled}</span> رسالة غير معالجة
        </div>
      </div>

      {notice ? <p className="mt-5 rounded-2xl bg-accent/10 px-4 py-3 text-sm text-navy">{notice}</p> : null}

      <div className="mt-8 space-y-4">
        {items.map((m) => (
          <div key={m._id} className={`rounded-3xl bg-white p-6 shadow-sm ${!m.handled ? "ring-2 ring-accent/40" : ""}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/60">
                <span className="flex items-center gap-1.5 font-semibold text-navy">
                  <User size={15} /> {m.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={15} className="text-accent" /> <span dir="ltr">{m.email}</span>
                </span>
                {m.phone ? (
                  <span className="flex items-center gap-1.5">
                    <Phone size={15} className="text-accent" /> <span dir="ltr">{m.phone}</span>
                  </span>
                ) : null}
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} /> {new Date(m.createdAt).toLocaleString("ar-DZ")}
                </span>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${m.handled ? "bg-emerald-50 text-emerald-700" : "bg-accent/15 text-navy"}`}>
                {m.handled ? <CheckCircle2 size={14} /> : <MailOpen size={14} />}
                {m.handled ? "تمت المعالجة" : "غير معالجة"}
              </span>
            </div>

            {m.subject ? <p className="mt-4 font-semibold text-navy">{m.subject}</p> : null}
            {(m.subject || m.service || m.profileType || m.companySize || m.organization) ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {m.profileType ? <span className="text-xs rounded-full bg-navy/5 px-3 py-1 text-ink/70">{m.profileType}</span> : null}
                {m.service ? <span className="text-xs rounded-full bg-accent/12 px-3 py-1 text-accent">{m.service}</span> : null}
                {m.companySize ? <span className="text-xs rounded-full bg-navy/5 px-3 py-1 text-ink/70">{m.companySize}</span> : null}
                {m.organization ? <span className="text-xs rounded-full bg-navy/5 px-3 py-1 text-ink/70">{m.organization}</span> : null}
              </div>
            ) : null}

            <p className="mt-3 text-ink/75 whitespace-pre-line">{m.message}</p>

            {m.attachments && m.attachments.length > 0 ? (
              <div className="mt-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
                  <Paperclip size={16} /> المرفقات ({m.attachments.length})
                </p>
                <div className="flex flex-wrap gap-3">
                  {m.attachments.map((a, i) =>
                    a.type.startsWith("image/") ? (
                      <a key={i} href={a.data} target="_blank" rel="noreferrer" className="block">
                        <img src={a.data} alt={a.name} className="h-24 w-24 rounded-xl border border-ink/10 object-cover" />
                        <span className="mt-1 block max-w-24 truncate text-xs text-ink/50">{a.name}</span>
                      </a>
                    ) : (
                      <a key={i} href={a.data} download={a.name} className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-3 py-1.5 text-xs text-accent">
                        <Download size={13} /> {a.name || "تحميل الملف"}
                      </a>
                    )
                  )}
                </div>
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`mailto:${m.email}?subject=${encodeURIComponent(m.subject || "رد من مركز المعيار")}`} className="btn btn-dark !px-4 !py-2 text-sm">
                <Reply size={16} /> الرد بالبريد
              </a>
              <button
                onClick={() => toggleHandled(m)}
                disabled={busyId === m._id}
                className="btn btn-primary !px-4 !py-2 text-sm disabled:opacity-60"
              >
                <CheckCircle2 size={16} /> {m.handled ? "إلغاء المعالجة" : "تعليم كمعالجة"}
              </button>
              <button
                onClick={() => remove(m._id)}
                disabled={busyId === m._id}
                className="btn !px-4 !py-2 text-sm bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-60"
              >
                <Trash2 size={16} /> حذف
              </button>
            </div>
          </div>
        ))}
        {loaded && items.length === 0 ? <p className="text-sm text-ink/50">لا توجد رسائل بعد.</p> : null}
        {!loaded ? <p className="text-sm text-ink/50">جاري تحميل الرسائل...</p> : null}
      </div>
    </div>
  )
}
