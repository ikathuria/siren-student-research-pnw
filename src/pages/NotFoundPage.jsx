import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="page">
      <main className="page-main page-main--wide content-section">
        <h1>Page not found</h1>
        <p>That route does not exist.</p>
        <p><Link to="/" className="inline-link">Go home</Link></p>
      </main>
    </div>
  )
}
