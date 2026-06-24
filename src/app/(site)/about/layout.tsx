import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على مركز المعيار للبحوث والدراسات — رسالتنا، رؤيتنا، وقيمنا في خدمة البحث العلمي والدراسات بالجزائر.",
  alternates: {
    canonical: "https://almeiyar.me/about",
  },
  openGraph: {
    title: "من نحن | مركز المعيار للبحوث والدراسات",
    description:
      "تعرف على مركز المعيار للبحوث والدراسات — رسالتنا، رؤيتنا، وقيمنا في خدمة البحث العلمي والدراسات بالجزائر.",
    url: "https://almeiyar.me/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
