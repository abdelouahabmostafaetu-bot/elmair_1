"use client"

import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import Reveal from "@/components/Reveal"
import ContactForm from "@/components/ContactForm"
import { useLang } from "@/i18n/LanguageContext"

export default function ContactPage() {
  const { t } = useLang()
  const info = [
    { icon: Mail, value: "almeiyar.crs@gmail.com", href: "mailto:almeiyar.crs@gmail.com" },
    { icon: Phone, value: "0541 91 25 09", href: "tel:+213541912509" },
    { icon: MessageCircle, value: "WhatsApp · 0541 91 25 09", href: "https://wa.me/213541912509" },
    { icon: Facebook, value: "Facebook", href: "https://www.facebook.com/share/1DAMkLBfmX/" },
    { icon: Instagram, value: "Instagram", href: "https://www.instagram.com/almeiyar_center?igsh=bHp0NzcyMGY0NG5x" },
    { icon: MapPin, value: "الجزائر · Algeria", href: "" },
  ]
  const isLtrContact = (value: string) => value.includes("@") || /\d/.test(value)

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
                  {it.href ? (
                    <a href={it.href} target="_blank" rel="noreferrer" className="text-sm hover:text-accent transition break-all">
                      <span dir={isLtrContact(it.value) ? "ltr" : undefined}>{it.value}</span>
                    </a>
                  ) : (
                    <span className="text-sm" dir={isLtrContact(it.value) ? "ltr" : undefined}>{it.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
