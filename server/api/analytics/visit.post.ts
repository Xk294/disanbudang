/**
 * POST /api/analytics/visit
 * Track a page visit. Upserts visitor_logs: one row per (ip, path), visit_count increments.
 * If idToken provided (logged-in user), enriches the row with email + display_name.
 * Body: { path: string, idToken?: string }
 */
import { verifyFirebaseToken } from '../../utils/auth'

// Module-level cache to reduce full table scans under high concurrent traffic
let cachedTotal: number | null = null
let lastTotalFetch = 0
const TOTAL_CACHE_TTL_MS = 30 * 1000

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { path, idToken } = body ?? {}

  if (!path || typeof path !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing path' })
  }

  // Get real IP from Cloudflare header
  const ip =
    getHeader(event, 'cf-connecting-ip') ??
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0'

  // Resolve user identity if token provided (optional — never block on failure)
  let email: string | null = null
  let displayName: string | null = null
  if (idToken && typeof idToken === 'string') {
    try {
      const claims = await verifyFirebaseToken(idToken)
      email = claims.email ?? null
      displayName = claims.name ?? null
    } catch {
      // Token invalid / expired — treat as anonymous, don't throw
    }
  }

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    // In local dev or environment without Cloudflare D1:
    return { ok: true, totalVisits: 1428 }
  }

  try {
    await db.prepare(`
      INSERT INTO visitor_logs (ip, email, display_name, path, visit_count, last_seen_at)
      VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(ip, path) DO UPDATE SET
        visit_count  = visitor_logs.visit_count + 1,
        last_seen_at = CURRENT_TIMESTAMP,
        email        = COALESCE(excluded.email, visitor_logs.email),
        display_name = COALESCE(excluded.display_name, visitor_logs.display_name)
    `).bind(ip, email, displayName, path).run()
  } catch (err) {
    console.error('[analytics/visit] DB error:', err)
    // Non-critical — don't break page load over analytics failure
    return { ok: false, totalVisits: cachedTotal ?? 0 }
  }

  // Return aggregate total so the frontend can display a live counter.
  // Cached for 30 seconds to prevent table scan contention during traffic surges.
  const now = Date.now()
  if (cachedTotal === null || now - lastTotalFetch > TOTAL_CACHE_TTL_MS) {
    try {
      const agg = (await db.prepare(
        `SELECT SUM(visit_count) as total FROM visitor_logs`,
      ).first()) as { total: number | null } | null
      if (agg?.total != null) {
        cachedTotal = agg.total
        lastTotalFetch = now
      }
    } catch {
      // Retain existing cachedTotal on transient read error
    }
  }

  return { ok: true, totalVisits: cachedTotal ?? 0 }
})
