/**
 * GET /api/admin/traffic-sources
 * Real inbound channel breakdown from visitor_logs.referrer + utm_source columns.
 * No mock data. Admin only.
 * Query: ?range=30 (days, 1–365) &relative=true|false
 */
import { requireAdmin } from '../../../utils/auth'

export interface TrafficSourceItem {
  source: string
  count: number
  percentage: number
  type: 'utm' | 'referrer' | 'direct' | 'search' | 'social' | 'qr'
}

function classifySource(source: string): TrafficSourceItem['type'] {
  if (!source || source === 'direct') return 'direct'
  if (source.startsWith('UTM -') || source.startsWith('utm_')) return 'utm'
  if (/google|bing|coccoc|yahoo|duckduck|perplexity|yandex/.test(source)) return 'search'
  if (/facebook|zalo|twitter|instagram|tiktok|threads|linkedin/.test(source)) return 'social'
  if (source.includes('/heritage/qr/') || source === 'qr') return 'qr'
  return 'referrer'
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const rangeParam = typeof query.range === 'string' ? parseInt(query.range, 10) : 30
  const range = isNaN(rangeParam) || rangeParam <= 0 ? 30 : Math.min(rangeParam, 365)
  const relative = query.relative === 'true' || query.relative === '1'

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  try {
    // UTM sources (most specific signal — read first)
    const utmRes = await db.prepare(`
      SELECT
        'UTM - ' || utm_source as source,
        SUM(visit_count) as count
      FROM visitor_logs
      WHERE utm_source IS NOT NULL AND utm_source != ''
        AND last_seen_at >= datetime('now', '-' || ? || ' days')
      GROUP BY utm_source
      ORDER BY count DESC
    `).bind(range).all() as { results?: Array<{ source: string; count: number }> }

    // Referrer sources (when no utm)
    const refRes = await db.prepare(`
      SELECT
        CASE
          WHEN referrer LIKE '%google%' THEN 'google'
          WHEN referrer LIKE '%bing%' THEN 'bing'
          WHEN referrer LIKE '%coccoc%' THEN 'coccoc.com'
          WHEN referrer LIKE '%yahoo%' THEN 'yahoo'
          WHEN referrer LIKE '%duckduckgo%' THEN 'duckduckgo'
          WHEN referrer LIKE '%facebook%' THEN 'facebook'
          WHEN referrer LIKE '%zalo%' THEN 'zalo'
          WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' THEN 'twitter'
          WHEN referrer LIKE '%threads%' OR referrer LIKE '%l.threads%' THEN 'threads'
          WHEN referrer LIKE '%tiktok%' THEN 'tiktok'
          WHEN referrer LIKE '%perplexity%' THEN 'perplexity'
          WHEN referrer LIKE '%chatgpt%' OR referrer LIKE '%chat.openai%' THEN 'chatgpt'
          ELSE referrer
        END as source,
        SUM(visit_count) as count
      FROM visitor_logs
      WHERE utm_source IS NULL
        AND referrer IS NOT NULL AND referrer != ''
        AND last_seen_at >= datetime('now', '-' || ? || ' days')
      GROUP BY source
      ORDER BY count DESC
    `).bind(range).all() as { results?: Array<{ source: string; count: number }> }

    // Direct (no referrer, no utm)
    const directRes = await db.prepare(`
      SELECT SUM(visit_count) as count
      FROM visitor_logs
      WHERE utm_source IS NULL
        AND (referrer IS NULL OR referrer = '')
        AND last_seen_at >= datetime('now', '-' || ? || ' days')
    `).bind(range).first() as { count: number | null } | null

    const items: Array<{ source: string; count: number }> = [
      ...(utmRes.results ?? []),
      ...(refRes.results ?? []),
    ]

    const directCount = directRes?.count ?? 0
    if (directCount > 0) {
      items.push({ source: 'direct', count: directCount })
    }

    // Merge duplicate sources and sort
    const merged = new Map<string, number>()
    for (const item of items) {
      const s = item.source || 'direct'
      merged.set(s, (merged.get(s) ?? 0) + (item.count || 0))
    }

    const sorted = Array.from(merged.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([source, count]) => ({ source, count }))

    const total = sorted.reduce((acc, r) => acc + r.count, 0)

    const sources: TrafficSourceItem[] = sorted.map(item => ({
      source: item.source,
      count: item.count,
      percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
      type: classifySource(item.source),
    }))

    return {
      ok: true,
      range,
      relative,
      total,
      non_bot_total: total,
      sources,
    }
  } catch (err) {
    console.error('[traffic-sources] Query error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
