import { Link, useParams } from 'react-router-dom'
import y2025 from '../data/odadc/2025.json'
import y2026 from '../data/odadc/2026.json'
import { publicUrl } from '../lib/publicUrl.js'

const BY_YEAR = {
  '2025': y2025,
  '2026': y2026
}

export default function OdadcYearPage() {
  const { year } = useParams()
  const data = BY_YEAR[year]

  if (!data) {
    return (
      <div className="page page--odadc">
        <main className="page-main content-section">
          <h1>Year not found</h1>
          <p>We do not have an archive page for <strong>{year}</strong> yet.</p>
          <Link to="/odadc" className="inline-link">Back to ODADC</Link>
        </main>
      </div>
    )
  }

  return (
    <div className="page page--odadc">
      <header className="page-hero page-hero--odadc page-hero--compact">
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">
            <Link to="/odadc" className="page-hero__crumb">ODADC</Link>
            {' · '}
            {data.year}
          </p>
          <h1 className="page-hero__title">{data.title}</h1>
          <p className="page-hero__tagline">{data.description}</p>
        </div>
      </header>

      <main className="page-main">
        <section className="content-section">
          <h2>Projects</h2>
          {!data.projects?.length && (
            <p className="muted">Project listings will appear here as they are added.</p>
          )}
          <ul className="project-grid">
            {data.projects?.map((p, i) => (
              <li key={`${p.title || 'project'}-${i}`} className="project-card">
                {p.screenshot && (
                  <img src={publicUrl(p.screenshot)} alt="" className="project-card__shot" />
                )}
                <div className="project-card__body">
                  {p.title && <h3>{p.title}</h3>}
                  {p.teamMembers && <p className="project-card__team">{p.teamMembers}</p>}
                  <p>{p.description}</p>
                  <div className="project-card__links">
                    {p.repoUrl && (
                      <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">Repository</a>
                    )}
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">Demo</a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {data.gallery?.length > 0 && (
          <section className="content-section">
            <h2>Photos and artwork</h2>
            <div className="gallery-grid">
              {data.gallery.map((src) => (
                <a
                  key={src}
                  href={publicUrl(src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-item"
                >
                  <img src={publicUrl(src)} alt="" loading="lazy" />
                </a>
              ))}
            </div>
          </section>
        )}

        {data.resources?.length > 0 && (
          <section className="content-section">
            <h2>Resources</h2>
            <ul className="resource-list">
              {data.resources.map((r) => (
                <li key={r.file}>
                  <a
                    href={publicUrl(r.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    {r.label}
                  </a>
                  <span className="resource-meta">PDF</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(data.kickoffVideoUrl || data.kickoffNote) && (
          <section className="content-section">
            <h2>Kickoff</h2>
            {data.kickoffVideoUrl && (
              <p>
                <a href={data.kickoffVideoUrl} target="_blank" rel="noopener noreferrer" className="inline-link">
                  Watch kickoff video
                </a>
              </p>
            )}
            {data.kickoffNote && <p className="prose muted">{data.kickoffNote}</p>}
          </section>
        )}

        <p className="page-back">
          <Link to="/odadc" className="inline-link">← All ODADC years</Link>
        </p>
      </main>
    </div>
  )
}
