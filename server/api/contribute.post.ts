import { randomUUID } from 'uncrypto'
import { requireClient } from '../utils/turnstile'

const VALID_TYPES = ['story', 'photo', 'document', 'memory', 'artwork', 'research'] as const
const VALID_ROLES = ['resident', 'student', 'teacher', 'visitor', 'other'] as const
// Heritage IDs sourced from app/data/heritages.ts — update when new heritages are added
const VALID_HERITAGE_IDS = new Set([
  'hrt-001', 'hrt-002', 'hrt-003', 'hrt-004', 'hrt-005', 'hrt-006', 'hrt-007', 'hrt-008',
  'hrt-009', 'hrt-010', 'hrt-011', 'hrt-012', 'hrt-013', 'hrt-014', 'hrt-015', 'hrt-016',
])

// Max submissions per IP within a sliding 1-hour window
const RATE_LIMIT_PER_HOUR = 5

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {
    type,
    authorName,
    authorRole,
    title,
    content,
    heritageId,
    filesData,
    turnstileToken,
    _hp,
  } = body ?? {}

  // Honeypot check: If bot filled the invisible field, return fake success without storing
  if (_hp) {
    return {
      ok: true,
      id: randomUUID(),
      message: 'Đóng góp của bạn đã được ghi nhận và đang chờ duyệt.',
    }
  }

  // 1. Client guard: Origin check + Turnstile verification
  const { ip } = await requireClient(event, turnstileToken)

  // 2. Input validation
  if (!type || !VALID_TYPES.includes(type)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid contribution type' })
  }
  if (!authorName || typeof authorName !== 'string' || !authorName.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Author name is required' })
  }
  if (authorName.trim().length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Author name must be 100 characters or fewer' })
  }
  if (!title || typeof title !== 'string' || title.trim().length < 5 || title.trim().length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'Title must be 5–200 characters' })
  }
  if (!content || typeof content !== 'string' || content.trim().length < 20 || content.trim().length > 10000) {
    throw createError({ statusCode: 400, statusMessage: 'Content must be 20–10,000 characters' })
  }

  // Sanitize role — coerce unknown values to 'other' rather than storing arbitrary strings
  const sanitizedRole: string = VALID_ROLES.includes(authorRole) ? authorRole : 'other'

  // Validate heritageId if provided — only accept known IDs, never store arbitrary strings
  const sanitizedHeritageId: string | null =
    heritageId && VALID_HERITAGE_IDS.has(heritageId) ? heritageId : null

  // 3. Database operations
  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  // Rate limit: max RATE_LIMIT_PER_HOUR submissions per IP per hour
  const recentCount = (await db
    .prepare(
      `SELECT COUNT(*) as c FROM contributions
       WHERE ip = ? AND created_at > datetime('now', '-1 hour')`,
    )
    .bind(ip)
    .first()) as { c: number } | null
  if ((recentCount?.c ?? 0) >= RATE_LIMIT_PER_HOUR) {
    throw createError({
      statusCode: 429,
      statusMessage: `Quá nhiều đóng góp. Vui lòng thử lại sau 1 giờ.`,
    })
  }

  const id = randomUUID()
  const stringifiedFilesData = filesData ? JSON.stringify(filesData) : null

  try {
    await db.prepare(
      `INSERT INTO contributions
         (id, type, author_name, author_role, title, content, heritage_id, files_data, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      id,
      type,
      authorName.trim(),
      sanitizedRole,
      title.trim(),
      content.trim(),
      sanitizedHeritageId,
      stringifiedFilesData,
      ip,
    ).run()
  } catch (err) {
    console.error('[contribute.post] DB error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Failed to save contribution' })
  }

  return {
    ok: true,
    id,
    message: 'Đóng góp của bạn đã được ghi nhận và đang chờ duyệt.',
  }
})

