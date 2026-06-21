"use client"

import { useEffect, useState } from "react"
import { Trash2, Plus, ShieldCheck, UserCog } from "lucide-react"

type Adm = { _id: string; email: string; name?: string; role: string; permanent: boolean }

const input = "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent transition"

export default function AdminAdmins() {
  const [items, setItems] = useState<Adm[]>([])
  const [me, setMe] = useState<{ role: string; email: string } | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [err, setErr] = useState("")
  const [busy, setBusy] = useState(false)

  const load = () =>
    fetch("/api/admins").then((r) => r.json()).then((d) => { setItems(d.items || []); setMe(d.me || null) })
  useEffect(() => { load() }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()
    setErr("")
    setBusy(true)
    const res = await fetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    })
    setBusy(false)
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setErr(d.error === "exists" ? "هذا البريد مُضاف مسبقاً" : "تعذّرت الإضافة")
      return
    }
    setEmail("")
    setName("")
    load()
  }

  async function remove(id: string) {
    if (!confirm("إزالة صلاحية هذا المدير؟")) return
    await fetch(`/api/admins/${id}`, { method: "DELETE" })
    load()
  }

  const isSuper = me?.role === "super"

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">إدارة المدراء</h1>
      <p className="mt-2 text-ink/60">المدير العام يمكنه إضافة مدراء جدد أو إزالتهم عبر البريد الإلكتروني.</p>

      {isSuper ? (
        <form onSubmit={add} className="mt-6 rounded-3xl bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-display font-semibold text-navy">إضافة مدير جديد</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input className={input} type="email" placeholder="البريد الإلكتروني" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={input} placeholder="الاسم (اختياري)" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {err ? <p className="text-sm text-red-600">{err}</p> : null}
          <button disabled={busy} className="btn btn-primary disabled:opacity-60"><Plus size={18} /> إضافة مدير</button>
          <p className="text-xs text-ink/50">سيتمكن المدير من الدخول بعد تسجيل الدخول بنفس البريد عبر نظام Clerk.</p>
        </form>
      ) : null}

      <div className="mt-8 space-y-3">
        {items.map((a) => (
          <div key={a._id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.permanent ? "bg-accent/15 text-accent" : "bg-navy/5 text-navy"}`}>
                {a.permanent ? <ShieldCheck size={18} /> : <UserCog size={18} />}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-navy truncate">{a.email}</p>
                <p className="text-xs text-ink/50">{a.permanent ? "مدير عام (دائم)" : "مدير"}</p>
              </div>
            </div>
            {isSuper && !a.permanent ? (
              <button onClick={() => remove(a._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 shrink-0"><Trash2 size={16} /></button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
