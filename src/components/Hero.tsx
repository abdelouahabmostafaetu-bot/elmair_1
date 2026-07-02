"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

export default function Hero() {
  const { t, dir } = useLang()
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight

  const fadeContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
  const fadeItem = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section className="relative min-h-[78vh] md:min-h-[92vh] flex items-center overflow-hidden bg-navy">
      <Image
        src="/images/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />

      <div className="container relative z-10">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          animate="show"
          className="max-w-2xl pt-20 md:pt-24"
        >
          <motion.span variants={fadeItem} className="eyebrow">
            {t("home.heroKicker")}
          </motion.span>
          <motion.h1
            variants={fadeItem}
            className="mt-3 md:mt-4 text-4xl md:text-6xl font-bold text-white leading-snug md:leading-[1.25]"
          >
            {t("home.heroTitle")}
          </motion.h1>
          <motion.p variants={fadeItem} className="mt-4 md:mt-6 text-lg text-white/75 max-w-xl">
            {t("home.heroSubtitle")}
          </motion.p>
          <motion.div variants={fadeItem} className="mt-9 flex flex-wrap gap-4">
            <Link href="/services" className="btn btn-primary">
              {t("cta.explore")} <Arrow size={18} />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              {t("cta.contact")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
