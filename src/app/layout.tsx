import type { Metadata, Viewport } from "next";
import { El_Messiri, Tajawal } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/i18n/LanguageContext";
import "./globals.css";

// ─── Fonts ───────────────────────────────────────────────────────────────────

// Elegant display font for titles (Arabic + Latin)
const display = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Clean, readable font for body text (Arabic + Latin)
const body = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

// ─── Constants ───────────────────────────────────────────────────────────────

const BASE_URL = "https://almeiyar.me";

/**
 * All brand-name spellings users search for.
 * Covering Arabic, French, and the many Latin transliterations of "المعيار".
 */
const BRAND_KEYWORDS = [
  // Arabic core terms
  "مركز المعيار للبحوث والدراسات",
  "مركز المعيار",
  "المعيار",
  "المعيار الجزائر",
  "مركز بحث جزائري",
  "بحوث ودراسات",
  "النشر العلمي الجزائر",
  "براءات الاختراع الجزائر",
  "INAPI",
  "سكوبس Scopus",
  "ISO 9001 الجزائر",
  "استشارات مؤسسية الجزائر",
  // Latin / French brand spellings
  "almeiyar",
  "almeyar",
  "al meyar",
  "al-meyar",
  "almaiyar",
  "almayar",
  "elmeyar",
  "el meyar",
  "elmair",
  "meyar",
  "meiyar",
  "Al-Meiyar",
  "Al-Meiyar Center",
  "Al-Meiyar Centre",
  "Centre Al-Meiyar",
  "centre de recherche Algérie",
  "centre de recherche Algerie",
  "research center Algeria",
];

// ─── Viewport (Next.js 14 — separate from metadata) ──────────────────────────

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "مركز المعيار للبحوث والدراسات | Al-Meiyar Center",
    template: "%s | مركز المعيار",
  },

  description:
    "مركز المعيار للبحوث والدراسات — مركز جزائري متخصص في النشر العلمي الدولي (Scopus)، براءات الاختراع (INAPI)، الاستشارات المؤسسية، شهادات الجودة ISO 9001، والتدريب الأكاديمي والمهني.",

  keywords: BRAND_KEYWORDS,

  alternates: {
    canonical: `${BASE_URL}/`,
    languages: {
      "ar-DZ": BASE_URL,
      ar: BASE_URL,
      fr: BASE_URL,
      en: BASE_URL,
      "x-default": BASE_URL,
    },
  },

  openGraph: {
    type: "website",
    siteName: "مركز المعيار للبحوث والدراسات",
    title: "مركز المعيار للبحوث والدراسات | Al-Meiyar Center",
    description:
      "مركز جزائري متخصص في النشر العلمي الدولي (Scopus)، براءات الاختراع (INAPI)، الاستشارات المؤسسية، وشهادات الجودة ISO.",
    url: BASE_URL,
    locale: "ar_DZ",
    alternateLocale: ["fr_FR", "en_US"],
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "مركز المعيار للبحوث والدراسات",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "مركز المعيار للبحوث والدراسات | Al-Meiyar Center",
    description:
      "مركز جزائري متخصص في النشر العلمي الدولي (Scopus)، براءات الاختراع، والاستشارات المؤسسية.",
    images: [`${BASE_URL}/og-image.png`],
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─── JSON-LD: Organization structured data ────────────────────────────────────

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "مركز المعيار للبحوث والدراسات",
  alternateName: [
    "مركز المعيار",
    "المعيار",
    "Al-Meiyar Center",
    "Al-Meiyar Centre",
    "almeiyar",
    "almeyar",
    "al meyar",
    "al-meyar",
    "almaiyar",
    "almayar",
    "elmeyar",
    "el meyar",
    "elmair",
    "meyar",
    "meiyar",
    "Centre Al-Meiyar",
    "centre de recherche Algérie",
  ],
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.png`,
  description:
    "مركز جزائري متخصص في البحث العلمي، النشر الدولي في Scopus، براءات الاختراع (INAPI)، شهادات الجودة ISO، والاستشارات الأكاديمية والمؤسسية.",
  areaServed: {
    "@type": "Country",
    name: "Algeria",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "DZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+213-541-912-509",
    contactType: "customer service",
    email: "almeiyar.crs@gmail.com",
    availableLanguage: ["Arabic", "French", "English"],
  },
  sameAs: [
    "https://www.facebook.com/share/1DAMkLBfmX/",
    "https://www.instagram.com/almeiyar_center",
    "https://wa.me/213541912509",
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html
        lang="ar"
        dir="rtl"
        className={`${display.variable} ${body.variable}`}
      >
        <body>
          {/* Schema.org Organization — helps Google understand all brand name spellings */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd),
            }}
          />
          <LanguageProvider>{children}</LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
