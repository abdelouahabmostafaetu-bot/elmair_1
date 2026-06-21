import type { CSSProperties } from "react"

// Crisp, always-visible brand mark (gold square + serif monogram).
// Replaces the old logo.png which was invisible on dark backgrounds.
export default function Logo({
  size = 44,
  className = "",
}: {
  size?: number
  className?: string
}) {
  const markStyle: CSSProperties = {
    width: size,
    height: size,
    background: "linear-gradient(135deg, #E8C75A 0%, #D4AF37 45%, #B8962B 100%)",
    color: "#0B192C",
    fontSize: size * 0.5,
    lineHeight: 1,
    boxShadow: "0 6px 16px -6px rgba(212,175,55,0.65)",
  }

  return (
    <span
      className={`grid place-items-center rounded-xl shrink-0 font-display font-bold select-none ${className}`}
      style={markStyle}
      aria-hidden="true"
    >
      M
    </span>
  )
}
