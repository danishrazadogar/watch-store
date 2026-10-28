import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', [])

  const addToCart = (product) => {
    const exists = cart.find((i) => i.id === product.id)
    if (exists) {
      setCart(cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)