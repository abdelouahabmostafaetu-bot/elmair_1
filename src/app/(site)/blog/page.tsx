"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import Reveal from "@/components/Reveal"
import BlogCard, { type BlogCardData } from "@/components/cards/BlogCard"
import { useLang } from "@/i18n/LanguageContext"

export default function BlogPage() {
  const { t } = useLang()
  const [posts, setPosts] = useState<BlogCardData[]>([])
  const [query, setQuery] = useState("")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts(d.items || []))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  const filtered = posts.filter((post) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return `${post.titleAr} ${post.titleEn}`.toLowerCase().includes(q)
  })

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
          <div className="mb-8 max-w-xl">
            <label className="relative block">
              <Search className="absolute top-1/2 -translate-y-1/2 text-ink/35 start-4" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث في عناوين المقالات / Search posts"
                className="w-full rounded-2xl border border-ink/10 bg-white py-3 ps-11 pe-4 text-sm outline-none transition focus:border-accent"
              />
            </label>
          </div>

          {posts.length === 0 && loaded ? (
            <p className="text-center text-ink/50 py-16">{t("blog.empty")}</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-ink/50 py-16">لا توجد مقالات مطابقة للبحث.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.05}><BlogCard post={p} /></Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
