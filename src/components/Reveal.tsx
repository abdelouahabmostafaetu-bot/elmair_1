"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

// Smooth scroll-reveal wrapper used across the site.
export default function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const initial = { opacity: 0, y }
  const inView = { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.2 }
  const transition = { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={inView}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
