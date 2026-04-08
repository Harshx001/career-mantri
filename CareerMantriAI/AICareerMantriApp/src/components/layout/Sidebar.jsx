import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Profile', to: '/profile' },
  { label: 'Courses', to: '/courses' },
  { label: 'Recommendations', to: '/recommendations' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <p className="brand-title">Career Mantri</p>
        <p className="brand-subtitle">AI Career Guide</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
