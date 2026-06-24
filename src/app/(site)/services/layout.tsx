import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "اكتشف خدمات مركز المعيار الأكاديمية والمؤسسية: نشر Scopus، براءات اختراع INAPI، شهادات ISO 9001، تدريب مهني وأكاديمي، واستشارات مؤسسية.",
  alternates: {
    canonical: "https://almeiyar.me/services",
  },
  openGraph: {
    title: "خدماتنا | مركز المعيار للبحوث والدراسات",
    description:
      "خدمات أكاديمية ومؤسسية: نشر Scopus، براءات اختراع INAPI، شهادات ISO 9001، تدريب مهني.",
    url: "https://almeiyar.me/services",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
