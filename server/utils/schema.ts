/**
 * Auto-migration and schema self-healing helper for Cloudflare D1.
 * Ensures required tables and columns exist without needing manual wrangler CLI execution.
 * Preserves all existing data.
 */

let schemaEnsured = false
let schemaPromise: Promise<void> | null = null

export async function ensureAnalyticsSchema(db: any): Promise<void> {
  if (!db || schemaEnsured) return
  if (schemaPromise) return schemaPromise

  schemaPromise = (async () => {
    try {
      // 1. Inspect existing columns in visitor_logs
      const tableInfo = (await db.prepare('PRAGMA table_info(visitor_logs)').all()) as {
        results?: Array<{ name: string }>
      }
      const existingCols = new Set((tableInfo.results ?? []).map((r: { name: string }) => r.name))

      if (!existingCols.has('user_agent')) {
        await db
          .prepare('ALTER TABLE visitor_logs ADD COLUMN user_agent TEXT')
          .run()
          .catch((e: any) => {
            if (!e?.message?.includes('duplicate column')) {
              console.warn('[schema] user_agent col alter:', e?.message)
            }
          })
      }

      if (!existingCols.has('referrer')) {
        await db
          .prepare('ALTER TABLE visitor_logs ADD COLUMN referrer TEXT')
          .run()
          .catch((e: any) => {
            if (!e?.message?.includes('duplicate column')) {
              console.warn('[schema] referrer col alter:', e?.message)
            }
          })
      }

      if (!existingCols.has('utm_source')) {
        await db
          .prepare('ALTER TABLE visitor_logs ADD COLUMN utm_source TEXT')
          .run()
          .catch((e: any) => {
            if (!e?.message?.includes('duplicate column')) {
              console.warn('[schema] utm_source col alter:', e?.message)
            }
          })
      }

      // 2. Create events table if not exists
      await db
        .prepare(`
          CREATE TABLE IF NOT EXISTS events (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            ip           TEXT NOT NULL,
            uid          TEXT,
            tool         TEXT NOT NULL CHECK(tool IN ('quiz','tour360','audio','map','contribute')),
            action       TEXT NOT NULL DEFAULT 'start' CHECK(action IN ('start','complete')),
            heritage_id  TEXT,
            created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `)
        .run()
        .catch((e: any) => console.warn('[schema] events table init:', e?.message))

      // 3. Create indexes
      await db
        .prepare('CREATE INDEX IF NOT EXISTS idx_events_tool ON events(tool, created_at DESC)')
        .run()
        .catch(() => {})

      await db
        .prepare('CREATE INDEX IF NOT EXISTS idx_events_ip ON events(ip)')
        .run()
        .catch(() => {})

      schemaEnsured = true
    } catch (err: any) {
      console.error('[schema] ensureAnalyticsSchema failed:', err)
    } finally {
      schemaPromise = null
    }
  })()

  return schemaPromise
}
