import { useState, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import siren from '../data/siren.json'
import { COMMUNITY_CONTACT_EMAIL, FACULTY_EXPLORER_TITLE, SITE_TITLE } from '../siteMeta.js'

export default function Home() {
  const location = useLocation()
  const [ambName, setAmbName] = useState('')
  const [ambEmail, setAmbEmail] = useState('')
  const [ambDepartment, setAmbDepartment] = useState('')
  const [ambClassYear, setAmbClassYear] = useState('')
  const [ambMessage, setAmbMessage] = useState('')

  useLayoutEffect(() => {
    if (location.hash !== '#student-ambassadors') return
    const el = document.getElementById('student-ambassadors')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash, location.pathname])

  const handleAmbassadorApply = (event) => {
    event.preventDefault()
    const body = [
      'Student Ambassador Application',
      '',
      `Name: ${ambName}`,
      `PNW email: ${ambEmail}`,
      `Department / program: ${ambDepartment}`,
      ambClassYear.trim() ? `Class year: ${ambClassYear.trim()}` : null,
      '',
      'Why I want to serve:',
      ambMessage.trim() || '(not provided)'
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${COMMUNITY_CONTACT_EMAIL}?subject=${encodeURIComponent(
      'Student Ambassador Application'
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="page page--home-landing">
      <header className="page-hero page-hero--home-landing">
        <div className="page-hero__content page-hero__content--wide">
          <p className="page-hero__eyebrow">Purdue University Northwest</p>
          <h1 className="page-hero__title">{SITE_TITLE}</h1>
          <p className="page-hero__tagline page-hero__tagline--home">
            Student-led hub for research discovery, stories, and connections across campus.
          </p>
          <div className="home-landing-actions">
            <Link to="/research-radar" className="btn btn--siren">
              Open {FACULTY_EXPLORER_TITLE}
            </Link>
            <Link to="/siren" className="btn btn--siren-outline">
              About the club
            </Link>
          </div>
        </div>
      </header>

      <main className="page-main page-main--wide">
        <section className="content-section">
          <h2>About this site</h2>
          <p className="prose">
            This site brings together tools and stories so students can find research mentors, see what peers and faculty
            are building, and stay in touch with the broader SIREN community—including alumni who volunteer their time.
          </p>
          <ul className="home-landing-pillars">
            <li>
              <Link to="/research-radar" className="home-landing-pillar">
                <span className="home-landing-pillar__title">{FACULTY_EXPLORER_TITLE}</span>
                <span className="home-landing-pillar__desc">Search faculty and topics across colleges and departments.</span>
              </Link>
            </li>
            <li>
              <Link to="/spotlight" className="home-landing-pillar">
                <span className="home-landing-pillar__title">Spotlight</span>
                <span className="home-landing-pillar__desc">Monthly student and faculty research highlights.</span>
              </Link>
            </li>
            <li>
              <Link to="/odadc" className="home-landing-pillar">
                <span className="home-landing-pillar__title">ODADC</span>
                <span className="home-landing-pillar__desc">
                  One Day App Development Challenge—teams build a real prototype in one day. Browse showcases by year.
                </span>
              </Link>
            </li>
            <li>
              <Link to="/alumni" className="home-landing-pillar">
                <span className="home-landing-pillar__title">Alumni</span>
                <span className="home-landing-pillar__desc">Mentor contacts and how to volunteer your info.</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>About SIREN</h2>
          <p className="page-hero__lead">{siren.fullName}</p>
          <p className="prose muted">{siren.affiliation}</p>
          <p className="prose">{siren.tagline}</p>
          <ul className="mission-list">
            {siren.mission.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <p>
            <Link to="/siren" className="inline-link">
              Events, constitution, and how to join →
            </Link>
          </p>
        </section>

        <section className="content-section">
          <h2>Also on this site</h2>
          <ul className="link-list">
            <li>
              <Link to="/newsletters">The SIREN Brief (newsletters)</Link>
            </li>
          </ul>
        </section>

        <section
          className="content-section student-ambassadors"
          id="student-ambassadors"
          aria-labelledby="student-ambassadors-heading"
        >
          <h2 id="student-ambassadors-heading">Student ambassadors</h2>
          <p className="prose">
            Ambassadors help bridge colleges and departments: they share what is happening in their program, point peers
            toward the Research Radar, and keep SIREN connected to student research across campus.
          </p>
          <ul className="mission-list">
            <li>One or two primary contacts per department (or as agreed with your college)</li>
            <li>Surface student publications, competitions, and lab news worth featuring on Spotlight</li>
            <li>Welcome questions from students who are not sure where to start</li>
          </ul>
          <h3 className="content-section__subhead">Apply</h3>
          <p className="prose muted">
            Use your official PNW email. Submitting opens a draft message to the SIREN team—you can edit it before
            sending.
          </p>
          <form
            className="community-form"
            onSubmit={handleAmbassadorApply}
            noValidate
            aria-describedby="home-ambassador-required-note"
          >
            <p className="community-form__required-note muted" id="home-ambassador-required-note">
              <span className="required-mark" aria-hidden="true">*</span> Required field
            </p>
            <div className="community-form__field">
              <label htmlFor="home-ambassador-name">
                Full name <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id="home-ambassador-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={ambName}
                onChange={(e) => setAmbName(e.target.value)}
              />
            </div>
            <div className="community-form__field">
              <label htmlFor="home-ambassador-email">
                PNW email <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id="home-ambassador-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={ambEmail}
                onChange={(e) => setAmbEmail(e.target.value)}
              />
            </div>
            <div className="community-form__field">
              <label htmlFor="home-ambassador-dept">
                Department / program <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id="home-ambassador-dept"
                name="department"
                type="text"
                required
                value={ambDepartment}
                onChange={(e) => setAmbDepartment(e.target.value)}
              />
            </div>
            <div className="community-form__field">
              <label htmlFor="home-ambassador-year">Class year (optional)</label>
              <input
                id="home-ambassador-year"
                name="classYear"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 2027"
                value={ambClassYear}
                onChange={(e) => setAmbClassYear(e.target.value)}
              />
            </div>
            <div className="community-form__field">
              <label htmlFor="home-ambassador-why">
                Why do you want to be a student ambassador?{' '}
                <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <textarea
                id="home-ambassador-why"
                name="message"
                rows={5}
                required
                value={ambMessage}
                onChange={(e) => setAmbMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn--siren community-form__submit">
              Apply
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
