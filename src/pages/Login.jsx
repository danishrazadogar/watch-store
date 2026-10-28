import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Please fill all fields')
      return
    }

    const result = login(email.trim(), password)
    if (!result.ok) {
      setError(result.message)
      return
    }

    // admin ho to admin panel, warna home
    navigate(email.trim() === 'admin@watch.com' ? '/admin' : '/')
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && <p className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</p>}

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Password"
          />
        </div>

        <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-amber-600">Login</button>

        <p className="text-sm text-center text-gray-600">
          Account nahi hai? <Link to="/signup" className="text-amber-600 underline">Signup</Link>
        </p>
      </form>
    </div>
  )
}