import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6 text-center" dir="rtl">
      <div className="max-w-xl">
        <p className="text-sm font-bold text-accent">404</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-display font-bold text-navy">الصفحة غير موجودة</h1>
        <p className="mt-4 text-ink/65">
          عذراً، الرابط الذي تبحث عنه غير متاح حالياً.
          <br />
          Sorry, this page could not be found.
        </p>
        <Link href="/" className="btn btn-primary mt-8">العودة إلى الصفحة الرئيسية</Link>
      </div>
    </main>
  )
}
