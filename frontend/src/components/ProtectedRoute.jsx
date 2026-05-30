import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAdminUser } from '../services/adminApi'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  const adminUser = getAdminUser()
  const adminToken =
    typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-[#5b6470]">Loading...</p>
      </div>
    )
  }

  if (adminToken && adminUser) {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}
