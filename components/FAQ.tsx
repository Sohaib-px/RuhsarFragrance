'use client'

import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const faqs = [
  {
    question: 'Is Ruhsar non-alcoholic?',
    answer: 'Yes. Ruhsar is an oil-based attar with no alcohol.',
  },
  {
    question: 'What does impression attar mean?',
    answer:
      'It means Ruhsar creates oil-based attars inspired by different fragrance profiles. The current collection is Impression by Invictus.',
  },
  {
    question: 'How do I apply it?',
    answer: 'Apply a small amount on wrists, neck, or behind the ears.',
  },
  {
    question: 'How long does it last?',
    answer: 'Usually around 8-12 hours, depending on skin and weather.',
  },
]

export default function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding border-t border-gold/10 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="section-kicker">FAQ</p>
          <h2 className="section-title mt-3">Quick answers</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expanded === index

            return (
              <div key={faq.question} className="border border-gold/15">
                <button
                  onClick={() => setExpanded(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[#f5f1e8]">{faq.question}</span>
                  <span className="text-gold">
                    {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-gold/10 p-4 text-[#e8dcc3]">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
