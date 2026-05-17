'use client'

import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useOrder } from './OrderContext'

const navItems = [
  { label: 'Shop', id: 'article' },
  { label: 'About', id: 'about' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartItems, setModalOpen } = useOrder()
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-[#0b0b0b]/95 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-4">
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center text-left"
          aria-label="Go to home"
        >
          <div>
            <span className="block text-xl font-bold tracking-[0.18em] text-[#f5f1e8]">
              RUHSAR
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-gold">
              Non-Alcoholic Attar
            </span>
          </div>
        </button>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-[#e8dcc3] transition hover:text-gold"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setModalOpen(true)}
              className="text-sm font-semibold text-gold transition hover:text-[#f5f1e8]"
            >
              View Cart {cartCount > 0 ? `(${cartCount})` : ''}
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center border border-gold/25 text-gold lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gold/15 py-3 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-1 py-2 text-left text-[#e8dcc3]"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setModalOpen(true); setMenuOpen(false); }}
              className="px-1 py-2 text-left font-semibold text-gold"
            >
              View Cart {cartCount > 0 ? `(${cartCount})` : ''}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
