"use client"

import Image from "next/image"
import { Target, Eye, Gem } from "lucide-react"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import { useLang } from "@/i18n/LanguageContext"

export default function AboutPage() {
  const { t } = useLang()

  const blocks = [
    { icon: Target, title: t("about.missionTitle"), text: t("about.missionText") },
    { icon: Eye, title: t("about.visionTitle"), text: t("about.visionText") },
    { icon: Gem, title: t("about.valuesTitle"), text: t("about.values") },
  ]

  return (
    <>
      <section className="pt-36 pb-16 bg-navy text-white">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t("nav.about")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">{t("about.title")}</h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">{t("about.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <Reveal className="relative h-96 rounded-3xl overflow-hidden">
            <Image src="/images/about.png" alt="" fill className="object-cover" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lg text-ink/75">{t("about.p1")}</p>
            <p className="mt-4 text-lg text-ink/75">{t("about.p2")}</p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container grid md:grid-cols-3 gap-8">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1} className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-accent/12 text-accent flex items-center justify-center">
                <b.icon size={26} />
              </div>
              <h3 className="mt-5 text-xl font-display font-bold text-navy">{b.title}</h3>
              <p className="mt-3 text-ink/65">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
