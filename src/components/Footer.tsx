"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Linkedin, Facebook, Send } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const nav = [
    { href: "/about", key: "about" },
    { href: "/services", key: "services" },
    { href: "/portfolio", key: "portfolio" },
    { href: "/blog", key: "blog" },
    { href: "/events", key: "events" },
    { href: "/contact", key: "contact" },
  ]

  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="Al-Meiyar" width={48} height={48} className="rounded-lg" />
            <span className="font-display font-bold text-white text-lg">{t("brand.full")}</span>
          </div>
          <p className="text-sm leading-relaxed text-white/65">{t("footer.about")}</p>
          <div className="flex items-center gap-3 mt-5">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition" aria-label="Telegram"><Send size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">{t("footer.quickLinks")}</h4>
          <ul className="space-y-2 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent transition">{t(`nav.${l.key}`)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} className="text-accent" /> contact.almeiyar@gmail.com</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-accent" /> +213 -- --- ---</li>
            <li className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> الجزائر · Algeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 text-center text-xs text-white/50">
          © {year} {t("footer.madeWith")} — {t("footer.rights")}
        </div>
      </div>
    </footer>
  )
}
