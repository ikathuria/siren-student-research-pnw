import newsletters from '../data/newsletters.json'
import { publicUrl } from '../lib/publicUrl.js'

export default function NewslettersPage() {
  const issues = newsletters.issues || []

  return (
    <div className="page page--newsletters">
      <header className="page-hero page-hero--newsletters">
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">SIREN</p>
          <h1 className="page-hero__title">The SIREN Brief</h1>
          <p className="page-hero__tagline">{newsletters.intro}</p>
        </div>
      </header>

      <main className="page-main">
        <section className="content-section">
          {issues.length > 0 && (
            <h2>Past issues</h2>
          )}
          {issues.length === 0 && (
            <p className="muted">No issues yet. When you publish a new SIREN Brief, add the file under <code className="inline-code">public/newsletters/</code> and list it in <code className="inline-code">src/data/newsletters.json</code>.</p>
          )}
          {issues.length > 0 && (
            <ul className="newsletter-list">
              {issues.map((issue) => (
                <li key={`${issue.date}-${issue.title}`} className="newsletter-row">
                  <span className="newsletter-row__date">{issue.date}</span>
                  <a
                    href={publicUrl(issue.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="newsletter-row__link"
                  >
                    {issue.title}
                  </a>
                  <span className="newsletter-row__meta">{issue.format === 'html' ? 'HTML' : 'PDF'}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
