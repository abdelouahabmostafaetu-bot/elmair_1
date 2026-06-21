"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { GraduationCap, Building2, Award, ShieldCheck, Network, Rocket, ArrowLeft, ArrowRight } from "lucide-react"
import Hero from "@/components/Hero"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import BlogCard, { type BlogCardData } from "@/components/cards/BlogCard"
import EventCard, { type EventCardData } from "@/components/cards/EventCard"
import { useLang } from "@/i18n/LanguageContext"

export default function HomePage() {
  const { t, dir } = useLang()
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight
  const [posts, setPosts] = useState<BlogCardData[]>([])
  const [events, setEvents] = useState<EventCardData[]>([])

  useEffect(() => {
    fetch("/api/blog?limit=3").then((r) => r.json()).then((d) => setPosts(d.items || [])).catch(() => {})
    fetch("/api/events?limit=3&upcoming=true").then((r) => r.json()).then((d) => setEvents(d.items || [])).catch(() => {})
  }, [])

  const why = [
    { icon: Award, title: t("why.quality"), text: t("why.qualityText") },
    { icon: ShieldCheck, title: t("why.integrity"), text: t("why.integrityText") },
    { icon: Network, title: t("why.network"), text: t("why.networkText") },
    { icon: Rocket, title: t("why.speed"), text: t("why.speedText") },
  ]

  return (
    <>
      <Hero />

      {/* Intro: what the site is */}
      <section className="section">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="eyebrow">{t("home.introTitle")}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-navy leading-snug">
              {t("brand.full")}
            </h2>
            <p className="mt-5 text-lg text-ink/70">{t("home.introText")}</p>
            <Link href="/about" className="btn btn-dark mt-7">
              {t("nav.about")} <Arrow size={18} />
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="relative h-80 rounded-3xl overflow-hidden">
            <Image src="/images/about.png" alt="" fill className="object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Two sectors */}
      <section className="section bg-navy text-white">
        <div className="container">
          <SectionHeading eyebrow={t("home.sectorsSubtitle")} title={t("home.sectorsTitle")} light />
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <Link href="/services" className="group block relative overflow-hidden rounded-3xl h-72">
                <Image src="/images/academic.png" alt="" fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/40 to-transparent" />
                <div className="absolute bottom-0 p-7">
                  <GraduationCap className="text-gold mb-3" size={32} />
                  <h3 className="text-xl font-display font-bold">{t("home.academicTitle")}</h3>
                  <p className="mt-2 text-sm text-white/75 max-w-sm">{t("home.academicText")}</p>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.12}>
              <Link href="/services" className="group block relative overflow-hidden rounded-3xl h-72">
                <Image src="/images/corporate.png" alt="" fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal via-royal/40 to-transparent" />
                <div className="absolute bottom-0 p-7">
                  <Building2 className="text-brand-light mb-3" size={32} />
                  <h3 className="text-xl font-display font-bold">{t("home.corporateTitle")}</h3>
                  <p className="mt-2 text-sm text-white/75 max-w-sm">{t("home.corporateText")}</p>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t("home.whySubtitle")} title={t("home.whyTitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} className="text-center">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-accent/12 text-accent flex items-center justify-center">
                  <w.icon size={26} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-navy">{w.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog */}
      {posts.length > 0 ? (
        <section className="section bg-cream">
          <div className="container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow">{t("home.latestBlogSubtitle")}</span>
                <h2 className="mt-2 text-3xl font-bold text-navy">{t("home.latestBlogTitle")}</h2>
              </div>
              <Link href="/blog" className="text-accent font-semibold text-sm hidden sm:inline-flex items-center gap-1">
                {t("cta.viewAll")} <Arrow size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.08}><BlogCard post={p} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Upcoming events */}
      {events.length > 0 ? (
        <section className="section">
          <div className="container max-w-3xl">
            <SectionHeading eyebrow={t("home.eventsSubtitle")} title={t("home.eventsTitle")} />
            <div className="space-y-6">
              {events.map((ev, i) => (
                <Reveal key={ev._id} delay={i * 0.06}><EventCard ev={ev} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="relative section overflow-hidden">
        <Image src="/images/cta.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="container relative z-10 text-center max-w-2xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t("home.ctaTitle")}</h2>
            <p className="mt-4 text-white/75">{t("home.ctaText")}</p>
            <Link href="/contact" className="btn btn-primary mt-8">
              {t("cta.contact")} <Arrow size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
