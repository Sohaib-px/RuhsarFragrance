import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import FAQ from '@/components/FAQ'
import Reviews from '@/components/Reviews'
import Article from '@/components/Article'
import OrderModal from '@/components/OrderModal'

export default function Page() {
  return (
      <div className="site-shell">
        <Header />
        <main className="pb-8">
          <Home />
          <Article />
          <About />
          <Reviews />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <OrderModal />
      </div>
  )
}
