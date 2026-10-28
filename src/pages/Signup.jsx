import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Please fill all fields')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Enter a valid email')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }

    const result = signup(form.name.trim(), form.email.trim(), form.password)
    if (!result.ok) {
      setError(result.message)
      return
    }
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        {error && <p className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</p>}

        <div>
          <label className="text-sm font-medium">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div>
          <label className="text-sm font-medium">Confirm Password</label>
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-amber-600">Signup</button>

        <p className="text-sm text-center text-gray-600">
          Pehle se account hai? <Link to="/login" className="text-amber-600 underline">Login</Link>
        </p>
      </form>
    </div>
  )
}