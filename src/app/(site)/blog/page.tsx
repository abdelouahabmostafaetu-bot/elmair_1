"use client"

import { useEffect, useState } from "react"
import Reveal from "@/components/Reveal"
import BlogCard, { type BlogCardData } from "@/components/cards/BlogCard"
import { useLang } from "@/i18n/LanguageContext"

export default function BlogPage() {
  const { t } = useLang()
  const [posts, setPosts] = useState<BlogCardData[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts(d.items || []))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  return (
    <>
      <section className="pt-36 pb-14 bg-navy text-white">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t("nav.blog")}</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">{t("blog.title")}</h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">{t("blog.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length === 0 && loaded ? (
            <p className="text-center text-ink/50 py-16">{t("blog.empty")}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.05}><BlogCard post={p} /></Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
