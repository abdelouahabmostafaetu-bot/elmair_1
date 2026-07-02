"use client"

import Link from "next/link"
import Image from "next/image"
import { CalendarDays } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

export type BlogCardData = {
  _id: string
  slug: string
  titleAr: string
  titleEn: string
  excerptAr: string
  excerptEn: string
  coverImage: string
  createdAt: string
}

export default function BlogCard({ post }: { post: BlogCardData }) {
  const { lang } = useLang()
  const title = lang === "ar" ? post.titleAr : post.titleEn || post.titleAr
  const excerpt = lang === "ar" ? post.excerptAr : post.excerptEn || post.excerptAr
  const date = new Date(post.createdAt).toLocaleDateString(lang === "ar" ? "ar" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  })

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-navy/5">
        <Image
          src={post.coverImage || "/images/about.png"}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs text-ink/50">
          <CalendarDays size={14} /> {date}
        </div>
        <h3 className="mt-2 text-lg font-display font-semibold text-navy group-hover:text-accent transition leading-snug">
          {title}
        </h3>
        <p className="mt-2 text-sm text-ink/65 line-clamp-2">{excerpt}</p>
      </div>
    </Link>
  )
}
