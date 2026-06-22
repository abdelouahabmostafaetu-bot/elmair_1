"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2, Plus, X } from "lucide-react"

type Service = {
  _id: string
  sector: "academic" | "corporate"
  icon: string
  titleAr: string
  titleEn: string
  descAr: string
  descEn: string
  pointsAr: string[]
  pointsEn: string[]
  order: number
}

const empty = {
  sector: "academic",
  icon: "Sparkles",
  titleAr: "",
  titleEn: "",
  descAr: "",
  descEn: "",
  pointsAr: "",
  pointsEn: "",
  order: "0",
}

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent transition"

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([])
  const [form, setForm] = useState({ ...empty })
  const [editing, setEditing] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const load = () => fetch("/api/services").then((r) => r.json()).then((d) => setItems(d.items || []))
  useEffect(() => { load() }, [])

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const toLines = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean)

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    const payload = {
      sector: form.sector,
      icon: form.icon,
      titleAr: form.titleAr,
      titleEn: form.titleEn,
      descAr: form.descAr,
      descEn: form.descEn,
      pointsAr: toLines(form.pointsAr),
      pointsEn: toLines(form.pointsEn),
      order: Number(form.order) || 0,
    }
    const url = editing ? `/api/services/${editing}` : "/api/services"
    const method = editing ? "PUT" : "POST"
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    setForm({ ...empty })
    setEditing(null)
    setBusy(false)
    load()
  }

  function startEdit(s: Service) {
    setForm({
      sector: s.sector,
      icon: s.icon,
      titleAr: s.titleAr,
      titleEn: s.titleEn,
      descAr: s.descAr,
      descEn: s.descEn,
      pointsAr: (s.pointsAr || []).join("\n"),
      pointsEn: (s.pointsEn || []).join("\n"),
      order: String(s.order ?? 0),
    })
    setEditing(s._id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function remove(id: string) {
    if (!confirm("حذف هذه الخدمة نهائياً؟")) return
    await fetch(`/api/services/${id}`, { method: "DELETE" })
    load()
  }

  const groups = [
    { key: "academic", label: "القطاع الأكاديمي", list: items.filter((s) => s.sector === "academic") },
    { key: "corporate", label: "قطاع الشركات", list: items.filter((s) => s.sector === "corporate") },
  ]

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">إدارة الخدمات</h1>
      <p className="mt-2 text-ink/60">أضف الخدمات أو عدّلها أو احذفها. التغييرات تظهر مباشرة في صفحة الخدمات.</p>

      <form onSubmit={save} className="mt-6 rounded-3xl bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-navy">{editing ? "تعديل خدمة" : "خدمة جديدة"}</h2>
          {editing ? (
            <button type="button" onClick={() => { setForm({ ...empty }); setEditing(null) }} className="text-sm text-ink/50 flex items-center gap-1">
              <X size={15} /> إلغاء
            </button>
          ) : null}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <select className={input} value={form.sector} onChange={(e) => set("sector", e.target.value)}>
            <option value="academic">القطاع الأكاديمي</option>
            <option value="corporate">قطاع الشركات</option>
          </select>
          <input className={input} placeholder="اسم الأيقونة (مثال: BookOpen)" value={form.icon} onChange={(e) => set("icon", e.target.value)} />
          <input className={input} type="number" placeholder="الترتيب" value={form.order} onChange={(e) => set("order", e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input className={input} placeholder="العنوان بالعربية" required value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} />
          <input className={input} placeholder="Title (English)" value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <textarea className={input} placeholder="وصف قصير بالعربية" rows={2} value={form.descAr} onChange={(e) => set("descAr", e.target.value)} />
          <textarea className={input} placeholder="Short description (English)" rows={2} value={form.descEn} onChange={(e) => set("descEn", e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <textarea className={input} placeholder="النقاط بالعربية" rows={5} value={form.pointsAr} onChange={(e) => set("pointsAr", e.target.value)} />
            <p className="mt-1 text-xs text-ink/50">اكتب كل نقطة في سطر منفصل.</p>
          </div>
          <div>
            <textarea className={input} placeholder="Points (English)" rows={5} value={form.pointsEn} onChange={(e) => set("pointsEn", e.target.value)} />
            <p className="mt-1 text-xs text-ink/50">One point per line.</p>
          </div>
        </div>
        <button disabled={busy} className="btn btn-primary disabled:opacity-60">
          <Plus size={18} /> {editing ? "حفظ التعديلات" : "إضافة الخدمة"}
        </button>
      </form>

      {groups.map((group) => (
        <div key={group.key} className="mt-8">
          <h3 className="font-display font-semibold text-navy mb-3">{group.label}</h3>
          <div className="space-y-3">
            {group.list.map((s) => (
              <div key={s._id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <div className="min-w-0">
                  <p className="font-semibold text-navy truncate">{s.titleAr || s.titleEn}</p>
                  <p className="text-xs text-ink/50 truncate">{s.icon} · {(s.pointsAr || []).length} نقطة</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => startEdit(s)} className="p-2 rounded-lg bg-navy/5 text-navy hover:bg-navy/10"><Pencil size={16} /></button>
                  <button onClick={() => remove(s._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {group.list.length === 0 ? <p className="text-ink/50 text-sm">لا توجد خدمات في هذا القطاع.</p> : null}
          </div>
        </div>
      ))}
    </div>
  )
}
