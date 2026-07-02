"use client"

import { useEffect, useState } from "react"
import { Pencil, Plus, Trash2, X } from "lucide-react"

type EventDoc = {
  _id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  locationAr: string
  locationEn: string
  coverImage: string
  startDate: string
}

const empty = {
  titleAr: "",
  titleEn: "",
  descriptionAr: "",
  descriptionEn: "",
  locationAr: "",
  locationEn: "",
  coverImage: "",
  startDate: "",
}

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-accent"
const errClass = "mt-1 text-xs text-red-600"

export default function AdminEvents() {
  const [items, setItems] = useState<EventDoc[]>([])
  const [form, setForm] = useState({ ...empty })
  const [editing, setEditing] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState("")

  const load = () => fetch("/api/events?admin=true").then((r) => r.json()).then((d) => setItems(d.items || []))
  useEffect(() => { load().catch(() => setNotice("تعذر تحميل الفعاليات.")) }, [])

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  function validate() {
    const next: Record<string, string> = {}
    if (!form.titleAr.trim()) next.titleAr = "العنوان بالعربية مطلوب."
    if (!form.descriptionAr.trim()) next.descriptionAr = "الوصف بالعربية مطلوب."
    if (!form.startDate.trim()) next.startDate = "تاريخ الفعالية مطلوب."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setNotice("")
    if (!validate()) return
    setBusy(true)
    const url = editing ? `/api/events/${editing}` : "/api/events"
    const method = editing ? "PUT" : "POST"
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setBusy(false)
    if (!res.ok) {
      setNotice("تعذر الحفظ. راجع الحقول وحاول مرة أخرى.")
      return
    }
    setForm({ ...empty })
    setEditing(null)
    setErrors({})
    setNotice("تم الحفظ بنجاح ✅")
    load()
  }

  function startEdit(ev: EventDoc) {
    setForm({
      titleAr: ev.titleAr || "",
      titleEn: ev.titleEn || "",
      descriptionAr: ev.descriptionAr || "",
      descriptionEn: ev.descriptionEn || "",
      locationAr: ev.locationAr || "",
      locationEn: ev.locationEn || "",
      coverImage: ev.coverImage || "",
      startDate: ev.startDate ? String(ev.startDate).slice(0, 10) : "",
    })
    setEditing(ev._id)
    setErrors({})
    setNotice("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function remove(id: string) {
    if (!confirm("هل تريد حذف هذه الفعالية؟ لا يمكن التراجع.")) return
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" })
    if (!res.ok) {
      setNotice("تعذر حذف الفعالية.")
      return
    }
    setNotice("تم الحذف بنجاح ✅")
    load()
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">إدارة الفعاليات</h1>
      {notice ? <p className="mt-5 rounded-2xl bg-accent/10 px-4 py-3 text-sm text-navy">{notice}</p> : null}

      <form onSubmit={save} className="mt-6 space-y-4 rounded-3xl bg-white p-6 shadow-sm" noValidate>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display font-semibold text-navy">{editing ? "تعديل فعالية" : "فعالية جديدة"}</h2>
          {editing ? (
            <button type="button" onClick={() => { setForm({ ...empty }); setEditing(null); setErrors({}) }} className="flex items-center gap-1 text-sm text-ink/50">
              <X size={15} /> إلغاء
            </button>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input className={input} placeholder="العنوان بالعربية" value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} />
            {errors.titleAr ? <p className={errClass}>{errors.titleAr}</p> : null}
          </div>
          <input className={input} placeholder="Title (English)" value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <textarea className={input} placeholder="الوصف بالعربية" rows={4} value={form.descriptionAr} onChange={(e) => set("descriptionAr", e.target.value)} />
            {errors.descriptionAr ? <p className={errClass}>{errors.descriptionAr}</p> : null}
          </div>
          <textarea className={input} placeholder="Description (English)" rows={4} value={form.descriptionEn} onChange={(e) => set("descriptionEn", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input className={input} placeholder="المكان بالعربية" value={form.locationAr} onChange={(e) => set("locationAr", e.target.value)} />
          <input className={input} placeholder="Location (English)" value={form.locationEn} onChange={(e) => set("locationEn", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-ink/55">تاريخ الفعالية</label>
            <input type="date" className={input} value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
            {errors.startDate ? <p className={errClass}>{errors.startDate}</p> : null}
          </div>
          <input className={input} placeholder="رابط صورة الغلاف (اختياري)" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} />
        </div>
        <button disabled={busy} className="btn btn-primary disabled:opacity-60">
          <Plus size={18} /> {busy ? "جاري الحفظ..." : editing ? "حفظ التعديلات" : "نشر الفعالية"}
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {items.map((ev) => (
          <div key={ev._id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="min-w-0">
              <p className="truncate font-semibold text-navy">{ev.titleAr || ev.titleEn}</p>
              <p className="text-xs text-ink/50">{ev.startDate ? String(ev.startDate).slice(0, 10) : ""}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button onClick={() => startEdit(ev)} className="rounded-lg bg-navy/5 p-2 text-navy hover:bg-navy/10" aria-label="تعديل"><Pencil size={16} /></button>
              <button onClick={() => remove(ev._id)} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100" aria-label="حذف"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 ? <p className="text-sm text-ink/50">لا توجد فعاليات بعد.</p> : null}
      </div>
    </div>
  )
}
