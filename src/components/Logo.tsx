import type { CSSProperties } from "react"

export default function Logo({ size = 44, className = "" }: { size?: number; className?: string }) {
  const boxStyle: CSSProperties = {
    width: size,
    height: size,
    padding: Math.round(size * 0.08),
  }
  const imgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  }
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-white overflow-hidden shrink-0 ${className}`}
      style={boxStyle}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Al-Meiyar" style={imgStyle} />
    </span>
  )
}
