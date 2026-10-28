import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
        <Link to="/products" className="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://placehold.co/100x100?text=Watch'
              }}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-amber-600">Rs. {item.price.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <span className="w-6 text-center">{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>

            <p className="w-28 text-right font-semibold">Rs. {(item.price * item.qty).toLocaleString()}</p>

            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">✕</button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-4 mt-6 flex items-center justify-between">
        <p className="text-xl font-bold">Total: Rs. {totalPrice.toLocaleString()}</p>
        <Link to="/checkout" className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-amber-600">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}