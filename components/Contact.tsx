'use client'

import { useEffect, useState } from 'react'

type FormValues = {
  name: string
  email: string
  message: string
}

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
}

export default function Contact() {
  const [formData, setFormData] = useState<FormValues>(initialValues)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!status) {
      return
    }

    const timer = window.setTimeout(() => {
      setStatus('')
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setStatus('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('Please fill all fields.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send')
      }

      setStatus('Message sent successfully.')
      setFormData(initialValues)
    } catch {
      setStatus('Message could not be sent. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding border-t border-gold/10 px-4">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1fr]">
        <div className="space-y-4">
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Order or ask about Ruhsar</h2>
          <p className="section-copy">
            For attar details, delivery, gifting, or bulk orders, send us a message.
          </p>

          <div className="space-y-2 pt-4 text-[#e8dcc3]">
            <p>Email: ruhsarfragrance@gmail.com</p>
            <p>Contact Number: +92 3342708340</p>
            <p>facebook.com/ruhsarfragrance</p>
            <p>instagram.com/ruhsarfragrance</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-gold/20 bg-transparent px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#9f9275] focus:border-gold"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gold/20 bg-transparent px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#9f9275] focus:border-gold"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Message"
            className="w-full border border-gold/20 bg-transparent px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#9f9275] focus:border-gold"
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="submit" disabled={isLoading} className="gold-button">
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
            {status && (
              <div className="flex items-center gap-3 border border-gold/20 px-4 py-3 text-sm text-[#e8dcc3]">
                <span>{status}</span>
                <button
                  type="button"
                  onClick={() => setStatus('')}
                  className="text-gold transition hover:text-[#f5f1e8]"
                  aria-label="Dismiss message"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
