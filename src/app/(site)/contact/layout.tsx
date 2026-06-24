import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع مركز المعيار للبحوث والدراسات عبر البريد الإلكتروني، الهاتف أو واتساب. نحن في خدمتكم في الجزائر.",
  alternates: {
    canonical: "https://almeiyar.me/contact",
  },
  openGraph: {
    title: "اتصل بنا | مركز المعيار للبحوث والدراسات",
    description:
      "تواصل معنا عبر البريد الإلكتروني، الهاتف أو واتساب. نحن في خدمتكم في الجزائر.",
    url: "https://almeiyar.me/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
