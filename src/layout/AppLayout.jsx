import { NavLink, Outlet } from 'react-router-dom'
import { SITE_TITLE } from '../siteMeta.js'

const navLinkClass = ({ isActive }) =>
  isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'

export default function AppLayout() {
  return (
    <div className="app-container">
      <nav className="site-nav" aria-label="Main">
        <div className="site-nav__inner">
          <NavLink to="/" end className="site-nav__brand" title={SITE_TITLE}>
            {SITE_TITLE}
          </NavLink>
          <div className="site-nav__links">
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
        </div>
      </nav>
      <Outlet />
      <footer className="footer">
        <p>&copy; 2026 {SITE_TITLE}. Empowering student-faculty connections.</p>
      </footer>
    </div>
  )
}
