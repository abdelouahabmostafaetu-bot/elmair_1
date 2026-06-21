"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

type Profile = "researcher" | "university" | "company"
type Status = "idle" | "sending" | "done" | "error"

export default function ContactForm() {
  const { t } = useLang()
  const [profile, setProfile] = useState<Profile>("researcher")
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", companySize: "", subject: "", message: "",
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, profile }),
      })
      if (!res.ok) throw new Error("failed")
      setStatus("done")
      setForm({ name: "", email: "", phone: "", service: "", companySize: "", subject: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-accent/10 p-10 text-center">
        <CheckCircle2 className="mx-auto text-accent" size={48} />
        <p className="mt-4 text-lg font-display font-semibold text-navy">{t("contact.success")}</p>
        <button onClick={() => setStatus("idle")} className="btn btn-dark mt-6">{t("cta.back")}</button>
      </div>
    )
  }

  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition"

  const profiles: { key: Profile; label: string }[] = [
    { key: "researcher", label: t("contact.researcher") },
    { key: "university", label: t("contact.university") },
    { key: "company", label: t("contact.company") },
  ]

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">{t("contact.iam")}</label>
        <div className="flex flex-wrap gap-2">
          {profiles.map((p) => (
            <button
              type="button"
              key={p.key}
              onClick={() => setProfile(p.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                profile === p.key ? "bg-accent text-navy" : "bg-navy/5 text-ink/70"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input className={inputClass} placeholder={t("contact.name")} required value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input type="email" className={inputClass} placeholder={t("contact.email")} required value={form.email} onChange={(e) => set("email", e.target.value)} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input className={inputClass} placeholder={t("contact.phone")} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        <input className={inputClass} placeholder={t("contact.service")} value={form.service} onChange={(e) => set("service", e.target.value)} />
      </div>

      {profile === "company" ? (
        <input className={inputClass} placeholder={t("contact.companySize")} value={form.companySize} onChange={(e) => set("companySize", e.target.value)} />
      ) : null}

      <input className={inputClass} placeholder={t("contact.subject")} value={form.subject} onChange={(e) => set("subject", e.target.value)} />
      <textarea className={inputClass} placeholder={t("contact.message")} rows={5} required value={form.message} onChange={(e) => set("message", e.target.value)} />

      {status === "error" ? <p className="text-sm text-red-600">{t("contact.error")}</p> : null}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full justify-center disabled:opacity-60">
        {status === "sending" ? t("contact.sending") : t("cta.send")} <Send size={18} />
      </button>
    </form>
  )
}
