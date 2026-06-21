import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B192C", deep: "#070F1C", soft: "#13243B" },
        gold: { DEFAULT: "#D4AF37", light: "#E6C75A", dark: "#B8962B" },
        brand: { DEFAULT: "#008080", light: "#0AA5A5", dark: "#006666" },
        royal: "#090F1F",
        cream: "#FAF8F3",
        ink: "#1A2230",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(11,25,44,0.18)",
        glow: "0 0 40px -8px rgba(var(--accent-rgb), 0.45)",
      },
      container: {
        center: true,
        padding: { DEFAULT: "1.25rem", lg: "2rem" },
        screens: { "2xl": "1200px" },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
