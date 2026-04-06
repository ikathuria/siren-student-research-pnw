import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'

export default function AppLayout() {
  return (
    <div className="app-container">
      <nav className="site-nav" aria-label="Main">
        <div className="site-nav__inner">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/siren" className={navLinkClass}>
            SIREN
          </NavLink>
          <NavLink to="/odadc" className={navLinkClass}>
            ODADC
          </NavLink>
          <NavLink to="/newsletters" className={navLinkClass}>
            SIREN Brief
          </NavLink>
        </div>
      </nav>
      <Outlet />
      <footer className="footer">
        <p>&copy; 2026 PNW Research Radar. Empowering student-faculty connections.</p>
      </footer>
    </div>
  )
}
