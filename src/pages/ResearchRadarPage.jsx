import { useState, useEffect } from 'react'
import professorData from '../data/colleges/index.js'
import { FACULTY_EXPLORER_TITLE } from '../siteMeta.js'

const synonymMap = {
  'ai': ['machine learning', 'artificial intelligence', 'deep learning', 'neural networks', 'data mining'],
  'ml': ['machine learning', 'artificial intelligence', 'deep learning', 'neural networks', 'data mining'],
  'vr': ['virtual reality', 'augmented reality', 'mixed reality'],
  'ar': ['virtual reality', 'augmented reality', 'mixed reality'],
  'cyber': ['cybersecurity', 'network security', 'information security'],
  'bio': ['biology', 'biological', 'anatomy', 'physiology', 'ecology'],
  'med': ['clinical', 'medical', 'human health'],
  'health': ['clinical', 'medical', 'human health'],
  'physics': ['boson', 'particle', 'lhc']
}

const getExpandedSearchTerms = (query) => {
  if (!query.trim()) return ['']
  const normalizedQuery = query.toLowerCase().trim()
  const terms = [normalizedQuery]

  if (synonymMap[normalizedQuery]) {
    terms.push(...synonymMap[normalizedQuery])
  }

  const words = normalizedQuery.split(/\s+/)
  words.forEach(word => {
    if (synonymMap[word]) {
      terms.push(...synonymMap[word])
    }
  })

  return [...new Set(terms)]
}

const VISIBLE_RESEARCH_TAGS = 3

const getDesignations = (prof) => {
  if (Array.isArray(prof.designation)) return prof.designation.filter(Boolean)
  if (typeof prof.title === 'string' && prof.title.trim()) return [prof.title.trim()]
  return []
}

export default function ResearchRadarPage() {
  const [activeCollege, setActiveCollege] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [colleges, setColleges] = useState([])
  const [selectedProfessor, setSelectedProfessor] = useState(null)

  useEffect(() => {
    const uniqueColleges = ['All', ...new Set(professorData.map(p => p.college))]
    setColleges(uniqueColleges)
  }, [])

  const filteredProfessors = professorData.filter(prof => {
    const matchesCollege = activeCollege === 'All' || prof.college === activeCollege

    const searchTerms = getExpandedSearchTerms(searchQuery)

    const matchesSearch = searchTerms.some(term =>
      prof.name.toLowerCase().includes(term) ||
      prof.ongoing_research.some(ongoing => ongoing.toLowerCase().includes(term))
    )

    return matchesCollege && matchesSearch
  })

  const hasActiveFilters = activeCollege !== 'All' || searchQuery.trim().length > 0

  const clearAllFilters = () => {
    setSearchQuery('')
    setActiveCollege('All')
  }

  useEffect(() => {
    if (!selectedProfessor) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProfessor(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedProfessor])

  return (
    <>
      <header className="page-hero page-hero--home">
        <div className="page-hero__content page-hero__content--wide">
          <p className="page-hero__eyebrow">Faculty discovery</p>
          <h1 className="page-hero__title">{FACULTY_EXPLORER_TITLE}</h1>
          <p className="page-hero__tagline page-hero__tagline--home">
            Search by professor or topic to discover research across Purdue University Northwest colleges and
            departments.
          </p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by professor or research topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search faculty by name or research topic"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                x
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="page-main page-main--wide">
        <section className="content-section content-section--tight">
          <nav className="college-nav" aria-label="Filter by college">
            <ul>
              {colleges.map(college => (
                <li key={college}>
                  <button
                    className={activeCollege === college ? 'active' : ''}
                    onClick={() => setActiveCollege(college)}
                    aria-pressed={activeCollege === college}
                  >
                    {college}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <section className="results-summary" aria-live="polite">
            <p>
              Showing {filteredProfessors.length} faculty
              {activeCollege !== 'All' && ` in ${activeCollege}`}
              {searchQuery && ` matching "${searchQuery}"`}.
            </p>
            {hasActiveFilters && (
              <button type="button" className="results-reset" onClick={clearAllFilters}>
                Reset filters
              </button>
            )}
          </section>
        </section>

        <section className="content-section">
          <div className="professor-grid">
            {filteredProfessors.map((prof) => {
              const designations = getDesignations(prof)
              return (
                <div className="professor-card" key={prof.email || `${prof.name}-${prof.department}-${prof.college}`}>
                  <div className="card-header">
                    <h3>{prof.name}</h3>
                    {designations.length > 0 && <div className="title">{designations.join(' / ')}</div>}
                  </div>
                  <div className="card-body">
                    <h4>Ongoing Research</h4>
                    <div className="ongoing-tags">
                      {prof.ongoing_research.slice(0, VISIBLE_RESEARCH_TAGS).map((ongoing, i) => (
                        <span className="tag" key={i}>{ongoing}</span>
                      ))}
                      {prof.ongoing_research.length > VISIBLE_RESEARCH_TAGS && (
                        <span className="tag tag--more">
                          +{prof.ongoing_research.length - VISIBLE_RESEARCH_TAGS} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="card-actions">
                    <button
                      type="button"
                      className="contact-toggle"
                      onClick={() => setSelectedProfessor(prof)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        {filteredProfessors.length === 0 && (
          <section className="empty-state" aria-live="polite">
            <h2>No matching faculty found</h2>
            <p>Try another topic or reset filters to view all faculty.</p>
            <button type="button" className="results-reset" onClick={clearAllFilters}>
              Show all faculty
            </button>
          </section>
        )}
      </main>
      {selectedProfessor && (
        <div
          className="prof-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedProfessor(null)}
        >
          <section
            className="prof-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Professor details for ${selectedProfessor.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            {(() => {
              const hasLinkedIn = !!selectedProfessor.linkedin?.trim()
              const hasScholar = !!selectedProfessor.google_scholar?.trim()
              const hasPnw = !!selectedProfessor.pnw_link?.trim()
              const hasOther = !!selectedProfessor.other_link?.trim()
              const hasAnyProfile = hasLinkedIn || hasScholar || hasPnw || hasOther

              return (
                <>
                  <button
                    type="button"
                    className="prof-modal__close"
                    onClick={() => setSelectedProfessor(null)}
                    aria-label="Close details"
                  >
                    ×
                  </button>
                  <h3 className="prof-modal__name">{selectedProfessor.name}</h3>
                  {getDesignations(selectedProfessor).length > 0 && (
                    <p className="prof-modal__title">{getDesignations(selectedProfessor).join(' / ')}</p>
                  )}
                  <div className="prof-modal__section">
                    <h4 className="prof-modal__section-title">Ongoing Research</h4>
                    <div className="ongoing-tags">
                      {selectedProfessor.ongoing_research.map((ongoing, i) => (
                        <span className="tag" key={`${ongoing}-${i}`}>{ongoing}</span>
                      ))}
                    </div>
                  </div>
                  <div className="contact-info">
                    {selectedProfessor.email && (
                      <p className="contact-row">
                        <span className="contact-label">Email</span>
                        <a href={`mailto:${selectedProfessor.email}`} className="contact-link">{selectedProfessor.email}</a>
                      </p>
                    )}
                    {selectedProfessor.phone && (
                      <p className="contact-row">
                        <span className="contact-label">Phone</span>
                        <span>{selectedProfessor.phone}</span>
                      </p>
                    )}
                    {selectedProfessor.room_number && (
                      <p className="contact-row">
                        <span className="contact-label">Room</span>
                        <span>{selectedProfessor.room_number}</span>
                      </p>
                    )}
                  </div>
                  <div className="profile-links" aria-label="External profile links">
                    {hasLinkedIn && (
                      <a
                        href={selectedProfessor.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="profile-link profile-link--linkedin"
                        aria-label="LinkedIn profile"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M6.94 8.5a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM4.9 9.95h4.08V19.5H4.9V9.95Zm6.59 0h3.91v1.3h.06c.55-1.03 1.88-2.11 3.86-2.11 4.13 0 4.89 2.72 4.89 6.26v4.1h-4.07v-3.63c0-.87-.02-1.98-1.2-1.98-1.2 0-1.39.94-1.39 1.92v3.69h-4.06V9.95Z" />
                        </svg>
                      </a>
                    )}
                    {hasScholar && (
                      <a
                        href={selectedProfessor.google_scholar}
                        target="_blank"
                        rel="noreferrer"
                        className="profile-link profile-link--scholar"
                        aria-label="Google Scholar profile"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-7 9.86V15c0 2.76 3.13 5 7 5s7-2.24 7-5v-2.14l-7 3.82-7-3.82Z" />
                        </svg>
                      </a>
                    )}
                    {hasPnw && (
                      <a
                        href={selectedProfessor.pnw_link}
                        target="_blank"
                        rel="noreferrer"
                        className="profile-link profile-link--pnw"
                        aria-label="PNW profile page"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M12 3 3 7.5V9h18V7.5L12 3Zm-7 7v9h14v-9h-2v7h-3v-4H10v4H7v-7H5Z" />
                        </svg>
                      </a>
                    )}
                    {hasOther && (
                      <a
                        href={selectedProfessor.other_link}
                        target="_blank"
                        rel="noreferrer"
                        className="profile-link profile-link--other"
                        aria-label="Other external link"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm6.93 9h-3.06a15.9 15.9 0 0 0-1.04-5.05A8.03 8.03 0 0 1 18.93 11ZM12 4.06c.8 1.18 1.69 3.36 1.9 6.94h-3.8c.21-3.58 1.1-5.76 1.9-6.94ZM9.17 5.95A15.9 15.9 0 0 0 8.13 11H5.07a8.03 8.03 0 0 1 4.1-5.05ZM4.26 13h3.87c.11 1.93.45 3.72 1.04 5.05A8.03 8.03 0 0 1 4.26 13ZM12 19.94c-.8-1.18-1.69-3.36-1.9-6.94h3.8c-.21 3.58-1.1 5.76-1.9 6.94ZM14.83 18.05c.59-1.33.93-3.12 1.04-5.05h3.87a8.03 8.03 0 0 1-4.91 5.05Z" />
                        </svg>
                      </a>
                    )}
                    {!hasAnyProfile && <span className="profile-links__empty">No external links yet</span>}
                  </div>
                </>
              )
            })()}
          </section>
        </div>
      )}
    </>
  )
}
