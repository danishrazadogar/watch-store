import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg ${isActive ? 'bg-amber-500 text-white' : 'hover:bg-gray-200'}`

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-5 gap-6">
      <aside className="bg-white rounded-xl shadow p-4 h-fit space-y-2">
        <h2 className="font-bold text-lg mb-2">Admin Panel</h2>
        <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/admin/products" className={linkClass}>Manage Products</NavLink>
        <NavLink to="/admin/orders" className={linkClass}>Manage Orders</NavLink>
      </aside>

      <section className="md:col-span-4">
        <Outlet />
      </section>
    </div>
  )
}