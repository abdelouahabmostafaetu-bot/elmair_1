"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from "lucide-react"
import Reveal from "@/components/Reveal"
import { useLang } from "@/i18n/LanguageContext"

type EventDoc = {
  _id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  locationAr: string
  locationEn: string
  coverImage: string
  startDate: string
}

export default function EventDetailPage() {
  const { t, lang, dir } = useLang()
  const params = useParams()
  const id = String(params?.id || "")
  const Arrow = dir === "rtl" ? ArrowRight : ArrowLeft
  const [ev, setEv] = useState<EventDoc | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/events/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setEv(d?.item || null))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [id])

  if (loaded && !ev) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-ink/60">{t("events.notFound")}</p>
        <Link href="/events" className="btn btn-dark"><Arrow size={18} /> {t("cta.back")}</Link>
      </div>
    )
  }

  if (!ev) return <div className="min-h-[60vh]" />

  const title = lang === "ar" ? ev.titleAr : ev.titleEn || ev.titleAr
  const desc = lang === "ar" ? ev.descriptionAr : ev.descriptionEn || ev.descriptionAr
  const location = lang === "ar" ? ev.locationAr : ev.locationEn || ev.locationAr
  const date = new Date(ev.startDate).toLocaleDateString(lang === "ar" ? "ar" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  })

  return (
    <article className="pt-32 pb-20">
      <div className="container max-w-3xl">
        <Reveal>
          <Link href="/events" className="inline-flex items-center gap-1 text-accent font-semibold text-sm">
            <Arrow size={16} /> {t("nav.events")}
          </Link>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-navy leading-tight">{title}</h1>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-ink/60">
            <span className="flex items-center gap-1.5"><CalendarDays size={16} className="text-accent" /> {date}</span>
            {location ? <span className="flex items-center gap-1.5"><MapPin size={16} className="text-accent" /> {location}</span> : null}
          </div>
        </Reveal>
        {ev.coverImage ? (
          <Reveal delay={0.1} className="relative h-72 md:h-96 rounded-3xl overflow-hidden my-8">
            <Image src={ev.coverImage} alt={title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </Reveal>
        ) : null}
        <Reveal delay={0.15} className="prose-rich text-ink/80 whitespace-pre-line mt-8">
          {desc}
        </Reveal>
      </div>
    </article>
  )
}
