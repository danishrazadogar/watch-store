import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(search)}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    isActive ? 'text-amber-400' : 'hover:text-amber-400'

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-4 justify-between">
        <Link to="/" className="text-2xl font-bold text-amber-400">⌚ WatchHub</Link>

        <form onSubmit={handleSearch} className="flex flex-1 max-w-md">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search watches..."
            className="w-full px-3 py-1.5 rounded-l-lg text-black outline-none bg-white"
          />
          <button className="bg-amber-500 px-4 rounded-r-lg hover:bg-amber-600">Go</button>
        </form>

        <div className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>

          {user?.role === 'admin' && (
            <NavLink to="/admin" className={linkClass}>Admin</NavLink>
          )}

          <Link to="/cart" className="relative hover:text-amber-400">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-amber-500 text-xs rounded-full px-1.5">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <span className="text-gray-300">Hi, {user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/signup" className="bg-amber-500 px-3 py-1 rounded hover:bg-amber-600">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}