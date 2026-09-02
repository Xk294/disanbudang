/**
 * POST /api/ratings
 * Submit a star rating + optional comment.
 * Requires Google Auth (Firebase ID token) — one review per Google account (upsert).
 * Body: { stars: 1-5, comment?: string, idToken: string }
 */
import { verifyFirebaseToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // 1. Origin check in production
  if (!import.meta.dev) {
    const origin = getHeader(event, 'origin') ?? ''
    const isAllowedOrigin =
      origin === 'https://disanbudang.com' ||
      origin === 'https://www.disanbudang.com' ||
      origin.endsWith('.disanbudang.pages.dev') ||
      origin.endsWith('.pages.dev')
    if (!isAllowedOrigin) {
      throw createError({ statusCode: 403, statusMessage: 'Invalid request origin' })
    }
  }

  const body = await readBody(event)
  const { stars, comment, idToken } = body ?? {}

  // 2. Require Google Auth token
  if (!idToken || typeof idToken !== 'string') {
    throw createError({ statusCode: 401, statusMessage: 'Vui lòng đăng nhập Google để gửi đánh giá' })
  }

  let claims
  try {
    claims = await verifyFirebaseToken(idToken)
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn' })
  }

  const uid = claims.uid
  const email = claims.email ?? null
  const displayName = claims.name ?? null
  const photoUrl = claims.picture ?? null

  // 3. Client IP for audit
  const ip =
    getHeader(event, 'cf-connecting-ip') ??
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0'

  // 4. Validate stars (optional: 1-5, or null if only commenting)
  let sanitizedStars: number | null = null
  if (stars !== undefined && stars !== null && stars !== 0 && stars !== '') {
    const starsNum = Number(stars)
    if (!Number.isInteger(starsNum) || starsNum < 1 || starsNum > 5) {
      throw createError({ statusCode: 400, statusMessage: 'Số sao đánh giá phải từ 1 đến 5' })
    }
    sanitizedStars = starsNum
  }

  // 5. Validate comment (optional: max 500 chars)
  let sanitizedComment: string | null = null
  if (comment && typeof comment === 'string') {
    const trimmed = comment.trim()
    if (trimmed.length > 500) {
      throw createError({ statusCode: 400, statusMessage: 'Nhận xét không được vượt quá 500 ký tự' })
    }
    sanitizedComment = trimmed || null
  }

  // Must provide at least one: stars or comment
  if (sanitizedStars === null && !sanitizedComment) {
    throw createError({ statusCode: 400, statusMessage: 'Vui lòng chọn số sao hoặc nhập nhận xét góp ý' })
  }

  // 6. DB operations
  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  try {
    // 6a. Sync user profile into users table
    const provider = claims.firebase?.sign_in_provider ?? 'google.com'
    await db.prepare(`
      INSERT INTO users (uid, email, display_name, photo_url, email_verified, provider, last_seen_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(uid) DO UPDATE SET
        email          = excluded.email,
        display_name   = COALESCE(excluded.display_name, users.display_name),
        photo_url      = COALESCE(excluded.photo_url, users.photo_url),
        email_verified = excluded.email_verified,
        last_seen_at   = CURRENT_TIMESTAMP
    `).bind(uid, email, displayName, photoUrl, claims.email_verified ? 1 : 0, provider).run()

    // 6b. Upsert review (1 per Google UID)
    await db.prepare(`
      INSERT INTO ratings (uid, email, display_name, photo_url, ip, stars, comment, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT(uid) DO UPDATE SET
        stars        = excluded.stars,
        comment      = excluded.comment,
        ip           = excluded.ip,
        display_name = COALESCE(excluded.display_name, ratings.display_name),
        photo_url    = COALESCE(excluded.photo_url, ratings.photo_url),
        email        = COALESCE(excluded.email, ratings.email),
        updated_at   = CURRENT_TIMESTAMP
    `).bind(uid, email, displayName, photoUrl, ip, sanitizedStars, sanitizedComment).run()
  } catch (err: unknown) {
    console.error('[ratings.post] DB error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Không thể lưu đánh giá vào hệ thống' })
  }

  return { ok: true }
})

