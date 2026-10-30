import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { products } = useProducts()
  const featured = products.slice(0, 4)

  return (
    <div>
      <section
        className="relative bg-gray-900 bg-cover bg-center text-white text-center py-28 px-4"
        style={{ backgroundImage: "url('/images/hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Time Looks Better <span className="text-amber-400">On You</span>
          </h1>
          <p className="text-gray-300 mb-6">Discover classic, smart and luxury watches.</p>
          <Link
            to="/products"
            className="bg-amber-500 px-6 py-3 rounded-lg font-semibold hover:bg-amber-600"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Featured Watches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}