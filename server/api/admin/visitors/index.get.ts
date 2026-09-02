/**
 * GET /api/admin/visitors
 * List visitor logs with aggregate stats, QR scan tracking, and trend charts. Admin only.
 * Query: ?limit=100 ?offset=0 ?search=... ?timeframe=all|today|7days|30days ?type=all|qr
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 100, 500)
  const offset = Number(query.offset) || 0
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const timeframe = (query.timeframe as string) || 'all'
  const type = (query.type as string) || 'all'

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const conditions: string[] = []
  const bindings: unknown[] = []

  if (type === 'qr') {
    conditions.push("path LIKE '/heritage/qr/%'")
  }

  if (timeframe === 'today') {
    conditions.push("date(last_seen_at) = date('now')")
  } else if (timeframe === '7days') {
    conditions.push("last_seen_at >= datetime('now', '-7 days')")
  } else if (timeframe === '30days') {
    conditions.push("last_seen_at >= datetime('now', '-30 days')")
  }

  if (search) {
    conditions.push('(ip LIKE ? OR path LIKE ? OR email LIKE ? OR display_name LIKE ?)')
    const pattern = `%${search}%`
    bindings.push(pattern, pattern, pattern, pattern)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const [
    rowsRes,
    filteredCountRes,
    statsRaw,
    qrStatsRaw,
    topPathsRes,
    topQrPathsRes,
    dailyChartRes,
  ] = await Promise.all([
    // 1. Paginated records
    db.prepare(`
      SELECT * FROM visitor_logs
      ${whereClause}
      ORDER BY last_seen_at DESC
      LIMIT ? OFFSET ?
    `).bind(...bindings, limit, offset).all(),

    // 2. Filtered count
    db.prepare(`
      SELECT COUNT(*) as total FROM visitor_logs
      ${whereClause}
    `).bind(...bindings).first(),

    // 3. Global visitor stats
    db.prepare(`
      SELECT
        COUNT(DISTINCT ip) as unique_ips,
        SUM(visit_count) as total_visits
      FROM visitor_logs
    `).first(),

    // 4. QR specific stats
    db.prepare(`
      SELECT
        COUNT(DISTINCT ip) as unique_qr_ips,
        SUM(visit_count) as total_qr_scans
      FROM visitor_logs
      WHERE path LIKE '/heritage/qr/%'
    `).first(),

    // 5. Top visited paths overall
    db.prepare(`
      SELECT path, SUM(visit_count) as total
      FROM visitor_logs
      GROUP BY path
      ORDER BY total DESC
      LIMIT 10
    `).all(),

    // 6. Top QR scanned heritage paths
    db.prepare(`
      SELECT path, SUM(visit_count) as total
      FROM visitor_logs
      WHERE path LIKE '/heritage/qr/%'
      GROUP BY path
      ORDER BY total DESC
      LIMIT 10
    `).all(),

    // 7. Last 7 days traffic trend
    db.prepare(`
      SELECT date(last_seen_at) as log_date, SUM(visit_count) as count
      FROM visitor_logs
      WHERE last_seen_at >= datetime('now', '-7 days')
      GROUP BY date(last_seen_at)
      ORDER BY log_date ASC
    `).all(),
  ])

  const stats = statsRaw as { unique_ips: number | null; total_visits: number | null } | null
  const qrStats = qrStatsRaw as { unique_qr_ips: number | null; total_qr_scans: number | null } | null
  const filteredTotal = (filteredCountRes as { total: number } | null)?.total ?? 0

  return {
    ok: true,
    visitors: rowsRes.results ?? [],
    stats: {
      unique_ips: stats?.unique_ips ?? 0,
      total_visits: stats?.total_visits ?? 0,
      unique_qr_ips: qrStats?.unique_qr_ips ?? 0,
      total_qr_scans: qrStats?.total_qr_scans ?? 0,
    },
    top_paths: topPathsRes.results ?? [],
    top_qr_paths: topQrPathsRes.results ?? [],
    chart_data: dailyChartRes.results ?? [],
    filteredTotal,
    limit,
    offset,
  }
})
