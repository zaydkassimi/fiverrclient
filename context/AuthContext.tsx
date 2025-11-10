import React, { createContext, useContext, useEffect, useState } from 'react'

type User = {
  username: string
}

type AuthContextValue = {
  user: User | null
  login: (username: string, password?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ca_user')
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
  }, [])

  const login = async (username: string) => {
    const u = { username }
    localStorage.setItem('ca_user', JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('ca_user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


