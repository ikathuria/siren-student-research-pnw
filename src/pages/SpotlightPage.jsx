import { Link } from 'react-router-dom'
import { COMMUNITY_CONTACT_EMAIL } from '../siteMeta.js'

const mailtoStudent = `mailto:${COMMUNITY_CONTACT_EMAIL}?subject=${encodeURIComponent('Spotlight — student highlight submission')}`
const mailtoFaculty = `mailto:${COMMUNITY_CONTACT_EMAIL}?subject=${encodeURIComponent('Spotlight — faculty highlight suggestion')}`

export default function SpotlightPage() {
  return (
    <div className="page page--initiative">
      <header className="page-hero page-hero--initiatives">
        <div className="page-hero__content page-hero__content--wide">
          <p className="page-hero__eyebrow">Monthly</p>
          <h1 className="page-hero__title">Spotlight</h1>
          <p className="page-hero__tagline">
            Student and faculty research highlights in one place—publications, projects, competitions, and labs worth
            knowing about.
          </p>
        </div>
      </header>

      <main className="page-main page-main--wide">
        <section className="content-section">
          <h2>This month</h2>
          <p className="prose muted">
            Featured entries will appear here as the program gets underway. For now, use the links below to nominate
            work for the next issue or the SIREN Brief.
          </p>
          <div className="spotlight-placeholder" aria-hidden="true">
            <p>Coming soon</p>
          </div>
        </section>

        <section className="content-section">
          <h2>Student highlights</h2>
          <p className="prose">
            Share papers, posters, hackathons, capstone work, or other wins. Include your program, graduation year, and
            links or attachments if you have them.
          </p>
          <p>
            <a className="btn btn--siren" href={mailtoStudent}>
              Submit a student highlight
            </a>
          </p>
        </section>

        <section className="content-section">
          <h2>Faculty highlights</h2>
          <p className="prose">
            Students and faculty can suggest a researcher or project to feature. A short summary and why it matters to
            undergrads helps us prioritize.
          </p>
          <p>
            <a className="btn btn--siren-outline" href={mailtoFaculty}>
              Suggest a faculty highlight
            </a>
          </p>
          <p className="prose muted">
            For layout inspiration, see how other groups bundle research news—for example{' '}
            <a
              href="https://www.csail.mit.edu/news/"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              CSAIL News
            </a>
            .
          </p>
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
