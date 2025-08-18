import React, { useContext } from 'react'
import { AppContext } from './Admin/Context/Context'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { currentAdmin } = useContext(AppContext)

  if (!currentAdmin) {
    return <Navigate to="/authentication" replace />
  }

  return children
}

export default ProtectedRoute
