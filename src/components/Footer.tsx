"use client";

import Link from "next/link";
import Logo from "./Logo";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const nav = [
    { href: "/about", key: "about" },
    { href: "/services", key: "services" },
    { href: "/portfolio", key: "portfolio" },
    { href: "/blog", key: "blog" },
    { href: "/events", key: "events" },
    { href: "/contact", key: "contact" },
  ];

  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <Logo size={48} />
            <span className="font-display font-bold text-white text-lg">
              {t("brand.full")}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/65">
            {t("footer.about")}
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="https://www.facebook.com/share/1DAMkLBfmX/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://wa.me/213541912509"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://www.instagram.com/almeiyar_center?igsh=bHp0NzcyMGY0NG5x"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:almeiyar.crs@gmail.com"
              className="p-2 rounded-full bg-white/5 hover:bg-accent hover:text-navy transition"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">
            {t("footer.quickLinks")}
          </h4>
          <ul className="space-y-2 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent transition">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">
            {t("footer.contact")}
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:almeiyar.crs@gmail.com"
                className="flex items-center gap-2 hover:text-accent transition break-all"
              >
                <Mail size={16} className="text-accent shrink-0" />{" "}
                <span dir="ltr">almeiyar.crs@gmail.com</span>
              </a>
            </li>
            <li>
              <a
                href="tel:+213541912509"
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <Phone size={16} className="text-accent shrink-0" /> <span dir="ltr">0541 91 25 09</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/213541912509"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <MessageCircle size={16} className="text-accent shrink-0" />{" "}
                WhatsApp · <span dir="ltr">0541 91 25 09</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-accent shrink-0" /> الجزائر ·
              Algeria
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 text-center text-xs text-white/50">
          <p>
            © {year} {t("footer.madeWith")} — {t("footer.rights")}
          </p>
          {/* Alternate spellings — visible text helps Google connect all brand variations */}
          <p className="mt-2 text-white/30 leading-relaxed">
            مركز المعيار للبحوث والدراسات · Al-Meiyar / Almeyar / El Meyar /
            Centre Al-Meiyar / Elmair / Almeiyar
          </p>
        </div>
      </div>
    </footer>
  );
}
