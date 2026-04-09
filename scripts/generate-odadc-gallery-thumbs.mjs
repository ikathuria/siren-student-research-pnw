/**
 * Resize ODADC gallery images into public/.../thumbs/ (max width 480px, JPEG).
 * Run from repo root: npm run gallery-thumbs
 */
import { mkdirSync, readFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const MAX_W = 480
const JPEG_Q = 82

const years = ['2025', '2026']

function loadGallery(year) {
  const p = join(root, 'src', 'data', 'odadc', `${year}.json`)
  if (!existsSync(p)) return []
  const data = JSON.parse(readFileSync(p, 'utf8'))
  return Array.isArray(data.gallery) ? data.gallery : []
}

function thumbRelFromGalleryRel(rel) {
  const m = rel.match(/^(odadc\/\d{4})\/(.+)$/)
  if (!m) return null
  const rest = m[2]
  const dot = rest.lastIndexOf('.')
  const withoutExt = dot > 0 ? rest.slice(0, dot) : rest
  return `${m[1]}/thumbs/${withoutExt}.jpg`
}

async function processFile(rel) {
  if (!/\.(jpe?g|png|webp|gif)$/i.test(rel)) return
  const inputPath = join(root, 'public', ...rel.split('/'))
  if (!existsSync(inputPath)) {
    console.warn(`skip (missing): ${rel}`)
    return
  }
  const thumbRel = thumbRelFromGalleryRel(rel)
  if (!thumbRel) return
  const outPath = join(root, 'public', ...thumbRel.split('/'))
  mkdirSync(dirname(outPath), { recursive: true })

  // .rotate() with no angle applies EXIF Orientation so thumbnails match how
  // browsers show phone photos (otherwise pixels stay sideways / upside down).
  await sharp(inputPath)
    .rotate()
    .resize({ width: MAX_W, withoutEnlargement: true })
    .jpeg({ quality: JPEG_Q, mozjpeg: true })
    .toFile(outPath)
  console.log(`ok ${rel} → ${thumbRel}`)
}

const seen = new Set()
for (const year of years) {
  for (const rel of loadGallery(year)) {
    const s = typeof rel === 'string' ? rel.trim() : ''
    if (!s || seen.has(s)) continue
    seen.add(s)
    await processFile(s)
  }
}

console.log('done')
