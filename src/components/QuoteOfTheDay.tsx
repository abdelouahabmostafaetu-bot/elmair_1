"use client"

import { Quote } from "lucide-react"
import Reveal from "@/components/Reveal"
import { quotes } from "@/lib/quotes-data"
import { useLang } from "@/i18n/LanguageContext"

function dayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}

export default function QuoteOfTheDay() {
  const { lang } = useLang()
  const quote = quotes[dayOfYear(new Date()) % quotes.length]
  const text = lang === "ar" ? quote.textAr : quote.textEn
  const author = lang === "ar" ? quote.authorAr : quote.authorEn

  return (
    <section className="section bg-navy text-white">
      <div className="container">
        <Reveal className="mx-auto max-w-4xl rounded-3xl border border-accent/30 bg-white/5 p-8 text-center shadow-2xl">
          <Quote className="mx-auto text-accent" size={34} />
          <p className="mt-5 text-2xl font-display font-semibold leading-relaxed text-white">{text}</p>
          <p className="mt-4 text-sm font-semibold text-accent">{author}</p>
        </Reveal>
      </div>
    </section>
  )
}
