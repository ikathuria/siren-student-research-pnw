import { Link } from 'react-router-dom'
import siren from '../data/siren.json'
import { publicUrl } from '../lib/publicUrl.js'

export default function SirenPage() {
  return (
    <div className="page page--siren">
      <header className="page-hero page-hero--siren">
        <div className="page-hero__content page-hero__content--wide">
          <img
            className="siren-logo"
            src={publicUrl('siren/logo.png')}
            alt="SIREN logo"
            width={200}
            decoding="async"
          />
          <p className="page-hero__eyebrow">{siren.affiliation}</p>
          <h1 className="page-hero__title">SIREN</h1>
          <p className="page-hero__lead">{siren.fullName}</p>
          <p className="page-hero__tagline">{siren.tagline}</p>
          <div className="siren-hero-actions">
            {siren.joinUrl && (
              <a
                className="btn btn--siren"
                href={siren.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join on MyPNW Life
              </a>
            )}
            <a
              className="btn btn--siren-outline"
              href={publicUrl('siren/constitution.pdf')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our constitution (PDF)
            </a>
          </div>
        </div>
      </header>

      <main className="page-main page-main--wide">
        <section className="content-section">
          <h2>Mission</h2>
          <ul className="mission-list">
            {siren.mission.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>

        {(siren.joinUrl || siren.socialLinks?.length > 0) && (
          <section className="content-section">
            <h2>Connect</h2>
            <ul className="link-list">
              {siren.joinUrl && (
                <li key="join">
                  <a href={siren.joinUrl} target="_blank" rel="noopener noreferrer">
                    Join the club (MyPNW Life)
                  </a>
                </li>
              )}
              {siren.socialLinks?.filter(l => l.url).map((link) => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="content-section">
          <h2>Events</h2>
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

          {siren.plannedEventTerms?.length > 0 && (
            <div className="siren-planned-events">
              <h3 className="siren-planned-events__heading">Planned program</h3>
              <p className="siren-planned-events__note muted">
                Highlights we’re working toward for the academic year ahead; details and timing may change.
              </p>
              {siren.plannedEventTerms.map((term) => (
                <div key={term.term} className="siren-planned-term">
                  <h4 className="siren-planned-term__label">{term.term}</h4>
                  <ul className="event-cards">
                    {term.events.map((ev, i) => (
                      <li
                        key={`${term.term}-${i}-${ev.title}`}
                        className="event-card event-card--planned"
                      >
                        <h3>{ev.title}</h3>
                        {ev.paragraphs?.map((para, j) => (
                          <p key={j} className="event-card__para">{para}</p>
                        ))}
                        {ev.route && (
                          <Link to={ev.route} className="inline-link">Learn more</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
