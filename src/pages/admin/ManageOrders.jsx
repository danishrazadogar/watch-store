import { useOrders } from '../../context/OrderContext'

const statuses = ['Pending', 'Shipped', 'Delivered']

const badge = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
}

export default function ManageOrders() {
  const { orders, updateStatus } = useOrders()

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
        <p className="text-gray-500">Abhi koi order nahi hai.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-xl shadow p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">Order #{o.id}</p>
                <p className="text-xs text-gray-500">{o.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge[o.status]}`}>
                  {o.status}
                </span>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              <p><b>Customer:</b> {o.customer.name} ({o.userEmail})</p>
              <p><b>Phone:</b> {o.customer.phone}</p>
              <p><b>Address:</b> {o.customer.address}, {o.customer.city}</p>
            </div>

            <ul className="mt-3 text-sm border-t pt-3 space-y-1">
              {o.items.map((i) => (
                <li key={i.id} className="flex justify-between">
                  <span>{i.name} × {i.qty}</span>
                  <span>Rs. {(i.price * i.qty).toLocaleString()}</span>
                </li>
              ))}
            </ul>

            <p className="text-right font-bold mt-3">Total: Rs. {o.total.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}