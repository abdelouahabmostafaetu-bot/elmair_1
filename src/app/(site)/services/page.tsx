"use client"

import { useState } from "react"
import Image from "next/image"
import { GraduationCap, Building2 } from "lucide-react"
import Reveal from "@/components/Reveal"
import ServiceAccordion from "@/components/ServiceAccordion"
import { academicServices, corporateServices } from "@/lib/services-data"
import { useLang } from "@/i18n/LanguageContext"

type Sector = "academic" | "corporate"

export default function ServicesPage() {
  const { t } = useLang()
  const [sector, setSector] = useState<Sector>("academic")
  const list = sector === "academic" ? academicServices : corporateServices
  const cover = sector === "academic" ? "/images/academic.png" : "/images/corporate.png"

  return (
    <div data-sector={sector === "corporate" ? "corporate" : undefined}>
      <section className="pt-36 pb-16 bg-navy text-white">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t("nav.services")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">{t("services.title")}</h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">{t("services.subtitle")}</p>
          </Reveal>

          <div className="mt-9 inline-flex rounded-full bg-white/10 p-1.5">
            <button
              onClick={() => setSector("academic")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                sector === "academic" ? "bg-accent text-navy" : "text-white/80"
              }`}
            >
              <GraduationCap size={18} /> {t("services.academicTab")}
            </button>
            <button
              onClick={() => setSector("corporate")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                sector === "corporate" ? "bg-accent text-navy" : "text-white/80"
              }`}
            >
              <Building2 size={18} /> {t("services.corporateTab")}
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            <p className="text-lg text-ink/70 mb-4">
              {sector === "academic" ? t("services.academicIntro") : t("services.corporateIntro")}
            </p>
            <div>
              {list.map((item, i) => (
                <ServiceAccordion key={item.id} item={item} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
          <Reveal delay={0.1} className="relative h-96 rounded-3xl overflow-hidden sticky top-28 hidden lg:block">
            <Image src={cover} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
