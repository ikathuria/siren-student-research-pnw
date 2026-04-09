import { useEffect, useRef } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { SITE_TITLE } from '../siteMeta.js'

const navLinkClass = ({ isActive }) =>
  isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'

const subNavLinkClass = ({ isActive }) =>
  isActive ? 'site-nav__link site-nav__link--sub site-nav__link--active' : 'site-nav__link site-nav__link--sub'

export default function AppLayout() {
  const location = useLocation()
  const sirenNavRef = useRef(null)

  const sirenGroupActive =
    location.pathname === '/siren' ||
    location.pathname === '/newsletters' ||
    location.pathname === '/odadc' ||
    location.pathname.startsWith('/odadc/')

  useEffect(() => {
    sirenNavRef.current?.removeAttribute('open')
  }, [location.pathname])

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
            <NavLink to="/research-radar" className={navLinkClass}>
              Research Radar
            </NavLink>
            <NavLink to="/spotlight" className={navLinkClass}>
              Spotlight
            </NavLink>
            <details
              ref={sirenNavRef}
              className={`site-nav__group${sirenGroupActive ? ' site-nav__group--active' : ''}`}
            >
              <summary className="site-nav__group-summary">SIREN</summary>
              <ul className="site-nav__sub" role="list">
                <li>
                  <NavLink to="/siren" className={subNavLinkClass}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/odadc" className={subNavLinkClass}>
                    ODADC
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/newsletters" className={subNavLinkClass}>
                    SIREN Brief
                  </NavLink>
                </li>
              </ul>
            </details>
            <NavLink to="/alumni" className={navLinkClass}>
              Alumni
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
