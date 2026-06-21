"use client"

import Reveal from "./Reveal"

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  center?: boolean
}

export default function SectionHeading({ eyebrow, title, subtitle, light, center = true }: Props) {
  return (
    <Reveal className={center ? "text-center mx-auto max-w-2xl mb-12" : "mb-12 max-w-2xl"}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className={`mt-3 text-3xl md:text-4xl font-bold ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base md:text-lg ${light ? "text-white/70" : "text-ink/70"}`}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}
