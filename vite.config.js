import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages project URL — keep in sync with repo name / Pages settings. */
const BASE = '/siren-student-research-pnw/'

/** Prefix favicon path with Vite `base` for GitHub Pages subpath deploys. */
function htmlFaviconBase() {
  return {
    name: 'html-favicon-base',
    transformIndexHtml(html) {
      const root = BASE.replace(/\/$/, '') || ''
      const href = root ? `${root}/siren/logo.png` : '/siren/logo.png'
      return html.replace(/href="\/siren\/logo\.png"/, `href="${href}"`)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), htmlFaviconBase()],
  base: BASE,
})
