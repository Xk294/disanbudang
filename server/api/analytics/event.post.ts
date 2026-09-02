/**
 * POST /api/analytics/event
 * Track a feature usage event. Fire-and-forget: never blocks UX.
 * Body: { tool, action?, heritage_id?, idToken? }
 * tool: 'quiz' | 'tour360' | 'audio' | 'map' | 'contribute'
 * action: 'start' | 'complete' (default: 'start')
 */
import { verifyFirebaseToken } from '../../utils/auth'
import { ensureAnalyticsSchema } from '../../utils/schema'

const VALID_TOOLS = new Set(['quiz', 'tour360', 'audio', 'map', 'contribute'])
const VALID_ACTIONS = new Set(['start', 'complete'])

export default defineEventHandler(async (event) => {
  // Origin check in production
  if (!import.meta.dev) {
    const origin = getHeader(event, 'origin') ?? ''
    const referer = getHeader(event, 'referer') ?? ''
    const isAllowed =
      !origin ||
      origin === 'https://disanbudang.com' ||
      origin === 'https://www.disanbudang.com' ||
      origin.endsWith('.disanbudang.pages.dev') ||
      origin.endsWith('.pages.dev') ||
      referer.startsWith('https://disanbudang.com') ||
      referer.includes('.pages.dev')
    if (!isAllowed) {
      throw createError({ statusCode: 403, statusMessage: 'Invalid request origin' })
    }
  }

  const body = await readBody(event)
  const { tool, action = 'start', heritage_id, idToken } = body ?? {}

  if (!tool || !VALID_TOOLS.has(tool)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid tool' })
  }
  if (!VALID_ACTIONS.has(action)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid action' })
  }

  const ip =
    getHeader(event, 'cf-connecting-ip') ??
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0'

  let uid: string | null = null
  if (idToken && typeof idToken === 'string') {
    try {
      const claims = await verifyFirebaseToken(idToken)
      uid = claims.uid ?? null
    } catch {
      // Treat as anonymous on invalid token — never block event tracking
    }
  }

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    return { ok: true }
  }

  // Ensure events table exists
  await ensureAnalyticsSchema(db)

  try {
    await db.prepare(`
      INSERT INTO events (ip, uid, tool, action, heritage_id)
      VALUES (?, ?, ?, ?, ?)
    `).bind(ip, uid, tool, action, heritage_id ?? null).run()
  } catch (err) {
    console.error('[analytics/event] DB error:', err)
  }

  return { ok: true }
})
