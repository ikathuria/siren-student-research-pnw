import { Link } from 'react-router-dom'
import siren from '../data/siren.json'
import { publicUrl } from '../lib/publicUrl.js'

export default function SirenPage() {
  return (
    <div className="page page--siren">
      <header className="page-hero page-hero--siren">
        <div className="page-hero__content">
          <img
            className="siren-logo"
            src={publicUrl('siren/logo_colour.jpeg')}
            alt="SIREN logo"
            width={280}
          />
          <p className="page-hero__eyebrow">{siren.affiliation}</p>
          <h1 className="page-hero__title">SIREN</h1>
          <p className="page-hero__lead">{siren.fullName}</p>
          <p className="page-hero__tagline">{siren.tagline}</p>
          <a
            className="btn btn--siren"
            href={publicUrl('siren/constitution.pdf')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our constitution (PDF)
          </a>
        </div>
      </header>

      <main className="page-main">
        <section className="content-section">
          <h2>Mission</h2>
          <ul className="mission-list">
            {siren.mission.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>

        {siren.socialLinks?.length > 0 && (
          <section className="content-section">
            <h2>Connect</h2>
            <ul className="link-list">
              {siren.socialLinks.filter(l => l.url).map((link) => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="content-section">
          <h2>Events and socials</h2>
          <ul className="event-cards">
            {siren.events.map((ev) => (
              <li key={ev.title} className="event-card">
                <h3>{ev.title}</h3>
                <p className="event-card__date">{ev.date}</p>
                <p>{ev.description}</p>
                {ev.route && (
                  <Link to={ev.route} className="inline-link">Learn more</Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
