-- Links table
CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  original_url TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  custom_code BOOLEAN DEFAULT 0,
  user_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_id INTEGER NOT NULL,
  clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  country TEXT,
  city TEXT,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT
);

-- Users table (optional feature)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  api_key TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);
CREATE INDEX IF NOT EXISTS idx_links_user ON links(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_link ON analytics(link_id);
CREATE INDEX IF NOT EXISTS idx_analytics_time ON analytics(clicked_at);
