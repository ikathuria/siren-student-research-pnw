import { useState, useEffect } from 'react'
import professorData from '../data/colleges/index.js'

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

export default function Home() {
  const [activeCollege, setActiveCollege] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [colleges, setColleges] = useState([])

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

  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1>PNW Research Radar</h1>
          <p>Discover the cutting-edge research happening at Purdue University Northwest.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by professor or research topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="main-content">
        <nav className="college-nav">
          <ul>
            {colleges.map(college => (
              <li key={college}>
                <button
                  className={activeCollege === college ? 'active' : ''}
                  onClick={() => setActiveCollege(college)}
                >
                  {college}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="professor-grid">
          {filteredProfessors.map((prof, index) => (
            <div className="professor-card" key={index}>
              <div className="card-header">
                <h3>{prof.name}</h3>
                {prof.title && <div className="title" style={{ fontStyle: 'italic', marginBottom: '4px', color: 'var(--text-light)', fontSize: '0.9rem' }}>{prof.title}</div>}
                <span className="department">{prof.department}</span>
              </div>
              <div className="card-body">
                {(prof.email || prof.phone || prof.room_number) && (
                  <div className="contact-info">
                    {prof.email && <p><strong>Email:</strong> <a href={`mailto:${prof.email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{prof.email}</a></p>}
                    {prof.phone && <p><strong>Phone:</strong> {prof.phone}</p>}
                    {prof.room_number && <p><strong>Room:</strong> {prof.room_number}</p>}
                  </div>
                )}
                <h4>Ongoing Research</h4>
                <div className="ongoing-tags">
                  {prof.ongoing_research.map((ongoing, i) => (
                    <span className="tag" key={i}>{ongoing}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
