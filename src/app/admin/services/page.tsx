"use client"

import { useEffect, useState } from "react"
import { Pencil, Plus, Trash2, X } from "lucide-react"

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

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-accent"
const errClass = "mt-1 text-xs text-red-600"

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([])
  const [form, setForm] = useState({ ...empty })
  const [editing, setEditing] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState("")

  const load = () => fetch("/api/services").then((r) => r.json()).then((d) => setItems(d.items || []))
  useEffect(() => { load().catch(() => setNotice("تعذر تحميل الخدمات.")) }, [])

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const toLines = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean)

  function validate() {
    const next: Record<string, string> = {}
    if (!form.titleAr.trim()) next.titleAr = "العنوان بالعربية مطلوب."
    if (!form.descAr.trim()) next.descAr = "الوصف بالعربية مطلوب."
    if (toLines(form.pointsAr).length === 0) next.pointsAr = "أضف نقطة واحدة على الأقل بالعربية."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setNotice("")
    if (!validate()) return
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
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
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

  function startEdit(s: Service) {
    setForm({
      sector: s.sector,
      icon: s.icon || "Sparkles",
      titleAr: s.titleAr || "",
      titleEn: s.titleEn || "",
      descAr: s.descAr || "",
      descEn: s.descEn || "",
      pointsAr: (s.pointsAr || []).join("\n"),
      pointsEn: (s.pointsEn || []).join("\n"),
      order: String(s.order ?? 0),
    })
    setEditing(s._id)
    setErrors({})
    setNotice("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function remove(id: string) {
    if (!confirm("هل تريد حذف هذه الخدمة نهائياً؟ لا يمكن التراجع.")) return
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" })
    if (!res.ok) {
      setNotice("تعذر حذف الخدمة.")
      return
    }
    setNotice("تم الحذف بنجاح ✅")
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
      {notice ? <p className="mt-5 rounded-2xl bg-accent/10 px-4 py-3 text-sm text-navy">{notice}</p> : null}

      <form onSubmit={save} className="mt-6 space-y-4 rounded-3xl bg-white p-6 shadow-sm" noValidate>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display font-semibold text-navy">{editing ? "تعديل خدمة" : "خدمة جديدة"}</h2>
          {editing ? (
            <button type="button" onClick={() => { setForm({ ...empty }); setEditing(null); setErrors({}) }} className="flex items-center gap-1 text-sm text-ink/50">
              <X size={15} /> إلغاء
            </button>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <select className={input} value={form.sector} onChange={(e) => set("sector", e.target.value)}>
            <option value="academic">القطاع الأكاديمي</option>
            <option value="corporate">قطاع الشركات</option>
          </select>
          <input className={input} placeholder="اسم الأيقونة (مثال: BookOpen)" value={form.icon} onChange={(e) => set("icon", e.target.value)} />
          <input className={input} type="number" placeholder="الترتيب" value={form.order} onChange={(e) => set("order", e.target.value)} />
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
            <textarea className={input} placeholder="وصف قصير بالعربية" rows={2} value={form.descAr} onChange={(e) => set("descAr", e.target.value)} />
            {errors.descAr ? <p className={errClass}>{errors.descAr}</p> : null}
          </div>
          <textarea className={input} placeholder="Short description (English)" rows={2} value={form.descEn} onChange={(e) => set("descEn", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <textarea className={input} placeholder="النقاط بالعربية" rows={5} value={form.pointsAr} onChange={(e) => set("pointsAr", e.target.value)} />
            <p className="mt-1 text-xs text-ink/50">اكتب كل نقطة في سطر منفصل.</p>
            {errors.pointsAr ? <p className={errClass}>{errors.pointsAr}</p> : null}
          </div>
          <div>
            <textarea className={input} placeholder="Points (English)" rows={5} value={form.pointsEn} onChange={(e) => set("pointsEn", e.target.value)} />
            <p className="mt-1 text-xs text-ink/50">One point per line.</p>
          </div>
        </div>
        <button disabled={busy} className="btn btn-primary disabled:opacity-60">
          <Plus size={18} /> {busy ? "جاري الحفظ..." : editing ? "حفظ التعديلات" : "إضافة الخدمة"}
        </button>
      </form>

      {groups.map((group) => (
        <div key={group.key} className="mt-8">
          <h3 className="mb-3 font-display font-semibold text-navy">{group.label}</h3>
          <div className="space-y-3">
            {group.list.map((s) => (
              <div key={s._id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-navy">{s.titleAr || s.titleEn}</p>
                  <p className="truncate text-xs text-ink/50">{s.icon} · {(s.pointsAr || []).length} نقطة</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button onClick={() => startEdit(s)} className="rounded-lg bg-navy/5 p-2 text-navy hover:bg-navy/10" aria-label="تعديل"><Pencil size={16} /></button>
                  <button onClick={() => remove(s._id)} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100" aria-label="حذف"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {group.list.length === 0 ? <p className="text-sm text-ink/50">لا توجد خدمات في هذا القطاع.</p> : null}
          </div>
        </div>
      ))}
    </div>
  )
}
