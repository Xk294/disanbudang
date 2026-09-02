/**
 * PATCH /api/admin/contributions/batch
 * Bulk approve, reject, reset to pending, or delete contributions. Admin only.
 * Body: { ids: string[], action: 'approved' | 'rejected' | 'pending' | 'delete', review_note?: string }
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const admin = await requireAdmin(event)

  const body = await readBody(event)
  const { ids, action, review_note } = body ?? {}

  if (!Array.isArray(ids) || ids.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'ids must be a non-empty array of strings' })
  }

  if (!['approved', 'rejected', 'pending', 'delete'].includes(action)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid bulk action' })
  }

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  // Max 100 items per batch to protect D1 query limits
  const targetIds = ids.slice(0, 100)
  const placeholders = targetIds.map(() => '?').join(',')

  if (action === 'delete') {
    const result = await db.prepare(
      `DELETE FROM contributions WHERE id IN (${placeholders})`
    ).bind(...targetIds).run()

    return {
      ok: true,
      action: 'delete',
      affected: result.meta?.changes ?? targetIds.length,
    }
  }

  // Otherwise update status
  const result = await db.prepare(`
    UPDATE contributions
    SET status      = ?,
        review_note = COALESCE(?, review_note),
        reviewed_at = CURRENT_TIMESTAMP,
        reviewed_by = ?
    WHERE id IN (${placeholders})
  `).bind(action, review_note ?? null, admin.email, ...targetIds).run()

  return {
    ok: true,
    action,
    affected: result.meta?.changes ?? targetIds.length,
  }
})
