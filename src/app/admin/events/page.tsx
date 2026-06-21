"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2, Plus, X } from "lucide-react"

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
  titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "",
  locationAr: "", locationEn: "", coverImage: "", startDate: "",
}

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent transition"

export default function AdminEvents() {
  const [items, setItems] = useState<EventDoc[]>([])
  const [form, setForm] = useState({ ...empty })
  const [editing, setEditing] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const load = () => fetch("/api/events").then((r) => r.json()).then((d) => setItems(d.items || []))
  useEffect(() => { load() }, [])

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    const url = editing ? `/api/events/${editing}` : "/api/events"
    const method = editing ? "PUT" : "POST"
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setForm({ ...empty })
    setEditing(null)
    setBusy(false)
    load()
  }

  function startEdit(ev: EventDoc) {
    setForm({
      titleAr: ev.titleAr, titleEn: ev.titleEn, descriptionAr: ev.descriptionAr, descriptionEn: ev.descriptionEn,
      locationAr: ev.locationAr, locationEn: ev.locationEn, coverImage: ev.coverImage,
      startDate: ev.startDate ? String(ev.startDate).slice(0, 10) : "",
    })
    setEditing(ev._id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function remove(id: string) {
    if (!confirm("حذف هذه الفعالية؟")) return
    await fetch(`/api/events/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">إدارة الفعاليات</h1>

      <form onSubmit={save} className="mt-6 rounded-3xl bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-navy">{editing ? "تعديل فعالية" : "فعالية جديدة"}</h2>
          {editing ? (
            <button type="button" onClick={() => { setForm({ ...empty }); setEditing(null) }} className="text-sm text-ink/50 flex items-center gap-1">
              <X size={15} /> إلغاء
            </button>
          ) : null}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input className={input} placeholder="العنوان بالعربية" required value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} />
          <input className={input} placeholder="Title (English)" value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <textarea className={input} placeholder="الوصف بالعربية" rows={4} value={form.descriptionAr} onChange={(e) => set("descriptionAr", e.target.value)} />
          <textarea className={input} placeholder="Description (English)" rows={4} value={form.descriptionEn} onChange={(e) => set("descriptionEn", e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input className={input} placeholder="المكان بالعربية" value={form.locationAr} onChange={(e) => set("locationAr", e.target.value)} />
          <input className={input} placeholder="Location (English)" value={form.locationEn} onChange={(e) => set("locationEn", e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-ink/55 mb-1">تاريخ الفعالية</label>
            <input type="date" className={input} required value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </div>
          <input className={input} placeholder="رابط صورة الغلاف (اختياري)" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} />
        </div>
        <button disabled={busy} className="btn btn-primary disabled:opacity-60">
          <Plus size={18} /> {editing ? "حفظ التعديلات" : "نشر الفعالية"}
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {items.map((ev) => (
          <div key={ev._id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="min-w-0">
              <p className="font-semibold text-navy truncate">{ev.titleAr || ev.titleEn}</p>
              <p className="text-xs text-ink/50">{ev.startDate ? String(ev.startDate).slice(0, 10) : ""}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(ev)} className="p-2 rounded-lg bg-navy/5 text-navy hover:bg-navy/10"><Pencil size={16} /></button>
              <button onClick={() => remove(ev._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 ? <p className="text-ink/50 text-sm">لا توجد فعاليات بعد.</p> : null}
      </div>
    </div>
  )
}
