"use client"

import { useEffect, useState } from "react"
import { Pencil, Plus, Trash2, X } from "lucide-react"

type Post = {
  _id: string
  slug: string
  titleAr: string
  titleEn: string
  excerptAr: string
  excerptEn: string
  contentAr: string
  contentEn: string
  coverImage: string
  author: string
}

const empty = {
  titleAr: "",
  titleEn: "",
  excerptAr: "",
  excerptEn: "",
  contentAr: "",
  contentEn: "",
  coverImage: "",
  author: "",
}

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-accent"
const errClass = "mt-1 text-xs text-red-600"

export default function AdminBlog() {
  const [items, setItems] = useState<Post[]>([])
  const [form, setForm] = useState({ ...empty })
  const [editing, setEditing] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState("")

  const load = () => fetch("/api/blog?admin=true").then((r) => r.json()).then((d) => setItems(d.items || []))
  useEffect(() => { load().catch(() => setNotice("تعذر تحميل المقالات.")) }, [])

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  function validate() {
    const next: Record<string, string> = {}
    if (!form.titleAr.trim()) next.titleAr = "العنوان بالعربية مطلوب."
    if (!form.excerptAr.trim()) next.excerptAr = "المقتطف بالعربية مطلوب."
    if (!form.contentAr.trim()) next.contentAr = "المحتوى بالعربية مطلوب."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setNotice("")
    if (!validate()) return
    setBusy(true)
    const url = editing ? `/api/blog/${editing}` : "/api/blog"
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

  function startEdit(p: Post) {
    setForm({
      titleAr: p.titleAr || "",
      titleEn: p.titleEn || "",
      excerptAr: p.excerptAr || "",
      excerptEn: p.excerptEn || "",
      contentAr: p.contentAr || "",
      contentEn: p.contentEn || "",
      coverImage: p.coverImage || "",
      author: p.author || "",
    })
    setEditing(p.slug)
    setErrors({})
    setNotice("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function remove(slug: string) {
    if (!confirm("هل تريد حذف هذا المقال نهائياً؟ لا يمكن التراجع.")) return
    const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" })
    if (!res.ok) {
      setNotice("تعذر حذف المقال.")
      return
    }
    setNotice("تم الحذف بنجاح ✅")
    load()
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">إدارة المقالات</h1>
      {notice ? <p className="mt-5 rounded-2xl bg-accent/10 px-4 py-3 text-sm text-navy">{notice}</p> : null}

      <form onSubmit={save} className="mt-6 space-y-4 rounded-3xl bg-white p-6 shadow-sm" noValidate>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display font-semibold text-navy">{editing ? "تعديل مقال" : "مقال جديد"}</h2>
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
            <textarea className={input} placeholder="مقتطف قصير بالعربية" rows={2} value={form.excerptAr} onChange={(e) => set("excerptAr", e.target.value)} />
            {errors.excerptAr ? <p className={errClass}>{errors.excerptAr}</p> : null}
          </div>
          <textarea className={input} placeholder="Short excerpt (English)" rows={2} value={form.excerptEn} onChange={(e) => set("excerptEn", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <textarea className={input} placeholder="المحتوى الكامل بالعربية" rows={6} value={form.contentAr} onChange={(e) => set("contentAr", e.target.value)} />
            {errors.contentAr ? <p className={errClass}>{errors.contentAr}</p> : null}
          </div>
          <textarea className={input} placeholder="Full content (English)" rows={6} value={form.contentEn} onChange={(e) => set("contentEn", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input className={input} placeholder="رابط صورة الغلاف (اختياري)" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} />
          <input className={input} placeholder="اسم الكاتب" value={form.author} onChange={(e) => set("author", e.target.value)} />
        </div>
        <button disabled={busy} className="btn btn-primary disabled:opacity-60">
          <Plus size={18} /> {busy ? "جاري الحفظ..." : editing ? "حفظ التعديلات" : "نشر المقال"}
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {items.map((p) => (
          <div key={p._id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="min-w-0">
              <p className="truncate font-semibold text-navy">{p.titleAr || p.titleEn}</p>
              <p className="truncate text-xs text-ink/50">{p.slug}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button onClick={() => startEdit(p)} className="rounded-lg bg-navy/5 p-2 text-navy hover:bg-navy/10" aria-label="تعديل"><Pencil size={16} /></button>
              <button onClick={() => remove(p.slug)} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100" aria-label="حذف"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 ? <p className="text-sm text-ink/50">لا توجد مقالات بعد.</p> : null}
      </div>
    </div>
  )
}
