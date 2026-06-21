"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import * as Icons from "lucide-react"
import { Plus, Minus, Check } from "lucide-react"
import type { ServiceItem } from "@/lib/services-data"
import { useLang } from "@/i18n/LanguageContext"

function DynIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Cmp = (Icons as Record<string, React.ComponentType<{ size?: number }>>)[name] || Icons.Sparkles
  return <Cmp size={size} />
}

export default function ServiceAccordion({ item, defaultOpen = false }: { item: ServiceItem; defaultOpen?: boolean }) {
  const { lang, t } = useLang()
  const [open, setOpen] = useState(defaultOpen)
  const title = lang === "ar" ? item.titleAr : item.titleEn
  const desc = lang === "ar" ? item.descAr : item.descEn
  const points = lang === "ar" ? item.pointsAr : item.pointsEn
  const panel = { collapsed: { height: 0, opacity: 0 }, open: { height: "auto", opacity: 1 } }
  const panelTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="border-b border-ink/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 py-6 text-start"
      >
        <span className="shrink-0 w-12 h-12 rounded-2xl bg-accent/12 text-accent flex items-center justify-center">
          <DynIcon name={item.icon} />
        </span>
        <span className="flex-1">
          <span className="block font-display font-semibold text-navy text-lg">{title}</span>
          <span className="block text-sm text-ink/55 mt-0.5">{desc}</span>
        </span>
        <span className="shrink-0 text-accent">{open ? <Minus /> : <Plus />}</span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={panel}
            transition={panelTransition}
            className="overflow-hidden"
          >
            <div className="pb-7 ps-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">{t("services.included")}</p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-ink/75 text-sm">
                    <Check size={16} className="text-accent mt-1 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
