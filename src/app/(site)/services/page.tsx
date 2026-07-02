"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { GraduationCap, Building2 } from "lucide-react"
import Reveal from "@/components/Reveal"
import ServiceAccordion from "@/components/ServiceAccordion"
import { academicServices, corporateServices, type ServiceItem } from "@/lib/services-data"
import { useLang } from "@/i18n/LanguageContext"

type Sector = "academic" | "corporate"

export default function ServicesPage() {
  const { t } = useLang()
  const [sector, setSector] = useState<Sector>("academic")
  // Start with the built-in defaults, then replace with admin-managed services from the DB.
  const [academic, setAcademic] = useState<ServiceItem[]>(academicServices)
  const [corporate, setCorporate] = useState<ServiceItem[]>(corporateServices)

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        const items: any[] = d.items || []
        if (!items.length) return
        const map = (s: any): ServiceItem => ({
          id: s._id,
          icon: s.icon,
          titleAr: s.titleAr,
          titleEn: s.titleEn,
          descAr: s.descAr,
          descEn: s.descEn,
          pointsAr: s.pointsAr || [],
          pointsEn: s.pointsEn || [],
        })
        setAcademic(items.filter((s) => s.sector === "academic").map(map))
        setCorporate(items.filter((s) => s.sector === "corporate").map(map))
      })
      .catch(() => {})
  }, [])

  const list = sector === "academic" ? academic : corporate
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
            <Image src={cover} alt="" fill sizes="360px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
