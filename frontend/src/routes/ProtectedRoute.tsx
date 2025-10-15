import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/auth/AuthContext'

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <>{children}</>
}


