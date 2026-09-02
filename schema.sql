-- =============================================================
-- Di Sản Bù Đăng — D1 Schema
-- All migrations are full rebuilds (DROP + CREATE).
-- Run: npm run db.init.local  (dev)
--      npm run db.push         (remote)
-- =============================================================

-- ----- Users (synced from Firebase Auth on first/subsequent login) -----
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  uid            TEXT PRIMARY KEY,
  email          TEXT NOT NULL UNIQUE,
  display_name   TEXT,
  photo_url      TEXT,
  email_verified INTEGER NOT NULL DEFAULT 0,
  provider       TEXT,                          -- 'google.com' | 'password' | etc.
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ----- Visitor Logs (one row per IP+path, upsert increments count) -----
DROP TABLE IF EXISTS visitor_logs;
CREATE TABLE visitor_logs (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  ip             TEXT NOT NULL,
  email          TEXT,                          -- null if anonymous
  display_name   TEXT,                          -- null if anonymous
  path           TEXT NOT NULL,
  visit_count    INTEGER NOT NULL DEFAULT 1,
  first_seen_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(ip, path)
);
CREATE INDEX IF NOT EXISTS idx_visitor_path ON visitor_logs(path, last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_ip   ON visitor_logs(ip);

-- ----- Contributions (community submissions, reviewed by admin) -----
DROP TABLE IF EXISTS contributions;
CREATE TABLE contributions (
  id            TEXT PRIMARY KEY,
  type          TEXT NOT NULL CHECK(type IN ('story','photo','document','memory','artwork','research')),
  author_name   TEXT NOT NULL,
  author_role   TEXT NOT NULL DEFAULT '',
  title         TEXT NOT NULL CHECK(length(title) BETWEEN 5 AND 200),
  content       TEXT NOT NULL CHECK(length(content) BETWEEN 20 AND 10000),
  heritage_id   TEXT,
  files_data    TEXT,                           -- JSON array of Firebase Storage URLs
  status        TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
  ip            TEXT,                           -- CF-Connecting-IP (not hashed; no PII linkage without name)
  review_note   TEXT,
  reviewed_at   DATETIME,
  reviewed_by   TEXT,                           -- admin email
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status, created_at DESC);

-- ----- Project Ratings (star + comment, authenticated per Google user) -----
DROP TABLE IF EXISTS ratings;
CREATE TABLE ratings (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  uid           TEXT NOT NULL,
  email         TEXT,
  display_name  TEXT,
  photo_url     TEXT,
  ip            TEXT,
  stars         INTEGER NOT NULL CHECK(stars BETWEEN 1 AND 5),
  comment       TEXT CHECK(length(comment) <= 500),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(uid)
);
CREATE INDEX IF NOT EXISTS idx_ratings_stars ON ratings(stars);
CREATE INDEX IF NOT EXISTS idx_ratings_uid   ON ratings(uid);

