'use client'

import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const reviews = [
  {
    text: 'Smooth oil feel and a very elegant scent. It lasts well.',
    author: 'Muhammad Kashan',
  },
  {
    text: 'Perfect for daily use. Warm, clean, and not harsh.',
    author: 'Ebad Ullah',
  },
  {
    text: 'Beautiful scent and good presentation. Great for gifting.',
    author: 'Saud Alam',
  },
  {
    text: 'The attar feels premium and stays noticeable for hours.',
    author: 'Shaheer Ahmed',
  },
  {
    text: 'Soft, classy, and easy to wear every day.',
    author: 'Nisha Naz',
  },
  {
    text: 'I liked the warm notes and the non-alcoholic oil feel.',
    author: 'Itret Zehra',
  },
  {
    text: 'Very refined scent. It does not feel overpowering.',
    author: 'Simra Fayyaz',
  },
  {
    text: 'Good lasting and excellent value for the price.',
    author: 'Fayyaz Ahmed',
  },
  {
    text: 'The fragrance is smooth and feels expensive.',
    author: 'Huma Alauddin',
  },
  {
    text: 'Loved the bottle and the attar quality.',
    author: 'Yusra Ali',
  },
  {
    text: 'A small amount is enough. It settles beautifully.',
    author: 'Abdul Ahad',
  },
  {
    text: 'Nice warm scent for daily use and occasions.',
    author: 'Hina Yazdani',
  },
  {
    text: 'The oil texture feels clean and premium.',
    author: 'Syed Turab',
  },
  {
    text: 'Elegant aroma with good lasting. Highly recommended.',
    author: 'Tanzeel Abbas',
  },
  {
    text: 'A lovely attar for gifting. The scent feels rich.',
    author: 'Rimsha Gohar',
  },
  {
    text: 'It has a soft sweetness and a beautiful warm dry feel.',
    author: 'Sabeekah Nadeem',
  },
  {
    text: 'Very balanced fragrance. Not too strong, not too light.',
    author: 'Tooba Sajjid',
  },
  {
    text: 'The 6ml bottle is perfect for regular use.',
    author: 'Ilyas Muhammad',
  },
  {
    text: 'Premium feel and very good packaging.',
    author: 'Jaweria Kashif',
  },
  {
    text: 'Long lasting and smooth. Worth buying again.',
    author: 'Hamza Tirmizi',
  },
  {
    text: 'The oud and amber feel is really nice.',
    author: 'Haider Zaidi',
  },
  {
    text: 'Good quality attar with a mature scent profile.',
    author: 'Shafqat Ali',
  },
  {
    text: 'Clean, elegant, and perfect for daily wear.',
    author: 'Enayat Ullah',
  },
  {
    text: 'I liked that it is non-alcoholic and still lasts well.',
    author: 'Bilal Ahmed',
  },
  {
    text: 'Soft floral warmth, very pleasant experience.',
    author: 'Nimra Noor',
  },
  {
    text: 'The fragrance feels graceful and memorable.',
    author: 'Darakshan Saleem',
  },
]

const visibleCount = 3

export default function Reviews() {
  const [showAll, setShowAll] = useState(false)
  const visibleReviews = showAll ? reviews : reviews.slice(0, visibleCount)

  return (
    <section id="reviews" className="section-padding border-t border-gold/10 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="section-kicker">Reviews</p>
          <h2 className="section-title mt-3">What customers say</h2>
          <p className="section-copy mt-4">
            Real feedback from Ruhsar attar customers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {visibleReviews.map((review) => (
            <article key={review.author} className="border border-gold/15 p-4">
              <div className="mb-4 flex gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={12} />
                ))}
              </div>
              <p className="text-sm leading-6 text-[#e8dcc3]">{review.text}</p>
              <p className="mt-4 font-semibold text-[#f5f1e8]">{review.author}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="outline-button"
          >
            {showAll ? 'Show Less' : 'Read More Reviews'}
          </button>
        </div>
      </div>
    </section>
  )
}
