import { Link } from 'react-router-dom'
import odadc from '../data/odadc/index.json'
import { publicUrl } from '../lib/publicUrl.js'

export default function OdadcHubPage() {
  return (
    <div className="page page--odadc">
      <header className="page-hero page-hero--odadc">
        <div className="page-hero__content page-hero__content--wide">
          <p className="page-hero__eyebrow">SIREN · Annual event</p>
          <h1 className="page-hero__title">{odadc.title}</h1>
          <p className="page-hero__lead">{odadc.shortName}</p>
          <p className="page-hero__tagline">{odadc.tagline}</p>
        </div>
      </header>

      <main className="page-main page-main--wide">
        <section className="content-section">
          <p className="prose">{odadc.about}</p>
        </section>

        <section className="content-section">
          <h2>Years</h2>
          <ul className="year-grid">
            {odadc.years.map((y) => (
              <li key={y.year} className="year-card">
                {y.heroImage && (
                  <Link to={`/odadc/${y.year}`} className="year-card__image-wrap">
                    <img
                      src={publicUrl(y.heroImage)}
                      alt=""
                      className="year-card__image"
                    />
                  </Link>
                )}
                <div className="year-card__body">
                  <h3>
                    <Link to={`/odadc/${y.year}`}>{y.title}</Link>
                  </h3>
                  <p>{y.summary}</p>
                  <Link to={`/odadc/${y.year}`} className="inline-link">Open {y.year}</Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
