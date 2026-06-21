"use client"

import { useEffect, useState } from "react"
import Reveal from "@/components/Reveal"
import EventCard, { type EventCardData } from "@/components/cards/EventCard"
import { useLang } from "@/i18n/LanguageContext"

export default function EventsPage() {
  const { t } = useLang()
  const [events, setEvents] = useState<EventCardData[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((d) => setEvents(d.items || []))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  return (
    <>
      <section className="pt-36 pb-14 bg-navy text-white">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t("nav.events")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">{t("events.title")}</h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">{t("events.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          {events.length === 0 && loaded ? (
            <p className="text-center text-ink/50 py-16">{t("events.empty")}</p>
          ) : (
            <div className="space-y-7">
              {events.map((ev, i) => (
                <Reveal key={ev._id} delay={i * 0.05}><EventCard ev={ev} /></Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
