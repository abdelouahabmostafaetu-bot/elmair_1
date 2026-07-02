"use client"

import { useEffect, useState } from "react"
import { Pencil, Plus, ShieldCheck, Trash2, UserCog, X } from "lucide-react"

type Adm = { _id: string; email: string; name?: string; role: string; permanent: boolean }

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-accent"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AdminAdmins() {
  const [items, setItems] = useState<Adm[]>([])
  const [me, setMe] = useState<{ role: string; email: string } | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [editing, setEditing] = useState<string | null>(null)
  const [err, setErr] = useState("")
  const [notice, setNotice] = useState("")
  const [busy, setBusy] = useState(false)

  const load = () =>
    fetch("/api/admins").then((r) => r.json()).then((d) => { setItems(d.items || []); setMe(d.me || null) })
  useEffect(() => { load().catch(() => setNotice("تعذر تحميل المدراء.")) }, [])

  function reset() {
    setEmail("")
    setName("")
    setEditing(null)
    setErr("")
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setErr("")
    setNotice("")
    const normalizedEmail = email.toLowerCase().trim()
    if (!EMAIL_RE.test(normalizedEmail)) {
      setErr("أدخل بريداً إلكترونياً صحيحاً.")
      return
    }

    setBusy(true)
    const res = await fetch(editing ? `/api/admins/${editing}` : "/api/admins", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail, name }),
    })
    setBusy(false)
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setErr(d.error === "exists" ? "هذا البريد مُضاف مسبقاً" : "تعذّر الحفظ")
      return
    }
    reset()
    setNotice("تم الحفظ بنجاح ✅")
    load()
  }

  function startEdit(a: Adm) {
    setEditing(a._id)
    setEmail(a.email)
    setName(a.name || "")
    setErr("")
    setNotice("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function remove(id: string) {
    if (!confirm("هل تريد إزالة صلاحية هذا المدير؟ لا يمكن التراجع.")) return
    const res = await fetch(`/api/admins/${id}`, { method: "DELETE" })
    if (!res.ok) {
      setNotice("تعذر حذف المدير.")
      return
    }
    setNotice("تم الحذف بنجاح ✅")
    load()
  }

  const isSuper = me?.role === "super"

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">إدارة المدراء</h1>
      <p className="mt-2 text-ink/60">المدير العام يمكنه إضافة المدراء أو تعديل بياناتهم أو إزالة صلاحياتهم.</p>
      {notice ? <p className="mt-5 rounded-2xl bg-accent/10 px-4 py-3 text-sm text-navy">{notice}</p> : null}

      {isSuper ? (
        <form onSubmit={save} className="mt-6 space-y-4 rounded-3xl bg-white p-6 shadow-sm" noValidate>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display font-semibold text-navy">{editing ? "تعديل مدير" : "إضافة مدير جديد"}</h2>
            {editing ? (
              <button type="button" onClick={reset} className="flex items-center gap-1 text-sm text-ink/50">
                <X size={15} /> إلغاء
              </button>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={input} type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" />
            <input className={input} placeholder="الاسم (اختياري)" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {err ? <p className="text-sm text-red-600">{err}</p> : null}
          <button disabled={busy} className="btn btn-primary disabled:opacity-60">
            <Plus size={18} /> {busy ? "جاري الحفظ..." : editing ? "حفظ التعديلات" : "إضافة مدير"}
          </button>
          <p className="text-xs text-ink/50">سيتمكن المدير من الدخول بعد تسجيل الدخول بنفس البريد عبر نظام Clerk.</p>
        </form>
      ) : null}

      <div className="mt-8 space-y-3">
        {items.map((a) => (
          <div key={a._id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.permanent ? "bg-accent/15 text-accent" : "bg-navy/5 text-navy"}`}>
                {a.permanent ? <ShieldCheck size={18} /> : <UserCog size={18} />}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-navy" dir="ltr">{a.email}</p>
                <p className="text-xs text-ink/50">{a.permanent ? "مدير عام (دائم)" : a.name || "مدير"}</p>
              </div>
            </div>
            {isSuper && !a.permanent ? (
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => startEdit(a)} className="rounded-lg bg-navy/5 p-2 text-navy hover:bg-navy/10" aria-label="تعديل"><Pencil size={16} /></button>
                <button onClick={() => remove(a._id)} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100" aria-label="حذف"><Trash2 size={16} /></button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
