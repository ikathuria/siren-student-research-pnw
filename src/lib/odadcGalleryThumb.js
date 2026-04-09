/** Browser-playable gallery video paths (tile + lightbox use <video>). */
export function odadcGalleryItemIsVideo(gallerySrc) {
  const s = typeof gallerySrc === 'string' ? gallerySrc.trim() : ''
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(s)
}

/**
 * Path to a pre-generated JPEG thumbnail under public/ (max ~480px wide).
 * e.g. odadc/2026/a/photo.jpeg → odadc/2026/thumbs/a/photo.jpg
 * Run `npm run gallery-thumbs` after adding gallery files. If the thumb is missing, the UI loads the full image.
 */
export function odadcGalleryThumbPath(gallerySrc) {
  const s = typeof gallerySrc === 'string' ? gallerySrc.trim() : ''
  const m = s.match(/^(odadc\/\d{4})\/(.+)$/)
  if (!m) return null
  const rest = m[2]
  const dot = rest.lastIndexOf('.')
  const withoutExt = dot > 0 ? rest.slice(0, dot) : rest
  return `${m[1]}/thumbs/${withoutExt}.jpg`
}
