/**
 * GitHub Pages serves 404.html for unknown paths. Copy the built SPA shell so
 * direct loads like /siren-student-research-pnw/odadc work after client routing.
 */
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const dist = join(root, 'dist')
const indexHtml = join(dist, 'index.html')
const notFoundHtml = join(dist, '404.html')

if (!existsSync(indexHtml)) {
  console.error('copy-index-to-404: dist/index.html missing — run vite build first')
  process.exit(1)
}
copyFileSync(indexHtml, notFoundHtml)
console.log('copy-index-to-404: wrote dist/404.html')
