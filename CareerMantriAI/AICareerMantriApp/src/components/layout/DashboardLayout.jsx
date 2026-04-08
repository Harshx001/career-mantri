import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

function DashboardLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="dashboard-shell">
      <Sidebar />

      <section className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="topbar-label">Welcome</p>
            <h1>{user?.fullName ?? 'Learner'}</h1>
          </div>

          <div className="topbar-actions">
            <p>{user?.email}</p>
            <button type="button" onClick={handleLogout} className="ghost-button">
              Logout
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </section>
    </div>
  )
}

export default DashboardLayout
