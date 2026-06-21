"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { ar } from "./ar"
import { en } from "./en"

export type Lang = "ar" | "en"
type Dict = typeof ar

const dictionaries: Record<Lang, Dict> = { ar, en }

type Ctx = {
  lang: Lang
  dir: "rtl" | "ltr"
  t: (path: string) => string
  setLang: (l: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<Ctx | null>(null)

function resolve(obj: unknown, path: string): string {
  const parts = path.split(".")
  let cur: unknown = obj
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p]
    } else {
      return path
    }
  }
  return typeof cur === "string" ? cur : path
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar")

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null
    if (saved === "ar" || saved === "en") setLangState(saved)
  }, [])

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    if (typeof window !== "undefined") localStorage.setItem("lang", lang)
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(() => setLangState((p) => (p === "ar" ? "en" : "ar")), [])
  const t = useCallback((path: string) => resolve(dictionaries[lang], path), [lang])
  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr"
  const value: Ctx = { lang, dir, t, setLang, toggle }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>")
  return ctx
}
