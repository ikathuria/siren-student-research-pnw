/**
 * ODADC winner labels (2026+). Set `award` on a project in the year JSON to match exactly
 * for consistent ordering; other non-empty strings still count as winners and sort after these.
 */
export const ODADC_AWARD_SORT_ORDER = [
  'Overall winner',
  'Best AI & automation app',
  'Best social good app',
  'Most creative app',
]

/**
 * Maps canonical (or custom) award labels to UI color variants on the ODADC showcase.
 * @param {string | undefined} awardLabel
 * @returns {'overall' | 'ai' | 'social' | 'creative' | 'extra' | null}
 */
export function odadcAwardVariant(awardLabel) {
  const s = typeof awardLabel === 'string' ? awardLabel.trim() : ''
  if (!s) return null
  const i = ODADC_AWARD_SORT_ORDER.indexOf(s)
  if (i === 0) return 'overall'
  if (i === 1) return 'ai'
  if (i === 2) return 'social'
  if (i === 3) return 'creative'
  return 'extra'
}

/**
 * Winners first (in award order), then other projects in their original JSON order.
 * @param {Array<{ award?: string }>} projects
 */
export function sortOdadcProjects(projects) {
  if (!projects?.length) return []
  return projects
    .map((p, originalIndex) => ({ p, originalIndex }))
    .sort((a, b) => {
      const labelA = typeof a.p.award === 'string' ? a.p.award.trim() : ''
      const labelB = typeof b.p.award === 'string' ? b.p.award.trim() : ''
      const winA = labelA.length > 0
      const winB = labelB.length > 0
      if (winA !== winB) return winA ? -1 : 1
      if (!winA) return a.originalIndex - b.originalIndex
      const iA = ODADC_AWARD_SORT_ORDER.indexOf(labelA)
      const iB = ODADC_AWARD_SORT_ORDER.indexOf(labelB)
      const oA = iA >= 0 ? iA : ODADC_AWARD_SORT_ORDER.length
      const oB = iB >= 0 ? iB : ODADC_AWARD_SORT_ORDER.length
      if (oA !== oB) return oA - oB
      return a.originalIndex - b.originalIndex
    })
    .map(({ p }) => p)
}
