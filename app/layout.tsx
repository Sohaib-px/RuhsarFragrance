import type { Metadata } from 'next'
import './globals.css'
import { OrderProvider } from '@/components/OrderContext'
import Toast from '@/components/Toast'
import Chatbot from '@/components/Chatbot'

export const metadata: Metadata = {
  title: 'Ruhsar - Non-Alcoholic Attar',
  description: 'Discover Ruhsar, a premium non-alcoholic attar brand with pure oil blends.',
  icons: {
    icon: '/images/ruhsarmain.jpeg',
    apple: '/images/ruhsarmain.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <OrderProvider>
          {children}
          <Chatbot />
          <Toast />
        </OrderProvider>
      </body>
    </html>
  )
}
