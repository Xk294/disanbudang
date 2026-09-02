/**
 * GET /api/admin/ratings
 * List all user ratings and comments with search, pagination, and statistics. Admin only.
 * Query: ?limit=50 ?offset=0 ?stars=1..5 ?search=...
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 50, 100)
  const offset = Number(query.offset) || 0
  const starsFilter = query.stars ? Number(query.stars) : null
  const search = typeof query.search === 'string' ? query.search.trim() : ''

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const conditions: string[] = []
  const bindings: unknown[] = []

  if (starsFilter && starsFilter >= 1 && starsFilter <= 5) {
    conditions.push('stars = ?')
    bindings.push(starsFilter)
  }

  if (search) {
    conditions.push('(comment LIKE ? OR ip LIKE ?)')
    const pattern = `%${search}%`
    bindings.push(pattern, pattern)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const [rowsRes, filteredCountRes, statsRaw, breakdownRaw] = await Promise.all([
    db.prepare(`
      SELECT * FROM ratings
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(...bindings, limit, offset).all(),

    db.prepare(`
      SELECT COUNT(*) as total FROM ratings
      ${whereClause}
    `).bind(...bindings).first(),

    db.prepare(`
      SELECT AVG(stars) as avg_stars, COUNT(*) as total FROM ratings
    `).first(),

    db.prepare(`
      SELECT stars, COUNT(*) as count FROM ratings GROUP BY stars ORDER BY stars DESC
    `).all(),
  ])

  const stats = statsRaw as { avg_stars: number | null; total: number } | null
  const filteredTotal = (filteredCountRes as { total: number } | null)?.total ?? 0

  return {
    ok: true,
    ratings: rowsRes.results ?? [],
    stats: {
      avgStars: stats?.avg_stars ? Math.round(stats.avg_stars * 10) / 10 : null,
      total: stats?.total ?? 0,
    },
    breakdown: breakdownRaw.results ?? [],
    filteredTotal,
    limit,
    offset,
  }
})
