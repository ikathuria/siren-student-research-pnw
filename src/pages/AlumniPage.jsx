import { useState } from 'react'
import { Link } from 'react-router-dom'
import alumniData from '../data/alumni.json'
import { COMMUNITY_CONTACT_EMAIL } from '../siteMeta.js'

function AlumniContactLink({ alum }) {
  const label = alum.contactLabel || 'Contact'
  if (alum.contactType === 'email' && alum.contact) {
    return (
      <a href={`mailto:${alum.contact}`} className="contact-link">
        {label}
      </a>
    )
  }
  if ((alum.contactType === 'linkedin' || alum.contactType === 'other') && alum.contact) {
    return (
      <a href={alum.contact} target="_blank" rel="noopener noreferrer" className="resource-link">
        {label}
      </a>
    )
  }
  return <span className="muted">{label}</span>
}

export default function AlumniPage() {
  const list = alumniData.alumni || []

  const [volName, setVolName] = useState('')
  const [volClassOf, setVolClassOf] = useState('')
  const [volDegree, setVolDegree] = useState('')
  const [volMessage, setVolMessage] = useState('')
  const [volContactMethod, setVolContactMethod] = useState('email')
  const [volEmail, setVolEmail] = useState('')
  const [volLinkedIn, setVolLinkedIn] = useState('')
  const [volFocus, setVolFocus] = useState('')

  const handleVolunteer = (event) => {
    event.preventDefault()
    const contactLine =
      volContactMethod === 'linkedin'
        ? `Public listing contact: LinkedIn — ${volLinkedIn.trim()}`
        : `Public listing contact: Email — ${volEmail.trim()}`

    const body = [
      'Alumni Connect — volunteer to be listed / mentor',
      '',
      `Name: ${volName}`,
      `Class year: ${volClassOf}`,
      `Degree / program: ${volDegree}`,
      contactLine,
      volFocus.trim() ? `Focus areas (optional): ${volFocus.trim()}` : null,
      '',
      'How I would like to help:',
      volMessage.trim()
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${COMMUNITY_CONTACT_EMAIL}?subject=${encodeURIComponent(
      'Alumni mentor volunteer'
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="page page--initiative">
      <header className="page-hero page-hero--initiatives">
        <div className="page-hero__content page-hero__content--wide">
          <p className="page-hero__eyebrow">Community</p>
          <h1 className="page-hero__title">Alumni</h1>
          <p className="page-hero__tagline">{alumniData.intro}</p>
        </div>
      </header>

      <main className="page-main page-main--wide">
        <section className="content-section">
          <h2>Alumni mentors</h2>
          {list.length === 0 && (
            <p className="prose muted">
              No volunteers are listed yet. When alumni opt in, their preferred point of contact will appear in the cards
              below. Edit <code className="inline-code">src/data/alumni.json</code> to add approved entries, or use the
              volunteer form and we will publish after confirmation.
            </p>
          )}
          {list.length > 0 && (
            <ul className="alumni-grid">
              {list.map((alum) => (
                <li key={`${alum.name}-${alum.classOf}`} className="alumni-card">
                  <h3 className="alumni-card__name">{alum.name}</h3>
                  <p className="alumni-card__meta">
                    {alum.degree}
                    {alum.classOf ? ` · Class of ${alum.classOf}` : ''}
                  </p>
                  {alum.focus && <p className="alumni-card__focus">{alum.focus}</p>}
                  <p className="alumni-card__contact">
                    <AlumniContactLink alum={alum} />
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="content-section">
          <h2>Volunteer your info</h2>
          <p className="prose">{alumniData.volunteerNote}</p>
          <form className="community-form" onSubmit={handleVolunteer} aria-describedby="alumni-vol-required-note">
            <p className="community-form__required-note muted" id="alumni-vol-required-note">
              <span className="required-mark" aria-hidden="true">*</span> Required field
            </p>
            <div className="community-form__field">
              <label htmlFor="alumni-vol-name">
                Full name <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id="alumni-vol-name"
                type="text"
                autoComplete="name"
                required
                value={volName}
                onChange={(e) => setVolName(e.target.value)}
              />
            </div>
            <div className="community-form__field">
              <label htmlFor="alumni-vol-year">
                Class year <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id="alumni-vol-year"
                type="text"
                inputMode="numeric"
                required
                placeholder="e.g. 2020"
                value={volClassOf}
                onChange={(e) => setVolClassOf(e.target.value)}
              />
            </div>
            <div className="community-form__field">
              <label htmlFor="alumni-vol-degree">
                Degree / program at PNW <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id="alumni-vol-degree"
                type="text"
                required
                value={volDegree}
                onChange={(e) => setVolDegree(e.target.value)}
              />
            </div>
            <fieldset className="community-form__fieldset">
              <legend className="community-form__legend">Public listing contact</legend>
              <p className="community-form__hint muted">
                Choose how you want your mentor card to link once approved. You can still edit the draft email before
                sending.
              </p>
              <div className="community-form__radios">
                <label className="community-form__radio-label">
                  <input
                    type="radio"
                    name="alumni-contact-method"
                    value="email"
                    checked={volContactMethod === 'email'}
                    onChange={() => setVolContactMethod('email')}
                  />
                  Email
                </label>
                <label className="community-form__radio-label">
                  <input
                    type="radio"
                    name="alumni-contact-method"
                    value="linkedin"
                    checked={volContactMethod === 'linkedin'}
                    onChange={() => setVolContactMethod('linkedin')}
                  />
                  LinkedIn profile URL
                </label>
              </div>
              {volContactMethod === 'email' && (
                <div className="community-form__field community-form__field--nested">
                  <label htmlFor="alumni-vol-email">
                    Email address <span className="required-mark" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="alumni-vol-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={volEmail}
                    onChange={(e) => setVolEmail(e.target.value)}
                  />
                </div>
              )}
              {volContactMethod === 'linkedin' && (
                <div className="community-form__field community-form__field--nested">
                  <label htmlFor="alumni-vol-linkedin">
                    LinkedIn profile URL <span className="required-mark" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="alumni-vol-linkedin"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="https://www.linkedin.com/in/your-profile"
                    required
                    value={volLinkedIn}
                    onChange={(e) => setVolLinkedIn(e.target.value)}
                  />
                </div>
              )}
            </fieldset>
            <div className="community-form__field">
              <label htmlFor="alumni-vol-focus">Career focus or topics you can speak to (optional)</label>
              <input
                id="alumni-vol-focus"
                type="text"
                value={volFocus}
                onChange={(e) => setVolFocus(e.target.value)}
              />
            </div>
            <div className="community-form__field">
              <label htmlFor="alumni-vol-msg">
                How would you like to help students? <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <textarea
                id="alumni-vol-msg"
                rows={4}
                required
                value={volMessage}
                onChange={(e) => setVolMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn--siren community-form__submit">
              Send volunteer request
            </button>
          </form>
        </section>

        <p className="page-back">
          <Link to="/" className="inline-link">
            Back to home
          </Link>
        </p>
      </main>
    </div>
  )
}
