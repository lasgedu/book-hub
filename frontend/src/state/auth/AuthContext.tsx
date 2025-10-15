import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getStoredToken, removeStoredToken, setStoredToken } from '../../utils/tokenStorage'
import { authApi } from '../../utils/authApi'

interface AuthUser { id: number; email: string }

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(getStoredToken())

  useEffect(() => {
    if (!token) return
    authApi.me(token).then((me) => setUser(me)).catch(() => {
      removeStoredToken();
      setToken(null);
      setUser(null);
    })
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password)
    setStoredToken(res.token)
    setToken(res.token)
    setUser(res.user)
  }

  const logout = () => {
    removeStoredToken()
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({ user, token, login, logout }), [user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


