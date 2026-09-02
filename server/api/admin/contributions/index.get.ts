/**
 * GET /api/admin/contributions
 * List contributions filtered by status, category type, and keyword search. Admin only.
 * Query: ?status=pending|approved|rejected|all  (default: pending)
 *        ?type=all|story|photo|document|memory|artwork|research
 *        ?search=...
 *        ?limit=50  ?offset=0
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const status = (query.status as string) || 'pending'
  const type = (query.type as string) || 'all'
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const limit = Math.min(Number(query.limit) || 50, 100)
  const offset = Number(query.offset) || 0

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  // Build dynamic WHERE clause
  const conditions: string[] = []
  const bindings: unknown[] = []

  if (status && status !== 'all') {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid status filter' })
    }
    conditions.push('status = ?')
    bindings.push(status)
  }

  if (type && type !== 'all') {
    conditions.push('type = ?')
    bindings.push(type)
  }

  if (search) {
    conditions.push('(title LIKE ? OR author_name LIKE ? OR content LIKE ? OR ip LIKE ?)')
    const pattern = `%${search}%`
    bindings.push(pattern, pattern, pattern, pattern)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const [rowsRes, filteredCountRes, countsRes] = await Promise.all([
    // 1. Filtered and paginated rows
    db.prepare(`
      SELECT * FROM contributions
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(...bindings, limit, offset).all(),

    // 2. Filtered total count for current filter
    db.prepare(`
      SELECT COUNT(*) as total FROM contributions
      ${whereClause}
    `).bind(...bindings).first(),

    // 3. Status summary badge counts (unfiltered by search/type)
    db.prepare(`
      SELECT status, COUNT(*) as count FROM contributions GROUP BY status
    `).all(),
  ])

  const statusCounts: Record<string, number> = { pending: 0, approved: 0, rejected: 0 }
  for (const row of (countsRes.results ?? [])) {
    const r = row as { status: string; count: number }
    statusCounts[r.status] = r.count
  }

  const filteredTotal = (filteredCountRes as { total: number } | null)?.total ?? 0
  const globalTotal = Object.values(statusCounts).reduce((a, b) => a + b, 0)

  return {
    ok: true,
    contributions: rowsRes.results ?? [],
    counts: statusCounts,
    total: globalTotal,
    filteredTotal,
    limit,
    offset,
  }
})
