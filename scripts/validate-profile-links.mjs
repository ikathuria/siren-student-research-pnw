import fs from 'node:fs'
import path from 'node:path'

const collegesDir = path.resolve('src/data/colleges')
const collegeFiles = fs.readdirSync(collegesDir).filter((file) => file.endsWith('.json')).sort()

const profileFields = ['linkedin', 'google_scholar', 'pnw_link', 'other_link']
const issues = []

const isHttpUrl = (value) => {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

for (const file of collegeFiles) {
  const fullPath = path.join(collegesDir, file)
  const records = JSON.parse(fs.readFileSync(fullPath, 'utf8'))

  records.forEach((prof, index) => {
    profileFields.forEach((field) => {
      if (!(field in prof)) {
        issues.push({
          file,
          professor: prof.name || `record #${index + 1}`,
          field,
          problem: 'missing field',
        })
        return
      }

      const value = prof[field]
      if (typeof value !== 'string') {
        issues.push({
          file,
          professor: prof.name || `record #${index + 1}`,
          field,
          problem: 'must be a string',
        })
        return
      }

      const trimmed = value.trim()
      if (!trimmed) return

      if (!isHttpUrl(trimmed)) {
        issues.push({
          file,
          professor: prof.name || `record #${index + 1}`,
          field,
          problem: 'must be a valid URL starting with http:// or https://',
        })
        return
      }

      if (!trimmed.startsWith('https://')) {
        issues.push({
          file,
          professor: prof.name || `record #${index + 1}`,
          field,
          problem: 'should use https://',
        })
      }
    })
  })
}

if (issues.length > 0) {
  console.error(`Found ${issues.length} profile link issue(s):`)
  issues.forEach((issue) => {
    console.error(
      `- ${issue.file} :: ${issue.professor} :: ${issue.field} -> ${issue.problem}`,
    )
  })
  process.exit(1)
}

console.log(
  `Profile links look good across ${collegeFiles.length} college data file(s).`,
)
