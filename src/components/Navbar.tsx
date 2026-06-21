"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Logo from "./Logo"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"
import LanguageSwitcher from "./LanguageSwitcher"

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/blog", key: "blog" },
  { href: "/events", key: "events" },
  { href: "/contact", key: "contact" },
]

export default function Navbar() {
  const { t } = useLang()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-navy/95 backdrop-blur shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <nav className="container flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={44} />
          <span className="font-display font-bold text-white text-lg leading-tight hidden sm:block">
            {t("brand.name")}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link text-sm font-medium text-white/85 hover:text-white ${
                pathname === l.href ? "active text-white" : ""
              }`}
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/contact" className="btn btn-primary hidden md:inline-flex !py-2 !px-5 text-sm">
            {t("cta.contact")}
          </Link>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="lg:hidden bg-navy/98 backdrop-blur border-t border-white/10">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2.5 text-white/90 border-b border-white/5 text-sm"
              >
                {t(`nav.${l.key}`)}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary mt-3 justify-center">
              {t("cta.contact")}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
