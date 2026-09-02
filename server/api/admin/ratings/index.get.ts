/**
 * GET /api/admin/ratings
 * List all user ratings and comments with pagination and statistics. Admin only.
 * Query: ?limit=50 ?offset=0 ?stars=1..5
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 50, 100)
  const offset = Number(query.offset) || 0
  const starsFilter = query.stars ? Number(query.stars) : null

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  let rows
  if (starsFilter && starsFilter >= 1 && starsFilter <= 5) {
    rows = await db.prepare(
      `SELECT * FROM ratings WHERE stars = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    ).bind(starsFilter, limit, offset).all()
  } else {
    rows = await db.prepare(
      `SELECT * FROM ratings ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    ).bind(limit, offset).all()
  }

  const [statsRaw, breakdownRaw] = await Promise.all([
    db.prepare(
      `SELECT AVG(stars) as avg_stars, COUNT(*) as total FROM ratings`,
    ).first(),
    db.prepare(
      `SELECT stars, COUNT(*) as count FROM ratings GROUP BY stars ORDER BY stars DESC`,
    ).all(),
  ])

  const stats = statsRaw as { avg_stars: number | null; total: number } | null

  return {
    ok: true,
    ratings: rows.results ?? [],
    stats: {
      avgStars: stats?.avg_stars ? Math.round(stats.avg_stars * 10) / 10 : null,
      total: stats?.total ?? 0,
    },
    breakdown: breakdownRaw.results ?? [],
  }
})
