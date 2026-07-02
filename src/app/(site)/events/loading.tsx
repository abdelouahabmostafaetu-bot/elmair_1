export default function EventsLoading() {
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
        <div className="container max-w-3xl space-y-7">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex animate-pulse gap-4">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-accent/20" />
              <div className="flex-1 pt-1">
                <div className="h-5 rounded bg-navy/10" />
                <div className="mt-3 h-4 w-1/2 rounded bg-navy/10" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
