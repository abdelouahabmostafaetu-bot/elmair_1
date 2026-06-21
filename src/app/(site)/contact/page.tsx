"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import Reveal from "@/components/Reveal"
import ContactForm from "@/components/ContactForm"
import { useLang } from "@/i18n/LanguageContext"

export default function ContactPage() {
  const { t } = useLang()
  const info = [
    { icon: Mail, value: "contact.almeiyar@gmail.com" },
    { icon: Phone, value: "+213 -- --- ---" },
    { icon: MapPin, value: "الجزائر · Algeria" },
  ]
  return (
    <>
      <section className="pt-36 pb-14 bg-navy text-white">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t("nav.contact")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">{t("contact.title")}</h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">{t("contact.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid lg:grid-cols-[1fr_340px] gap-12 items-start">
          <Reveal><ContactForm /></Reveal>
          <Reveal delay={0.12} className="space-y-6">
            <h2 className="font-display font-bold text-navy text-xl">{t("contact.infoTitle")}</h2>
            <ul className="space-y-4">
              {info.map((it) => (
                <li key={it.value} className="flex items-center gap-3 text-ink/75">
                  <span className="w-11 h-11 rounded-2xl bg-accent/12 text-accent flex items-center justify-center shrink-0"><it.icon size={20} /></span>
                  <span className="text-sm">{it.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
