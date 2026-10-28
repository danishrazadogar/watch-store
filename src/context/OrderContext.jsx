import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('orders', [])

  const placeOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      status: 'Pending',
      date: new Date().toLocaleString(),
    }
    setOrders([newOrder, ...orders])
    return newOrder
  }

  const updateStatus = (id, status) =>
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)))

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateStatus }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => useContext(OrderContext)