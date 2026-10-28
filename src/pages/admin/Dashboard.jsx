import { useProducts } from '../../context/ProductContext'
import { useOrders } from '../../context/OrderContext'

export default function Dashboard() {
  const { products } = useProducts()
  const { orders } = useOrders()

  const pending = orders.filter((o) => o.status === 'Pending').length
  const revenue = orders
    .filter((o) => o.status === 'Delivered')
    .reduce((sum, o) => sum + o.total, 0)

  const cards = [
    { label: 'Total Products', value: products.length },
    { label: 'Total Orders', value: orders.length },
    { label: 'Pending Orders', value: pending },
    { label: 'Revenue (Delivered)', value: `Rs. ${revenue.toLocaleString()}` },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold mt-1 text-amber-600">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}