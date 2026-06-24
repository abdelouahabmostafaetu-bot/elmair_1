import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "المدونة",
  description:
    "مقالات وأبحاث من مركز المعيار للبحوث والدراسات في مجالات النشر العلمي، الابتكار، وتطوير المهارات الأكاديمية والمؤسسية.",
  alternates: {
    canonical: "https://almeiyar.me/blog",
  },
  openGraph: {
    title: "المدونة | مركز المعيار للبحوث والدراسات",
    description:
      "مقالات وأبحاث في مجالات النشر العلمي، الابتكار، وتطوير المهارات الأكاديمية والمؤسسية.",
    url: "https://almeiyar.me/blog",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
