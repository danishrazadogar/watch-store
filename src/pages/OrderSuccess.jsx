import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <div className="text-center py-24 px-4">
      <p className="text-5xl mb-4">✅</p>
      <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
      <p className="text-gray-600 mb-6">Shukriya! Aap ka order Pending hai, admin jald process karega.</p>
      <Link to="/products" className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600">
        Continue Shopping
      </Link>
    </div>
  )
}