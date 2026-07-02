"use client"

import { useEffect, useState } from "react"
import { ArrowUp, MessageCircle } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

export default function PublicActions() {
  const { dir } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div dir={dir} style={{ insetInlineStart: "1.25rem" }} className="fixed bottom-5 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/213541912509"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-navy shadow-xl transition hover:-translate-y-1"
      >
        <MessageCircle size={22} />
      </a>
      {visible ? (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-xl transition hover:-translate-y-1"
        >
          <ArrowUp size={22} />
        </button>
      ) : null}
    </div>
  )
}
