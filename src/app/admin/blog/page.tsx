"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2, Plus, X } from "lucide-react"

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
  titleAr: "", titleEn: "", excerptAr: "", excerptEn: "",
  contentAr: "", contentEn: "", coverImage: "", author: "",
}

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent transition"

export default function AdminBlog() {
  const [items, setItems] = useState<Post[]>([])
  const [form, setForm] = useState({ ...empty })
  const [editing, setEditing] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const load = () => fetch("/api/blog").then((r) => r.json()).then((d) => setItems(d.items || []))
  useEffect(() => { load() }, [])

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    const url = editing ? `/api/blog/${editing}` : "/api/blog"
    const method = editing ? "PUT" : "POST"
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setForm({ ...empty })
    setEditing(null)
    setBusy(false)
    load()
  }

  function startEdit(p: Post) {
    setForm({
      titleAr: p.titleAr, titleEn: p.titleEn, excerptAr: p.excerptAr, excerptEn: p.excerptEn,
      contentAr: p.contentAr, contentEn: p.contentEn, coverImage: p.coverImage, author: p.author,
    })
    setEditing(p.slug)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function remove(slug: string) {
    if (!confirm("حذف هذا المقال نهائياً؟")) return
    await fetch(`/api/blog/${slug}`, { method: "DELETE" })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">إدارة المقالات</h1>

      <form onSubmit={save} className="mt-6 rounded-3xl bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-navy">{editing ? "تعديل مقال" : "مقال جديد"}</h2>
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
          <textarea className={input} placeholder="مقتطف قصير بالعربية" rows={2} value={form.excerptAr} onChange={(e) => set("excerptAr", e.target.value)} />
          <textarea className={input} placeholder="Short excerpt (English)" rows={2} value={form.excerptEn} onChange={(e) => set("excerptEn", e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <textarea className={input} placeholder="المحتوى الكامل بالعربية" rows={6} value={form.contentAr} onChange={(e) => set("contentAr", e.target.value)} />
          <textarea className={input} placeholder="Full content (English)" rows={6} value={form.contentEn} onChange={(e) => set("contentEn", e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input className={input} placeholder="رابط صورة الغلاف (اختياري)" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} />
          <input className={input} placeholder="اسم الكاتب" value={form.author} onChange={(e) => set("author", e.target.value)} />
        </div>
        <button disabled={busy} className="btn btn-primary disabled:opacity-60">
          <Plus size={18} /> {editing ? "حفظ التعديلات" : "نشر المقال"}
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {items.map((p) => (
          <div key={p._id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="min-w-0">
              <p className="font-semibold text-navy truncate">{p.titleAr || p.titleEn}</p>
              <p className="text-xs text-ink/50 truncate">{p.slug}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(p)} className="p-2 rounded-lg bg-navy/5 text-navy hover:bg-navy/10"><Pencil size={16} /></button>
              <button onClick={() => remove(p.slug)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 ? <p className="text-ink/50 text-sm">لا توجد مقالات بعد.</p> : null}
      </div>
    </div>
  )
}
