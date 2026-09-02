/**
 * GET /api/ratings
 * Public — returns aggregate stats + latest 20 comments.
 */

export default defineEventHandler(async (event) => {
  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const query = getQuery(event)
  const uid = typeof query.uid === 'string' && query.uid.trim() ? query.uid.trim() : null

  const [statsRaw, breakdownRaw, recents, userRatingRaw] = await Promise.all([
    // Average & total count
    db.prepare(
      `SELECT AVG(stars) as avg_stars, COUNT(*) as total FROM ratings`,
    ).first(),

    // Count per star level (1–5)
    db.prepare(
      `SELECT stars, COUNT(*) as count FROM ratings GROUP BY stars ORDER BY stars DESC`,
    ).all(),

    // Latest 20 comments (non-null)
    db.prepare(
      `SELECT stars, comment, display_name, photo_url, created_at FROM ratings
       WHERE comment IS NOT NULL AND trim(comment) != ''
       ORDER BY created_at DESC LIMIT 20`,
    ).all(),

    // Current user rating (if requested)
    uid
      ? db.prepare(
          `SELECT stars, comment, created_at, updated_at FROM ratings WHERE uid = ?`,
        ).bind(uid).first()
      : Promise.resolve(null),
  ])

  const stats = statsRaw as { avg_stars: number | null; total: number } | null

  return {
    ok: true,
    avgStars: stats?.avg_stars ? Math.round(stats.avg_stars * 10) / 10 : null,
    total: stats?.total ?? 0,
    breakdown: breakdownRaw.results ?? [],
    comments: recents.results ?? [],
    myRating: userRatingRaw ?? null,
  }
})

