import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import y2025 from '../data/odadc/2025.json'
import y2026 from '../data/odadc/2026.json'
import { odadcGalleryItemIsVideo, odadcGalleryThumbPath } from '../lib/odadcGalleryThumb.js'
import { publicUrl } from '../lib/publicUrl.js'
import { odadcAwardVariant, sortOdadcProjects } from '../lib/odadcProjectSort.js'

const BY_YEAR = {
  '2025': y2025,
  '2026': y2026
}

const ODADC_PROJECT_PLACEHOLDER = 'odadc/project-placeholder.svg'

function projectScreenshotUrl(screenshot) {
  const s = typeof screenshot === 'string' ? screenshot.trim() : ''
  if (s) return publicUrl(s)
  return publicUrl(ODADC_PROJECT_PLACEHOLDER)
}

function OdadcGalleryTile({ src, onExpand }) {
  const isVideo = odadcGalleryItemIsVideo(src)
  const thumbPath = isVideo ? null : odadcGalleryThumbPath(src)
  const [useFullSize, setUseFullSize] = useState(() => thumbPath == null)
  const imgSrc = useFullSize ? publicUrl(src) : publicUrl(thumbPath)

  if (isVideo) {
    return (
      <button
        type="button"
        className="gallery-item gallery-item--video"
        onClick={() => onExpand(src)}
        aria-label="Play video"
      >
        <span className="gallery-item__inner">
          <video
            className="gallery-item__video"
            src={publicUrl(src)}
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className="gallery-item"
      onClick={() => onExpand(src)}
      aria-label="View larger image"
    >
      <span className="gallery-item__inner">
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onError={() => {
            if (!useFullSize) setUseFullSize(true)
          }}
        />
      </span>
    </button>
  )
}

export default function OdadcYearPage() {
  const { year } = useParams()
  const data = BY_YEAR[year]

  if (!data) {
    return (
      <div className="page page--odadc">
        <main className="page-main page-main--wide content-section">
          <h1>Year not found</h1>
          <p>We do not have an archive page for <strong>{year}</strong> yet.</p>
          <Link to="/odadc" className="inline-link">Back to ODADC</Link>
        </main>
      </div>
    )
  }

  const projects = sortOdadcProjects(data.projects)
  const [openProject, setOpenProject] = useState(null)
  const [galleryLightbox, setGalleryLightbox] = useState(null)
  const closeBtnRef = useRef(null)
  const galleryLightboxCloseRef = useRef(null)

  useEffect(() => {
    if (!openProject) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenProject(null)
    }
    document.addEventListener('keydown', onKey)
    closeBtnRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [openProject])

  useEffect(() => {
    if (!galleryLightbox) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setGalleryLightbox(null)
    }
    document.addEventListener('keydown', onKey)
    galleryLightboxCloseRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [galleryLightbox])

  return (
    <div className="page page--odadc">
      <header className="page-hero page-hero--odadc page-hero--compact">
        <div className="page-hero__content page-hero__content--wide">
          <p className="page-hero__eyebrow">
            <Link to="/odadc" className="page-hero__crumb">ODADC</Link>
            {' · '}
            {data.year}
          </p>
          <h1 className="page-hero__title">{data.title}</h1>
          <p className="page-hero__tagline">{data.description}</p>
        </div>
      </header>

      <main className="page-main page-main--wide">
        <section className="content-section">
          <h2>Projects</h2>
          {!projects.length && (
            <p className="muted">Project listings will appear here as they are added.</p>
          )}
          <ul className="project-tile-grid">
            {projects.map((p, i) => {
              const awardLabel = typeof p.award === 'string' ? p.award.trim() : ''
              const isWinner = awardLabel.length > 0
              const awardVariant = isWinner ? odadcAwardVariant(awardLabel) : null
              const title = p.title || 'Project'
              return (
                <li key={`${title}-${i}`} className="project-tile-item">
                  <button
                    type="button"
                    className={
                      `project-tile${
                        awardVariant ? ` project-tile--winner project-tile--winner-${awardVariant}` : ''
                      }`
                    }
                    onClick={() => setOpenProject(p)}
                    aria-haspopup="dialog"
                    aria-label={`Open details: ${title}`}
                  >
                    <div className="project-tile__media">
                      <img
                        src={projectScreenshotUrl(p.screenshot)}
                        alt=""
                        className={`project-tile__img${p.screenshot?.trim() ? '' : ' project-tile__img--placeholder'}`}
                      />
                      {isWinner && (
                        <span className={`project-tile__award project-tile__award--${awardVariant}`}>
                          {awardLabel}
                        </span>
                      )}
                    </div>
                    <div className="project-tile__meta">
                      <h3 className="project-tile__title">{title}</h3>
                      {p.teamMembers && (
                        <p className="project-tile__team">{p.teamMembers}</p>
                      )}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>

          {openProject && (
            <div
              className="project-modal-backdrop"
              role="presentation"
              onClick={() => setOpenProject(null)}
            >
              <div
                className="project-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="project-modal__close"
                  onClick={() => setOpenProject(null)}
                  aria-label="Close project details"
                >
                  ×
                </button>
                <div className="project-modal__layout">
                  <div className="project-modal__media">
                    <img
                      src={projectScreenshotUrl(openProject.screenshot)}
                      alt=""
                      className={`project-modal__img${openProject.screenshot?.trim() ? '' : ' project-modal__img--placeholder'}`}
                    />
                  </div>
                  <div className="project-modal__body">
                    {typeof openProject.award === 'string' && openProject.award.trim() && (
                      <p
                        className={`project-card__award project-modal__award project-card__award--${odadcAwardVariant(openProject.award.trim())}`}
                      >
                        {openProject.award.trim()}
                      </p>
                    )}
                    <h2 id="project-modal-title" className="project-modal__heading">
                      {openProject.title || 'Project'}
                    </h2>
                    {openProject.teamMembers && (
                      <p className="project-modal__team">{openProject.teamMembers}</p>
                    )}
                    {openProject.description && (
                      <p className="project-modal__desc">{openProject.description}</p>
                    )}
                    <div className="project-card__links project-modal__links">
                      {openProject.repoUrl && (
                        <a
                          href={openProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Repository
                        </a>
                      )}
                      {openProject.demoUrl && (
                        <a
                          href={openProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {data.gallery?.length > 0 && (
          <section className="content-section">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {data.gallery.map((src) => (
                <OdadcGalleryTile key={src} src={src} onExpand={setGalleryLightbox} />
              ))}
            </div>

            {galleryLightbox && (
              <div
                className="gallery-lightbox-backdrop"
                role="presentation"
                onClick={() => setGalleryLightbox(null)}
              >
                <button
                  ref={galleryLightboxCloseRef}
                  type="button"
                  className="gallery-lightbox__close"
                  onClick={() => setGalleryLightbox(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div
                  className="gallery-lightbox__frame"
                  role="presentation"
                  onClick={(e) => e.stopPropagation()}
                >
                  {odadcGalleryItemIsVideo(galleryLightbox) ? (
                    <video
                      key={galleryLightbox}
                      className="gallery-lightbox__video"
                      src={publicUrl(galleryLightbox)}
                      controls
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={publicUrl(galleryLightbox)}
                      alt=""
                      className="gallery-lightbox__img"
                      decoding="async"
                      fetchPriority="high"
                    />
                  )}
                  <a
                    href={publicUrl(galleryLightbox)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gallery-lightbox__open-tab"
                  >
                    {odadcGalleryItemIsVideo(galleryLightbox)
                      ? 'Open video in new tab'
                      : 'Open in new tab'}
                  </a>
                </div>
              </div>
            )}
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
