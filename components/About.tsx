const values = [
  'Impressions of different fragrances',
  '100% non-alcoholic oil blends',
  'Current collection: Impression by Invictus',
]

export default function About() {
  return (
    <section id="about" className="section-padding border-t border-gold/10 px-4">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="section-kicker">About</p>
          <h2 className="section-title mt-3">Inspired scents in pure attar form.</h2>
        </div>

        <div className="space-y-6">
          <p className="section-copy max-w-2xl">
            Ruhsar is a non-alcoholic impression attar brand. We create oil-based
            impressions of different popular fragrance profiles, made for people who want a
            smooth, long-lasting scent without alcohol.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value} className="border border-gold/15 p-4 text-sm text-[#e8dcc3]">
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
