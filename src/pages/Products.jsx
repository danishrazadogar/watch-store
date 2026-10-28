import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const [brand, setBrand] = useState('All')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(100000)

  const brands = ['All', ...new Set(products.map((p) => p.brand))]
  const categories = ['All', ...new Set(products.map((p) => p.category))]

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchBrand = brand === 'All' || p.brand === brand
    const matchCategory = category === 'All' || p.category === category
    const matchPrice = p.price <= maxPrice
    return matchSearch && matchBrand && matchCategory && matchPrice
  })

  const resetFilters = () => {
    setBrand('All')
    setCategory('All')
    setMaxPrice(100000)
    setSearchParams({})
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-6">
      {/* Filters */}
      <aside className="bg-white p-4 rounded-xl shadow h-fit space-y-4">
        <h2 className="font-bold text-lg">Filters</h2>

        <div>
          <label className="text-sm font-medium">Search</label>
          <input
            value={search}
            onChange={(e) => setSearchParams(e.target.value ? { search: e.target.value } : {})}
            placeholder="Watch name"
            className="w-full border rounded px-2 py-1 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Brand</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border rounded px-2 py-1 mt-1">
            {brands.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded px-2 py-1 mt-1">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Max price: Rs. {maxPrice.toLocaleString()}</label>
          <input
            type="range"
            min="10000"
            max="100000"
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <button onClick={resetFilters} className="w-full bg-gray-200 py-1.5 rounded hover:bg-gray-300">
          Reset
        </button>
      </aside>

      {/* Products grid */}
      <section className="md:col-span-3">
        <p className="text-gray-600 mb-4">{filtered.length} watches found</p>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No watches match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}