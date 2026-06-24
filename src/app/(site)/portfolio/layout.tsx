import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "معرض الأعمال",
  description:
    "استعرض إنجازات مركز المعيار للبحوث والدراسات: مشاريع النشر الدولي في Scopus، براءات الاختراع، المنح الدراسية، والتدريب المؤسسي بالجزائر.",
  alternates: {
    canonical: "https://almeiyar.me/portfolio",
  },
  openGraph: {
    title: "معرض الأعمال | مركز المعيار للبحوث والدراسات",
    description:
      "إنجازات مركز المعيار: نشر Scopus، براءات اختراع، منح دراسية، تدريب مؤسسي بالجزائر.",
    url: "https://almeiyar.me/portfolio",
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
