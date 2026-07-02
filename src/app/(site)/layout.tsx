import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PublicActions from "@/components/PublicActions"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <PublicActions />
      <Footer />
    </>
  )
}
