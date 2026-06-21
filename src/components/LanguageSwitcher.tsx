"use client"

import { Globe } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition hover:bg-accent/15 ${
        dark ? "text-navy" : "text-white"
      }`}
    >
      <Globe size={16} />
      <span>{lang === "ar" ? "EN" : "عربي"}</span>
    </button>
  )
}
