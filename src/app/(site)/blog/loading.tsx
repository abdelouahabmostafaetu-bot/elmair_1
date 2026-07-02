export default function BlogLoading() {
  return (
    <>
      <section className="pt-36 pb-14 bg-navy text-white">
        <div className="container">
          <div className="h-4 w-24 rounded-full bg-white/20" />
          <div className="mt-5 h-12 w-full max-w-lg rounded-2xl bg-white/15" />
          <div className="mt-5 h-6 w-full max-w-2xl rounded-xl bg-white/10" />
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="h-52 rounded-2xl bg-navy/10" />
              <div className="mt-4 h-4 w-28 rounded bg-navy/10" />
              <div className="mt-3 h-6 rounded bg-navy/10" />
              <div className="mt-3 h-4 rounded bg-navy/10" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
