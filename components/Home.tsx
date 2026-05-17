'use client'

import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

const points = ['Impression by Invictus', 'Non-alcoholic', 'Pure oil attar']

export default function Home() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="px-4 pb-14 pt-12 md:pb-20 md:pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <p className="section-kicker">Ruhsar Attar</p>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-[#f5f1e8] sm:text-6xl">
              Premium impression attars for everyday elegance.
            </h1>
            <p className="max-w-xl text-lg text-[#e8dcc3]">
              Ruhsar creates non-alcoholic oil-based impressions of different fragrances.
              Our current attar is inspired by the fresh and bold character of Invictus.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[#e8dcc3]">
            {points.map((point) => (
              <span key={point} className="border border-gold/25 px-4 py-2 text-gold">
                {point}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollToSection('contact')} className="gold-button">
              Order Inquiry
              <FaArrowRight size={13} />
            </button>
            <button onClick={() => scrollToSection('about')} className="outline-button">
              Learn More
            </button>
          </div>
        </div>

        <div className="border border-gold/20 bg-[#2b1a10] p-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0b0b0b]">
            <Image
              src="/images/ruhsarmain.jpeg"
              alt="Ruhsar attar brand"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
