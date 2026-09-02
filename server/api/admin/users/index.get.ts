/**
 * GET /api/admin/users
 * List registered users synced from Firebase Auth. Admin only.
 * Query: ?limit=50 ?offset=0 ?search=...
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 50, 100)
  const offset = Number(query.offset) || 0
  const search = typeof query.search === 'string' ? query.search.trim() : ''

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const conditions: string[] = []
  const bindings: unknown[] = []

  if (search) {
    conditions.push('(email LIKE ? OR display_name LIKE ? OR provider LIKE ?)')
    const pattern = `%${search}%`
    bindings.push(pattern, pattern, pattern)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const [rowsRes, filteredCountRes, statsRaw] = await Promise.all([
    // 1. Paginated users
    db.prepare(`
      SELECT uid, email, display_name, photo_url, email_verified, provider, created_at, last_seen_at
      FROM users
      ${whereClause}
      ORDER BY last_seen_at DESC
      LIMIT ? OFFSET ?
    `).bind(...bindings, limit, offset).all(),

    // 2. Filtered count
    db.prepare(`
      SELECT COUNT(*) as total FROM users
      ${whereClause}
    `).bind(...bindings).first(),

    // 3. Overall stats
    db.prepare(`
      SELECT
        COUNT(*) as total_users,
        SUM(CASE WHEN provider = 'google.com' THEN 1 ELSE 0 END) as google_users,
        COUNT(CASE WHEN last_seen_at >= datetime('now', '-7 days') THEN 1 END) as active_7days
      FROM users
    `).first(),
  ])

  const stats = statsRaw as { total_users: number | null; google_users: number | null; active_7days: number | null } | null
  const filteredTotal = (filteredCountRes as { total: number } | null)?.total ?? 0

  return {
    ok: true,
    users: rowsRes.results ?? [],
    stats: {
      total_users: stats?.total_users ?? 0,
      google_users: stats?.google_users ?? 0,
      active_7days: stats?.active_7days ?? 0,
    },
    filteredTotal,
    limit,
    offset,
  }
})
