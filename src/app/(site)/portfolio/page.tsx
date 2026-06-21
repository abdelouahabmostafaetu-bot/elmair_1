"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Reveal from "@/components/Reveal"
import { projects, type Project } from "@/lib/portfolio-data"
import { useLang } from "@/i18n/LanguageContext"

type Filter = "all" | Project["category"]

export default function PortfolioPage() {
  const { t, lang } = useLang()
  const [filter, setFilter] = useState<Filter>("all")

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("portfolio.all") },
    { key: "patents", label: t("portfolio.patents") },
    { key: "scopus", label: t("portfolio.scopus") },
    { key: "training", label: t("portfolio.training") },
    { key: "scholarships", label: t("portfolio.scholarships") },
  ]

  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <section className="pt-36 pb-16 bg-navy text-white">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t("nav.portfolio")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">{t("portfolio.title")}</h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">{t("portfolio.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === f.key ? "bg-accent text-navy" : "bg-navy/5 text-ink/70 hover:bg-navy/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => {
                const title = lang === "ar" ? p.titleAr : p.titleEn
                const beneficiary = lang === "ar" ? p.beneficiaryAr : p.beneficiaryEn
                const fade = { opacity: 0, scale: 0.95 }
                const show = { opacity: 1, scale: 1 }
                const trans = { duration: 0.4 }
                return (
                  <motion.div
                    layout
                    key={p.id}
                    initial={fade}
                    animate={show}
                    exit={fade}
                    transition={trans}
                    className="group overflow-hidden rounded-3xl bg-white shadow-sm"
                  >
                    <div className="relative h-52">
                      <Image src={p.image} alt={title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-semibold text-navy leading-snug">{title}</h3>
                      <p className="mt-2 text-sm text-ink/55">
                        {t("portfolio.beneficiary")}: {beneficiary}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}
