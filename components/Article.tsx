'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useOrder, Product } from './OrderContext' // Import Product from OrderContext

export const products: Product[] = [
  {
    label: 'Trial Pack',
    name: 'Impression by Invictus',
    size: '3ml Attar Bottle',
    price: 399,
    image: '/images/3ml.jpeg',
    description: 'Trial size non-alcoholic attar inspired by Invictus. Perfect for first-time users.',
  },
  {
    label: 'Best Seller',
    name: 'Impression by Invictus',
    size: '6ml Attar Bottle',
    price: 749,
    image: '/images/6ml.jpeg',
    description: 'Daily wear non-alcoholic attar inspired by Invictus. Balanced and long lasting.',
  },
  {
    label: 'Best Value',
    name: 'Impression by Invictus',
    size: '12ml Attar Bottle',
    price: 999,
    image: '/images/12ml.jpeg',
    description: 'Premium size non-alcoholic attar inspired by Invictus with strong lasting character.',
  },
]

export const bundles: Product[] = [
  {
    badge: 'Most Popular',
    name: 'Discovery Pack',
    contents: '3 x 3ml',
    price: 999,
    originalPrice: 1197,
    discountedPrice: 999,
    description: 'Entry-level Invictus impression set for new customers.',
  },
  {
    badge: 'Best Value',
    name: 'Signature Pack',
    contents: '3 x 6ml',
    price: 1999,
    originalPrice: 2247,
    discountedPrice: 1999,
    description: 'Daily-use Invictus impression pack for regular customers.',
  },
  {
    badge: 'Premium Choice',
    name: 'Luxury Pack',
    contents: '3 x 12ml',
    price: 2599,
    originalPrice: 2997,
    discountedPrice: 2599,
    description: 'Premium Invictus impression gift set for special occasions.',
  },
]

export const heroBundle: Product = {
  label: 'Most Recommended',
  name: 'Ruhsar Invictus Impression Set',
  contents: ['1 x 3ml', '1 x 6ml', '1 x 12ml'],
  price: 1799,
  originalPrice: 2147,
  discountedPrice: 1799,
  description: 'Complete Invictus impression experience including trial, daily, and premium sizes. Best choice for first-time customers.',
}

const QuantitySelector = ({ value, onChange }: { value: number, onChange: (val: number) => void }) => (
  <div className="flex items-center border border-gold/30 rounded overflow-hidden h-11">
    <button 
      onClick={() => onChange(Math.max(1, value - 1))}
      className="px-3 bg-gold/10 text-gold hover:bg-gold/20 transition-colors h-full"
    >
      -
    </button>
    <span className="px-4 text-[#f5f1e8] border-x border-gold/30 min-w-[40px] text-center flex items-center justify-center h-full">
      {value}
    </span>
    <button 
      onClick={() => onChange(value + 1)}
      className="px-3 bg-gold/10 text-gold hover:bg-gold/20 transition-colors h-full"
    >
      +
    </button>
  </div>
)

const Article = () => {
  const { addToCart } = useOrder()
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const getQty = (id: string) => quantities[id] || 1
  const setQty = (id: string, val: number) => setQuantities(prev => ({ ...prev, [id]: val }))

  return (
    <section id="article" className="section-padding border-t border-gold/10 px-4">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="max-w-2xl">
          <p className="section-kicker">Shop Ruhsar</p>
          <h2 className="section-title mt-3">Impression by Invictus</h2>
          <p className="section-copy mt-4">
            Ruhsar is an impression attar brand. This collection is a non-alcoholic
            oil-based impression inspired by Invictus, available in bottles and bundles.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.size}
              className="flex h-full flex-col border border-gold/15 bg-[#2b1a10]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0b0b0b]">
                <Image
                  src={product.image || '/images/3ml.jpeg'}
                  alt={`Ruhsar ${product.size} ${product.name}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="section-kicker">{product.label}</p>
                <h3 className="mt-3 text-2xl font-bold text-[#f5f1e8]">{product.name}</h3>
                <p className="mt-1 text-sm font-semibold text-gold">{product.size}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#e8dcc3]">
                  {product.description}
                </p>
                <p className="mt-5 text-2xl font-bold text-gold">PKR {product.price}</p>
                <div className="mt-5 flex gap-2">
                  <QuantitySelector 
                    value={getQty(product.size || product.name)} 
                    onChange={(v) => setQty(product.size || product.name, v)} 
                  />
                  <button onClick={() => addToCart(product, getQty(product.size || product.name))} className="gold-button flex-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <article className="border border-gold/25 bg-[#2b1a10] p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="grid grid-cols-3 gap-3">
              {products.map((product) => (
                <div
                  key={product.size}
                  className="relative aspect-[4/5] overflow-hidden bg-[#0b0b0b]"
                >
                  <Image
                    src={product.image || '/images/3ml.jpeg'}
                    alt={`Ruhsar ${product.size} ${product.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div>
              <p className="section-kicker">{heroBundle.label}</p>
              <h3 className="mt-3 text-3xl font-bold leading-tight text-[#f5f1e8]">
                {heroBundle.name}
              </h3>
              <p className="mt-4 max-w-xl text-[#e8dcc3]">{heroBundle.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {Array.isArray(heroBundle.contents) ? heroBundle.contents.map((item) => (
                  <span key={item} className="border border-gold/20 px-3 py-2 text-sm text-gold">
                    {item}
                  </span>
                )) : (
                  <span className="border border-gold/20 px-3 py-2 text-sm text-gold">
                    {heroBundle.contents}
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-end gap-3">
                <span className="text-sm text-[#e8dcc3]/60 line-through">
                  PKR {heroBundle.originalPrice}
                </span>
                <span className="text-3xl font-bold text-gold">
                  PKR {heroBundle.discountedPrice || heroBundle.price}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <QuantitySelector value={getQty('hero')} onChange={(v) => setQty('hero', v)} />
                <button onClick={() => addToCart(heroBundle, getQty('hero'))} className="gold-button">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </article>

        <div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Pack of 3</p>
              <h3 className="mt-2 text-3xl font-bold text-[#f5f1e8]">Same size bundles</h3>
            </div>
            <p className="max-w-md text-sm text-[#e8dcc3]">
              Simple Invictus impression bundle options for gifting, daily use, and premium
              buyers.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {bundles.map((bundle) => (
              <article key={bundle.name} className="border border-gold/15 p-5">
                <p className="section-kicker">{bundle.badge}</p>
                <h4 className="mt-3 text-xl font-bold text-[#f5f1e8]">
                  Ruhsar {bundle.name}
                </h4>
                <p className="mt-2 text-lg font-semibold text-gold">{bundle.contents}</p>
                <p className="mt-3 text-sm leading-6 text-[#e8dcc3]">{bundle.description}</p>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-sm text-[#e8dcc3]/60 line-through">
                    PKR {bundle.originalPrice}
                  </span>
                  <span className="text-2xl font-bold text-gold">
                    PKR {bundle.discountedPrice || bundle.price}
                  </span>
                </div>
                <div className="mt-5 flex gap-2">
                  <QuantitySelector value={getQty(bundle.name)} onChange={(v) => setQty(bundle.name, v)} />
                  <button onClick={() => addToCart(bundle, getQty(bundle.name))} className="outline-button flex-1">
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Article
