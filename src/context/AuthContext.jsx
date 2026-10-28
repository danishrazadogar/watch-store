import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext()

const defaultAdmin = {
  id: 1,
  name: 'Admin',
  email: 'admin@watch.com',
  password: 'admin123',
  role: 'admin',
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', [defaultAdmin])
  const [user, setUser] = useLocalStorage('currentUser', null)

  const signup = (name, email, password) => {
    if (users.some((u) => u.email === email)) {
      return { ok: false, message: 'Email already registered' }
    }
    const newUser = { id: Date.now(), name, email, password, role: 'user' }
    setUsers([...users, newUser])
    setUser(newUser)
    return { ok: true }
  }

  const login = (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return { ok: false, message: 'Invalid email or password' }
    setUser(found)
    return { ok: true }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)