/**
 * DELETE /api/admin/ratings/:id
 * Delete a user rating / spam review. Admin only.
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing rating ID' })

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const result = await db.prepare(`DELETE FROM ratings WHERE id = ?`).bind(id).run()

  if (!result.meta?.changes || result.meta.changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Rating not found' })
  }

  return { ok: true, id, message: 'Rating deleted successfully' }
})
