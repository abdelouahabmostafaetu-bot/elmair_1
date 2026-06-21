"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Reveal from "@/components/Reveal"
import { useLang } from "@/i18n/LanguageContext"

type Post = {
  _id: string
  slug: string
  titleAr: string
  titleEn: string
  contentAr: string
  contentEn: string
  coverImage: string
  author: string
  createdAt: string
}

export default function BlogDetailPage() {
  const { t, lang, dir } = useLang()
  const params = useParams()
  const slug = String(params?.slug || "")
  const Arrow = dir === "rtl" ? ArrowRight : ArrowLeft
  const [post, setPost] = useState<Post | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/blog/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setPost(d?.item || null))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [slug])

  if (loaded && !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-ink/60">{t("blog.notFound")}</p>
        <Link href="/blog" className="btn btn-dark"><Arrow size={18} /> {t("cta.back")}</Link>
      </div>
    )
  }

  if (!post) return <div className="min-h-[60vh]" />

  const title = lang === "ar" ? post.titleAr : post.titleEn || post.titleAr
  const body = lang === "ar" ? post.contentAr : post.contentEn || post.contentAr
  const date = new Date(post.createdAt).toLocaleDateString(lang === "ar" ? "ar" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  })

  return (
    <article className="pt-32 pb-20">
      <div className="container max-w-3xl">
        <Reveal>
          <Link href="/blog" className="inline-flex items-center gap-1 text-accent font-semibold text-sm">
            <Arrow size={16} /> {t("nav.blog")}
          </Link>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-navy leading-tight">{title}</h1>
          <p className="mt-3 text-sm text-ink/50">
            {date}{post.author ? ` · ${t("blog.by")} ${post.author}` : ""}
          </p>
        </Reveal>
        {post.coverImage ? (
          <Reveal delay={0.1} className="relative h-72 md:h-96 rounded-3xl overflow-hidden my-8">
            <Image src={post.coverImage} alt={title} fill className="object-cover" />
          </Reveal>
        ) : null}
        <Reveal delay={0.15} className="prose-rich text-ink/80 whitespace-pre-line mt-8">
          {body}
        </Reveal>
      </div>
    </article>
  )
}
