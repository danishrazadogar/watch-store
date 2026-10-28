import { useState } from 'react'
import { useProducts } from '../../context/ProductContext'

const emptyForm = {
  name: '',
  brand: '',
  category: 'Men',
  price: '',
  stock: '',
  image: '',
  description: '',
}

export default function ManageProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim() || !form.brand.trim() || !form.price || form.stock === '') {
      setError('Name, brand, price aur stock zaroori hain')
      return
    }
    if (Number(form.price) <= 0 || Number(form.stock) < 0) {
      setError('Price 0 se zyada aur stock negative nahi hona chahiye')
      return
    }

    const data = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image.trim() || 'https://placehold.co/400x300?text=Watch',
      description: form.description.trim(),
    }

    if (editingId) {
      updateProduct(editingId, data)
    } else {
      addProduct(data)
    }

    setForm(emptyForm)
    setEditingId(null)
    setError('')
  }

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      stock: p.stock,
      image: p.image,
      description: p.description,
    })
    setEditingId(p.id)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Is watch ko delete karna hai?')) {
      deleteProduct(id)
    }
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-5 mb-8 grid sm:grid-cols-2 gap-4">
        <h2 className="sm:col-span-2 font-semibold">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>

        {error && <p className="sm:col-span-2 bg-red-100 text-red-700 p-2 rounded text-sm">{error}</p>}

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border rounded px-3 py-2" />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="border rounded px-3 py-2" />

        <select name="category" value={form.category} onChange={handleChange} className="border rounded px-3 py-2">
          <option>Men</option>
          <option>Women</option>
          <option>Smart</option>
          <option>Luxury</option>
        </select>

        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border rounded px-3 py-2" />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="border rounded px-3 py-2" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image path ya link (/images/w13.jpeg)" className="border rounded px-3 py-2" />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows="2"
          className="sm:col-span-2 border rounded px-3 py-2"
        />

        <div className="sm:col-span-2 flex gap-3">
          <button className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-amber-600">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://placehold.co/60x60?text=W'
                    }}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">Rs. {p.price.toLocaleString()}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 space-x-2 whitespace-nowrap">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}