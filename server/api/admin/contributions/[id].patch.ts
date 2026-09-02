/**
 * PATCH /api/admin/contributions/:id
 * Approve or reject a contribution. Admin only.
 * Body: { status: 'approved' | 'rejected', review_note?: string }
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const admin = await requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing contribution ID' })

  const body = await readBody(event)
  const { status, review_note } = body ?? {}

  if (!status || !['approved', 'rejected', 'pending'].includes(status)) {
    throw createError({ statusCode: 400, statusMessage: 'status must be approved, rejected or pending' })
  }

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const result = await db.prepare(`
    UPDATE contributions
    SET status      = ?,
        review_note = ?,
        reviewed_at = CURRENT_TIMESTAMP,
        reviewed_by = ?
    WHERE id = ?
  `).bind(status, review_note ?? null, admin.email, id).run()

  if (!result.meta?.changes || result.meta.changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Contribution not found' })
  }

  return { ok: true, id, status }
})
