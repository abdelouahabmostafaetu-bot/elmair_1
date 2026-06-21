import type { Metadata } from "next"
import { El_Messiri, Tajawal } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { LanguageProvider } from "@/i18n/LanguageContext"
import "./globals.css"

// Elegant display font for titles (Arabic + Latin)
const display = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

// Clean, readable font for body text (Arabic + Latin)
const body = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "مركز المعيار للبحوث والدراسات | Al-Meiyar Center",
    template: "%s | مركز المعيار",
  },
  description:
    "مركز متخصص في البحث العلمي والنشر الدولي (Scopus)، براءات الاختراع، والاستشارات المؤسسية. Academic research, publishing and corporate consulting.",
  keywords: [
    "Scopus", "براءات الاختراع", "INAPI", "النشر العلمي",
    "ISO 9001", "التدريب", "مركز المعيار", "Al-Meiyar",
  ],
  icons: { icon: "/favicon-64.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable}`}>
        <body>
          <LanguageProvider>{children}</LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
