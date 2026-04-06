/** Resolve a path under Vite `public/` for use in href and src (respects base URL). */
export function publicUrl(path) {
  const base = import.meta.env.BASE_URL
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${base}${clean}`
}
