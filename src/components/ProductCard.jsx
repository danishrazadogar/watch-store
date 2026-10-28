import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://placehold.co/400x300?text=Watch'
          }}
          className="w-full h-56 object-cover"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500">{product.brand} • {product.category}</p>
        <Link to={`/products/${product.id}`} className="font-semibold text-lg hover:text-amber-600">
          {product.name}
        </Link>
        <p className="text-amber-600 font-bold mt-1">Rs. {product.price.toLocaleString()}</p>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock < 1}
          className="mt-auto pt-0 bg-gray-900 text-white py-2 rounded-lg hover:bg-amber-600 transition disabled:bg-gray-400 mt-3"
        >
          {product.stock < 1 ? 'Out of stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}