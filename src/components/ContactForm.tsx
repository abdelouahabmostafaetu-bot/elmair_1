"use client"

import { useState, useRef } from "react"
import { Send, CheckCircle2, Paperclip, X, ShieldCheck } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

type Profile = "researcher" | "university" | "company"
type Status = "idle" | "sending" | "done" | "error"
type Attachment = { name: string; type: string; size: number; data: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_RE = /^[\p{L}][\p{L}\s.'-]{2,}$/u
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]
const MAX_FILE = 4 * 1024 * 1024
const MAX_TOTAL = 4 * 1024 * 1024
const MAX_FILES = 4

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result))
    r.onerror = reject
    r.readAsDataURL(file)
  })
}

export default function ContactForm() {
  const { t } = useLang()
  const [profile, setProfile] = useState<Profile>("researcher")
  const [status, setStatus] = useState<Status>("idle")
  const [toast, setToast] = useState(false)
  const [consent, setConsent] = useState(false)
  const [files, setFiles] = useState<Attachment[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    name: "", email: "", phone: "", organization: "", service: "", companySize: "", subject: "", message: "",
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  function validate() {
    const e: Record<string, string> = {}
    if (!NAME_RE.test(form.name.trim())) e.name = t("contact.errName")
    if (!EMAIL_RE.test(form.email.trim())) e.email = t("contact.errEmail")
    if (!/^\d{9}$/.test(form.phone.trim())) e.phone = t("contact.errPhone")
    if (!form.message.trim()) e.message = t("contact.errMessage")
    if (!consent) e.consent = t("contact.errConsent")
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleFiles(list: FileList | null) {
    if (!list) return
    const next = [...files]
    let total = next.reduce((s, a) => s + a.size, 0)
    let fileError = ""
    for (const f of Array.from(list)) {
      if (next.length >= MAX_FILES) { fileError = t("contact.errFiles"); break }
      if (!ALLOWED.includes(f.type) || f.size > MAX_FILE || total + f.size > MAX_TOTAL) {
        fileError = t("contact.errFiles")
        continue
      }
      const data = await readAsDataURL(f)
      next.push({ name: f.name, type: f.type, size: f.size, data })
      total += f.size
    }
    setFiles(next)
    setErrors((prev) => ({ ...prev, files: fileError }))
    if (fileRef.current) fileRef.current.value = ""
  }

  function removeFile(i: number) {
    setFiles(files.filter((_, idx) => idx !== i))
  }

  function resetForm() {
    setForm({ name: "", email: "", phone: "", organization: "", service: "", companySize: "", subject: "", message: "" })
    setFiles([])
    setConsent(false)
    setErrors({})
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: "+213" + form.phone.trim(),
          profile,
          consent,
          attachments: files,
        }),
      })
      if (!res.ok) throw new Error("failed")
      resetForm()
      setStatus("done")
      setToast(true)
      setTimeout(() => setToast(false), 9000)
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition"
  const errClass = "mt-1 text-xs text-red-600"

  const profiles: { key: Profile; label: string }[] = [
    { key: "researcher", label: t("contact.researcher") },
    { key: "university", label: t("contact.university") },
    { key: "company", label: t("contact.company") },
  ]

  const serviceKeys = ["svcPublishing", "svcPatents", "svcIso", "svcTraining", "svcConsulting", "svcOther"]

  const Toast = toast ? (
    <div className="fixed top-5 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-start gap-3 bg-navy text-white rounded-2xl shadow-2xl px-5 py-4 max-w-md border border-accent/30">
        <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={22} />
        <p className="text-sm leading-relaxed">{t("contact.notify5h")}</p>
        <button onClick={() => setToast(false)} className="text-white/60 hover:text-white shrink-0" aria-label="close"><X size={16} /></button>
      </div>
    </div>
  ) : null

  if (status === "done") {
    return (
      <>
        {Toast}
        <div className="rounded-3xl bg-accent/10 p-10 text-center">
          <CheckCircle2 className="mx-auto text-accent" size={48} />
          <p className="mt-4 text-xl font-display font-bold text-navy">{t("contact.successTitle")}</p>
          <p className="mt-3 text-ink/70 max-w-md mx-auto leading-relaxed">{t("contact.success")}</p>
          <button onClick={() => setStatus("idle")} className="btn btn-dark mt-6">{t("contact.another")}</button>
        </div>
      </>
    )
  }

  return (
    <>
      {Toast}
      <form onSubmit={submit} className="space-y-5" noValidate>
        <div className="flex items-center gap-2 rounded-xl bg-navy/5 px-4 py-3 text-xs text-ink/70">
          <ShieldCheck size={16} className="text-accent shrink-0" />
          <span>{t("contact.formNote")}</span>
        </div>

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
          <div>
            <input className={inputClass} placeholder={t("contact.name")} value={form.name} onChange={(e) => set("name", e.target.value)} />
            {errors.name ? <p className={errClass}>{errors.name}</p> : null}
          </div>
          <div>
            <input type="email" className={inputClass} placeholder={t("contact.email")} value={form.email} onChange={(e) => set("email", e.target.value)} />
            {errors.email ? <p className={errClass}>{errors.email}</p> : null}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-stretch" dir="ltr">
              <span className="inline-flex items-center rounded-l-xl border border-ink/15 border-r-0 bg-navy/5 px-3 text-sm font-semibold text-navy">+213</span>
              <input
                className="w-full rounded-r-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition"
                placeholder="5xxxxxxxx"
                inputMode="numeric"
                maxLength={9}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 9))}
              />
            </div>
            {errors.phone ? <p className={errClass}>{errors.phone}</p> : <p className="mt-1 text-xs text-ink/50">{t("contact.phoneHint")}</p>}
          </div>
          <div>
            <input className={inputClass} placeholder={t("contact.organization")} value={form.organization} onChange={(e) => set("organization", e.target.value)} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <select className={inputClass} value={form.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">{t("contact.serviceSelect")}</option>
            {serviceKeys.map((k) => (
              <option key={k} value={t(`contact.${k}`)}>{t(`contact.${k}`)}</option>
            ))}
          </select>
          {profile === "company" ? (
            <input className={inputClass} placeholder={t("contact.companySize")} value={form.companySize} onChange={(e) => set("companySize", e.target.value)} />
          ) : (
            <input className={inputClass} placeholder={t("contact.subject")} value={form.subject} onChange={(e) => set("subject", e.target.value)} />
          )}
        </div>

        {profile === "company" ? (
          <input className={inputClass} placeholder={t("contact.subject")} value={form.subject} onChange={(e) => set("subject", e.target.value)} />
        ) : null}

        <div>
          <textarea className={inputClass} placeholder={t("contact.message")} rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} />
          {errors.message ? <p className={errClass}>{errors.message}</p> : null}
        </div>

        <div>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            multiple
            accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-ink/25 px-4 py-3 text-sm text-ink/70 hover:border-accent hover:text-accent transition w-full justify-center">
            <Paperclip size={16} /> {t("contact.attachments")}
          </button>
          <p className="mt-1 text-xs text-ink/50">{t("contact.attachmentsHint")}</p>
          {errors.files ? <p className={errClass}>{errors.files}</p> : null}
          {files.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {files.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1.5 text-xs text-ink/75">
                  <Paperclip size={12} className="text-accent" />
                  <span className="max-w-[160px] truncate">{f.name}</span>
                  <button type="button" onClick={() => removeFile(i)} className="text-ink/40 hover:text-red-600" aria-label="remove"><X size={13} /></button>
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm text-ink/75 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--accent)] shrink-0" />
            <span>{t("contact.consent")}</span>
          </label>
          {errors.consent ? <p className={errClass}>{errors.consent}</p> : null}
        </div>

        {status === "error" ? <p className="text-sm text-red-600">{t("contact.error")}</p> : null}

        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full justify-center disabled:opacity-60">
          {status === "sending" ? t("contact.sending") : t("cta.send")} <Send size={18} />
        </button>
      </form>
    </>
  )
}
