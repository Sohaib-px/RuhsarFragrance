import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ruhsarfragrance?igsh=MXR2dGZtaHExcXEyeA==',
    icon: FaInstagram,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/923342708340?text=Ruhsar%20Fragrances',
    icon: FaWhatsapp,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/18qysfmreC/?mibextid=wwXIfr',
    icon: FaFacebook,
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold tracking-[0.18em] text-[#f5f1e8]">RUHSAR</p>
          <p className="mt-1 text-sm text-[#e8dcc3]">Non-alcoholic attar, made in Pakistan.</p>
        </div>

        <div className="flex gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center border border-gold/20 text-gold transition hover:border-gold"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
