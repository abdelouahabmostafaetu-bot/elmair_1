"use client"

import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

export type EventCardData = {
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

export default function EventCard({ ev }: { ev: EventCardData }) {
  const { lang } = useLang()
  const title = lang === "ar" ? ev.titleAr : ev.titleEn || ev.titleAr
  const location = lang === "ar" ? ev.locationAr : ev.locationEn || ev.locationAr
  const d = new Date(ev.startDate)
  const day = d.toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { day: "2-digit" })
  const month = d.toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { month: "short" })

  return (
    <Link href={`/events/${ev._id}`} className="group flex gap-4 items-start">
      <div className="shrink-0 w-16 h-16 rounded-2xl bg-accent/15 text-accent flex flex-col items-center justify-center font-display">
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="text-xs mt-1">{month}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-base font-display font-semibold text-navy group-hover:text-accent transition leading-snug">
          {title}
        </h3>
        {location ? (
          <p className="mt-1 flex items-center gap-1 text-sm text-ink/55">
            <MapPin size={14} /> {location}
          </p>
        ) : null}
      </div>
    </Link>
  )
}
