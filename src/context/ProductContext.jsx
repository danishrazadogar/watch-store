import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { watches } from '../data/watches'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useLocalStorage('products', watches)

  const addProduct = (product) =>
    setProducts([...products, { ...product, id: Date.now() }])

  const updateProduct = (id, updated) =>
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updated } : p)))

  const deleteProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id))

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)