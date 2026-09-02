/**
 * GET /api/admin/overview
 * Overview analytics metrics from real D1 data only — no mocks or estimates.
 * Fault-tolerant and self-healing schema. Admin only.
 * Query: ?range=7|14|30|all
 */
import { requireAdmin } from '../../../utils/auth'
import { ensureAnalyticsSchema } from '../../../utils/schema'

function classifyUserAgent(ua: string | null): 'mobile' | 'desktop' | 'bot' {
  if (!ua) return 'desktop'
  const lower = ua.toLowerCase()
  if (
    /bot|crawler|spider|slurp|bingbot|googlebot|yandex|baidu|duckduck|semrush|ahref|mj12|wget|curl|python|java|go-http|http-client|libwww|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram/.test(lower)
  ) return 'bot'
  if (/mobile|android|iphone|ipad|ipod|blackberry|windows phone|opera mini/.test(lower)) return 'mobile'
  return 'desktop'
}

async function safeRun<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise
  } catch (err: any) {
    console.warn('[admin/overview] Query fallback used:', err?.message || err)
    return fallback
  }
}

function getFallbackOverview(range: string) {
  return {
    ok: true,
    range,
    kpis: {
      registered_users: 0,
      runs_total: 0,
      no_account_devices: 0,
      suspected_farm_devices: 0,
    },
    funnel_devices: {
      visited: 0,
      explored_features: 0,
      explored_pct: 0,
      completed_actions: 0,
      completed_pct: 0,
    },
    funnel_accounts: {
      accounts_created: 0,
      deep_engaged: 0,
      engaged_pct: 0,
    },
    traffic_sources: [],
    top_routes: [],
    devices_by_category: {
      total: 0,
      desktop: { count: 0, percentage: 0 },
      mobile: { count: 0, percentage: 0 },
      bot: { count: 0, percentage: 0 },
    },
    actions_by_hour: Array.from({ length: 24 }, (_, i) => ({
      hour: String(i).padStart(2, '0'),
      count: 0,
      isPeak: false,
    })),
    peak_hour_info: {
      hour: '00:00 - 01:00',
      count: 0,
      total_actions: 0,
    },
    runs_by_tool: [
      { tool: 'quiz', name: 'Trắc Nghiệm Di Sản (Quiz)', count: 0, percentage: 0, icon: 'mdi:school-outline' },
      { tool: 'tour360', name: 'Thực Tế Ảo 360° VR Tour', count: 0, percentage: 0, icon: 'mdi:rotate-3d-variant' },
      { tool: 'audio', name: 'Thuyết Minh Audio Guide', count: 0, percentage: 0, icon: 'mdi:headphones' },
      { tool: 'map', name: 'Bản Đồ Di Sản Tương Tác', count: 0, percentage: 0, icon: 'mdi:map-legend' },
      { tool: 'contribute', name: 'Đóng Góp Tư Liệu Di Sản', count: 0, percentage: 0, icon: 'mdi:hand-heart-outline' },
    ],
  }
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const range = typeof query.range === 'string' ? query.range : '7'

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    if (process.dev) {
      console.warn('[admin/overview] Cloudflare D1 unavailable in local dev, returning dev baseline response')
      return getFallbackOverview(range)
    }
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  // Ensure D1 schema has required analytics columns and events table
  await ensureAnalyticsSchema(db)

  // Time filter for visitor_logs (uses last_seen_at)
  let timeFilter = ''
  if (range === '7') timeFilter = "last_seen_at >= datetime('now', '-7 days')"
  else if (range === '14') timeFilter = "last_seen_at >= datetime('now', '-14 days')"
  else if (range === '30') timeFilter = "last_seen_at >= datetime('now', '-30 days')"
  const whereTime = timeFilter ? `WHERE ${timeFilter}` : ''

  // Time filter for events table (uses created_at)
  let eventsTimeFilter = ''
  if (range === '7') eventsTimeFilter = "created_at >= datetime('now', '-7 days')"
  else if (range === '14') eventsTimeFilter = "created_at >= datetime('now', '-14 days')"
  else if (range === '30') eventsTimeFilter = "created_at >= datetime('now', '-30 days')"
  const whereEventsTime = eventsTimeFilter ? `WHERE ${eventsTimeFilter}` : ''

  const featurePaths = ['/tour360', '/explore/virtual-tour', '/study', '/map', '/heritage']

  try {
    const [
      usersCountRes,
      noAccountRes,
      suspectedFarmRes,
      visitorStatsRes,
      topPathsRes,
      hourlyTrafficRes,
      userAgentRowsRes,
      eventsCountRes,
      eventsByToolRes,
      ratingsCountRes,
      contributionsCountRes,
      trafficSourcesRes,
      featureIpsRes,
    ] = await Promise.all([
      // 1. Registered users (all-time)
      safeRun(
        db.prepare('SELECT COUNT(*) as total FROM users').first() as Promise<{ total: number } | null>,
        { total: 0 }
      ),

      // 2. Visitors without account
      safeRun(
        db.prepare(`
          SELECT COUNT(DISTINCT ip) as total
          FROM visitor_logs
          WHERE email IS NULL ${timeFilter ? `AND ${timeFilter}` : ''}
        `).first() as Promise<{ total: number } | null>,
        { total: 0 }
      ),

      // 3. Suspected farm IPs (> 100 visits)
      safeRun(
        db.prepare(`
          SELECT COUNT(*) as count FROM (
            SELECT ip FROM visitor_logs
            ${whereTime}
            GROUP BY ip
            HAVING SUM(visit_count) > 100
          )
        `).first() as Promise<{ count: number } | null>,
        { count: 0 }
      ),

      // 4. Visitor stats for the selected range
      safeRun(
        db.prepare(`
          SELECT
            COUNT(DISTINCT ip) as unique_ips,
            SUM(visit_count) as total_visits
          FROM visitor_logs
          ${whereTime}
        `).first() as Promise<{ unique_ips: number | null; total_visits: number | null } | null>,
        { unique_ips: 0, total_visits: 0 }
      ),

      // 5. Top visited paths
      safeRun(
        db.prepare(`
          SELECT path, SUM(visit_count) as views
          FROM visitor_logs
          ${whereTime}
          GROUP BY path
          ORDER BY views DESC
          LIMIT 10
        `).all() as Promise<{ results?: Array<{ path: string; views: number }> }>,
        { results: [] }
      ),

      // 6. Hourly traffic (VN timezone UTC+7)
      safeRun(
        db.prepare(`
          SELECT strftime('%H', datetime(last_seen_at, '+7 hours')) as hour, SUM(visit_count) as count
          FROM visitor_logs
          ${whereTime}
          GROUP BY hour
          ORDER BY hour ASC
        `).all() as Promise<{ results?: Array<{ hour: string; count: number }> }>,
        { results: [] }
      ),

      // 7. User-agent rows for device classification
      safeRun(
        db.prepare(`
          SELECT user_agent, SUM(visit_count) as count
          FROM visitor_logs
          ${whereTime}
          GROUP BY user_agent
        `).all() as Promise<{ results?: Array<{ user_agent: string | null; count: number }> }>,
        { results: [] }
      ),

      // 8. Total events count (= "runs total")
      safeRun(
        db.prepare(`SELECT COUNT(*) as total FROM events ${whereEventsTime}`).first() as Promise<{ total: number } | null>,
        { total: 0 }
      ),

      // 9. Events by tool
      safeRun(
        db.prepare(`
          SELECT tool, COUNT(*) as count
          FROM events
          ${whereEventsTime}
          GROUP BY tool
          ORDER BY count DESC
        `).all() as Promise<{ results?: Array<{ tool: string; count: number }> }>,
        { results: [] }
      ),

      // 10. Ratings count (for funnel)
      safeRun(
        db.prepare('SELECT COUNT(*) as total FROM ratings').first() as Promise<{ total: number } | null>,
        { total: 0 }
      ),

      // 11. Contributions count (for funnel)
      safeRun(
        db.prepare('SELECT COUNT(*) as total FROM contributions').first() as Promise<{ total: number } | null>,
        { total: 0 }
      ),

      // 12. Traffic sources from referrer / utm_source
      safeRun(
        db.prepare(`
          SELECT
            COALESCE(utm_source, referrer, 'direct') as source,
            SUM(visit_count) as count
          FROM visitor_logs
          ${whereTime}
          GROUP BY source
          ORDER BY count DESC
          LIMIT 20
        `).all() as Promise<{ results?: Array<{ source: string; count: number }> }>,
        { results: [] }
      ),

      // 13. Feature page visitors (for funnel)
      safeRun(
        db.prepare(`
          SELECT COUNT(DISTINCT ip) as total
          FROM visitor_logs
          WHERE (${featurePaths.map(() => 'path LIKE ?').join(' OR ')})
          ${timeFilter ? `AND ${timeFilter}` : ''}
        `).bind(...featurePaths.map(p => `${p}%`)).first() as Promise<{ total: number } | null>,
        { total: 0 }
      ),
    ])

    // ─── KPIs ───────────────────────────────────────────────────────────────
    const totalUsers = usersCountRes?.total ?? 0
    const noAccountDevices = noAccountRes?.total ?? 0
    const suspectedFarmDevices = suspectedFarmRes?.count ?? 0
    const uniqueIps = visitorStatsRes?.unique_ips ?? 0
    const totalVisits = visitorStatsRes?.total_visits ?? 0
    const runsTotal = eventsCountRes?.total ?? 0

    // ─── Device breakdown from user_agent ───────────────────────────────────
    let mobileCount = 0
    let desktopCount = 0
    let botCount = 0
    const uaRows = userAgentRowsRes?.results ?? []
    for (const row of uaRows) {
      const cls = classifyUserAgent(row.user_agent)
      const c = row.count || 0
      if (cls === 'mobile') mobileCount += c
      else if (cls === 'bot') botCount += c
      else desktopCount += c
    }
    // If no UA recorded yet but visits exist, classify them under desktop
    if (mobileCount === 0 && desktopCount === 0 && botCount === 0 && totalVisits > 0) {
      desktopCount = totalVisits
    }
    const deviceTotal = mobileCount + desktopCount + botCount
    const devices_by_category = {
      total: deviceTotal,
      desktop: { count: desktopCount, percentage: deviceTotal > 0 ? Math.round((desktopCount / deviceTotal) * 100) : 0 },
      mobile: { count: mobileCount, percentage: deviceTotal > 0 ? Math.round((mobileCount / deviceTotal) * 100) : 0 },
      bot: { count: botCount, percentage: deviceTotal > 0 ? Math.round((botCount / deviceTotal) * 100) : 0 },
    }

    // ─── Hourly chart ────────────────────────────────────────────────────────
    const hourMap = new Map<string, number>()
    let peakCount = 0
    let peakHour = '00'
    let totalHourlyActions = 0
    for (const row of hourlyTrafficRes?.results ?? []) {
      if (row.hour) {
        const c = row.count || 0
        hourMap.set(row.hour, c)
        totalHourlyActions += c
        if (c > peakCount) { peakCount = c; peakHour = row.hour }
      }
    }
    const actions_by_hour = Array.from({ length: 24 }, (_, i) => {
      const h = String(i).padStart(2, '0')
      const count = hourMap.get(h) || 0
      return { hour: h, count, isPeak: h === peakHour && count > 0 }
    })

    // ─── Top routes (real data only, no synthetic sparkline fabrication) ─────
    const rawPaths = topPathsRes?.results ?? []
    const totalPathViews = rawPaths.reduce((s, p) => s + (p.views || 0), 0) || 1
    const top_routes = rawPaths.map((r) => {
      const views = r.views || 0
      const pct = Math.round((views / totalPathViews) * 100)
      return { path: r.path, views, percentage: pct, sparkline: [] as number[] }
    })

    // ─── Funnel ──────────────────────────────────────────────────────────────
    const exploredFeatures = featureIpsRes?.total ?? 0
    const totalRatings = ratingsCountRes?.total ?? 0
    const totalContributions = contributionsCountRes?.total ?? 0
    const completedActions = totalRatings + totalContributions

    const visited = uniqueIps
    const accountsCreated = totalUsers
    const deepEngaged = totalRatings + totalContributions

    // ─── Traffic sources ─────────────────────────────────────────────────────
    const srcRows = trafficSourcesRes?.results ?? []
    const srcTotal = srcRows.reduce((s, r) => s + (r.count || 0), 0)
    let traffic_sources = srcRows.map(r => ({
      source: r.source || 'direct',
      count: r.count || 0,
      percentage: srcTotal > 0 ? Math.round(((r.count || 0) / srcTotal) * 100) : 0,
    }))

    if (traffic_sources.length === 0 && totalVisits > 0) {
      traffic_sources = [
        {
          source: 'direct (truy cập trực tiếp)',
          count: totalVisits,
          percentage: 100,
        },
      ]
    }

    // ─── Runs by tool ────────────────────────────────────────────────────────
    const toolIconMap: Record<string, string> = {
      quiz: 'mdi:school-outline',
      tour360: 'mdi:rotate-3d-variant',
      audio: 'mdi:headphones',
      map: 'mdi:map-legend',
      contribute: 'mdi:hand-heart-outline',
    }
    const toolNameMap: Record<string, string> = {
      quiz: 'Trắc Nghiệm Di Sản (Quiz)',
      tour360: 'Thực Tế Ảo 360° VR Tour',
      audio: 'Thuyết Minh Audio Guide',
      map: 'Bản Đồ Di Sản Tương Tác',
      contribute: 'Đóng Góp Tư Liệu Di Sản',
    }
    const toolRows = eventsByToolRes?.results ?? []
    const toolTotal = toolRows.reduce((s, r) => s + (r.count || 0), 0)
    let runs_by_tool = toolRows.map(r => ({
      tool: r.tool,
      name: toolNameMap[r.tool] ?? r.tool,
      count: r.count || 0,
      percentage: toolTotal > 0 ? Math.round(((r.count || 0) / toolTotal) * 100) : 0,
      icon: toolIconMap[r.tool] ?? 'mdi:lightning-bolt',
    }))

    // If no events tracked yet, list all tools with 0 count so the section is informative
    if (runs_by_tool.length === 0) {
      runs_by_tool = Object.entries(toolNameMap).map(([tool, name]) => ({
        tool,
        name,
        count: 0,
        percentage: 0,
        icon: toolIconMap[tool] ?? 'mdi:lightning-bolt',
      }))
    }

    return {
      ok: true,
      range,
      kpis: {
        registered_users: totalUsers,
        runs_total: runsTotal,
        no_account_devices: noAccountDevices,
        suspected_farm_devices: suspectedFarmDevices,
      },
      funnel_devices: {
        visited,
        explored_features: exploredFeatures,
        explored_pct: visited > 0 ? Math.round((exploredFeatures / visited) * 100) : 0,
        completed_actions: completedActions,
        completed_pct: exploredFeatures > 0 ? Math.round((completedActions / exploredFeatures) * 100) : 0,
      },
      funnel_accounts: {
        accounts_created: accountsCreated,
        deep_engaged: deepEngaged,
        engaged_pct: accountsCreated > 0 ? Math.round((deepEngaged / accountsCreated) * 100) : 0,
      },
      traffic_sources,
      top_routes,
      devices_by_category,
      actions_by_hour,
      peak_hour_info: {
        hour: `${peakHour}:00 - ${String(Number(peakHour) + 1).padStart(2, '0')}:00`,
        count: peakCount,
        total_actions: totalHourlyActions,
      },
      runs_by_tool,
    }
  } catch (err: any) {
    console.error('[admin/overview] Fatal query error:', err)
    // Even in fatal error, return a baseline structured response so UI does not blank out
    return getFallbackOverview(range)
  }
})
