import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "الفعاليات",
  description:
    "تابع آخر فعاليات وأنشطة مركز المعيار للبحوث والدراسات: ملتقيات، ورشات عمل، ودورات تدريبية في الجزائر.",
  alternates: {
    canonical: "https://almeiyar.me/events",
  },
  openGraph: {
    title: "الفعاليات | مركز المعيار للبحوث والدراسات",
    description:
      "فعاليات وأنشطة مركز المعيار: ملتقيات، ورشات عمل، ودورات تدريبية في الجزائر.",
    url: "https://almeiyar.me/events",
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
