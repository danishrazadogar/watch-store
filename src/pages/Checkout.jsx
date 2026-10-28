import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'

export default function Checkout() {
  const { user } = useAuth()
  const { cart, totalPrice, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '', city: '' })
  const [error, setError] = useState('')

  // login ke baghair checkout nahi
  if (!user) return <Navigate to="/login" replace />

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link to="/products" className="text-amber-600 underline">Go shopping</Link>
      </div>
    )
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setError('Please fill all fields')
      return
    }
    if (!/^[0-9]{10,13}$/.test(form.phone.trim())) {
      setError('Enter a valid phone number (10 to 13 digits)')
      return
    }

    placeOrder({
      userId: user.id,
      userEmail: user.email,
      customer: form,
      items: cart,
      total: totalPrice,
      payment: 'Cash on Delivery',
    })
    clearCart()
    navigate('/order-success')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold">Shipping Details</h1>

        {error && <p className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</p>}

        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" placeholder="03001234567" />
        </div>
        <div>
          <label className="text-sm font-medium">Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} rows="3" className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">City</label>
          <input name="city" value={form.city} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <p className="text-sm text-gray-600">Payment: Cash on Delivery</p>

        <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-amber-600">
          Place Order
        </button>
      </form>

      <div className="bg-white p-6 rounded-xl shadow h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} × {item.qty}</span>
              <span>Rs. {(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <p className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rs. {totalPrice.toLocaleString()}</span>
        </p>
      </div>
    </div>
  )
}