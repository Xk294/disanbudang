/**
 * DELETE /api/admin/contributions/:id
 * Permanently remove a contribution. Admin only.
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing contribution ID' })

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const result = await db.prepare(`DELETE FROM contributions WHERE id = ?`).bind(id).run()

  if (!result.meta?.changes || result.meta.changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Contribution not found' })
  }

  return { ok: true, id, message: 'Contribution deleted successfully' }
})
