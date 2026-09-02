-- Migration 001 — Add analytics columns to visitor_logs + create events table
-- Run on PRODUCTION (preserves existing data):
--   wrangler d1 execute disanbudang-db --remote --file=migrations/001_add_analytics_columns.sql
--
-- schema.sql (full rebuild for local dev) already includes these columns.
-- Only run this file against the remote DB to avoid data loss.

ALTER TABLE visitor_logs ADD COLUMN user_agent TEXT;
ALTER TABLE visitor_logs ADD COLUMN referrer   TEXT;
ALTER TABLE visitor_logs ADD COLUMN utm_source TEXT;

CREATE TABLE IF NOT EXISTS events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  ip           TEXT NOT NULL,
  uid          TEXT,
  tool         TEXT NOT NULL CHECK(tool IN ('quiz','tour360','audio','map','contribute')),
  action       TEXT NOT NULL DEFAULT 'start' CHECK(action IN ('start','complete')),
  heritage_id  TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_events_tool ON events(tool, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_ip   ON events(ip);
