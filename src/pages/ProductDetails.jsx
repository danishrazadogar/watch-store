import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const { products } = useProducts()
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-4">Watch not found.</p>
        <Link to="/products" className="text-amber-600 underline">Back to products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/products" className="text-sm text-gray-500 hover:text-amber-600">← Back to products</Link>

      <div className="bg-white rounded-xl shadow mt-4 p-6 grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://placehold.co/500x400?text=Watch'
          }}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div>
          <p className="text-sm text-gray-500">{product.brand} • {product.category}</p>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
          <p className="text-2xl text-amber-600 font-bold mt-3">Rs. {product.price.toLocaleString()}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="mt-3 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">In stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock < 1}
            className="mt-6 w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-amber-600 transition disabled:bg-gray-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}