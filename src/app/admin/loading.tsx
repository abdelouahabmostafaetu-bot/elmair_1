export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-72 max-w-full rounded-2xl bg-navy/10" />
      <div className="mt-3 h-5 w-96 max-w-full rounded-xl bg-navy/10" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-40 rounded-3xl bg-white shadow-sm" />
        ))}
      </div>
      <div className="mt-8 space-y-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-20 rounded-2xl bg-white shadow-sm" />
        ))}
      </div>
    </div>
  )
}
