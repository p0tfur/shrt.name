# SHRT.NAME - IMPLEMENTATION PLAN

**Project**: Link Shortener on Cloudflare Workers
**Domain**: shrt.name
**Cost**: $0 (Cloudflare free tier)
**Mode**: MVP-first, simple and lightweight

---

## 📋 OVERVIEW

Self-hosted URL shortener running entirely on Cloudflare infrastructure. No traditional server, no Redis, no Next.js. Pure Cloudflare Workers + KV + D1.

**Core Philosophy**: Simple, fast, free, serverless.

---

## 🏗️ ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                    shrt.name                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend (Cloudflare Pages)                                │
│  ├── index.html       - Main shortening page              │
│  ├── admin.html       - User dashboard (optional)         │
│  ├── js/app.js        - Vanilla JS API client             │
│  └── css/style.css    - Simple responsive styles          │
│                                                             │
│  Backend (Cloudflare Workers)                              │
│  ├── index.js         - Main worker router                │
│  ├── db.js            - D1 database operations           │
│  ├── kv.js            - KV cache operations              │
│  ├── routes/          │
│  │   ├── shorten.js   - POST /api/shorten                │
│  │   ├── redirect.js  - GET /:code                       │
│  │   ├── stats.js     - GET /api/stats/:code             │
│  │   └── user/        - User auth & management           │
│  │       ├── register.js                                   │
│  │       ├── login.js                                      │
│  │       ├── links.js                                      │
│  │       └── apikeys.js                                    │
│  └── middleware/                                                │
│      ├── cors.js                                             │
│      └── ratelimit.js                                        │
│                                                             │
│  Storage (Cloudflare)                                        │
│  ├── Workers KV        - Fast key-value cache             │
│  ├── D1 Database       - SQLite for persistent data        │
│  └── R2 (optional)     - Static assets for later          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ DATABASE SCHEMA (D1 - SQLite)

### File: `schema.sql`

```sql
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
```

---

## 💾 KV STORAGE STRUCTURE

```
# Fast lookup for redirects (cache)
links:{code} → JSON { id, url, user_id, expires_at }

# Click counts (volatile, high-traffic)
clicks:{link_id} → INTEGER count

# Rate limiting
ratelimit:{ip} → INTEGER { count, timestamp }

# User sessions
session:{token} → JSON { user_id, expires_at }
```

---

## 📡 API ENDPOINTS

### Core MVP Endpoints

```
POST /api/shorten
  Description: Create short URL
  Body: {
    "url": "https://example.com/very/long/url",
    "code": "custom-code"  // optional, if not provided auto-generate
  }
  Response: {
    "success": true,
    "short_url": "https://shrt.name/abc123",
    "code": "abc123",
    "original_url": "https://example.com/very/long/url"
  }
  Errors: 400 (invalid URL), 409 (code taken)

GET /:code
  Description: Redirect to original URL and track click
  Response: 301/302 redirect to original_url
  Headers: CF-Cache-Status to track cache hits

GET /api/stats/:code
  Description: Get basic statistics for a link
  Response: {
    "success": true,
    "code": "abc123",
    "original_url": "https://example.com",
    "clicks": 123,
    "created_at": "2024-01-01T00:00:00Z"
  }
```

### Optional User Management Endpoints

```
POST /api/user/register
  Body: { "email", "password" }
  Response: { "success": true, "user_id" }

POST /api/user/login
  Body: { "email", "password" }
  Response: { "success": true, "token" }

GET /api/user/links
  Headers: Authorization: Bearer {token}
  Response: {
    "success": true,
    "links": [
      { "code", "original_url", "clicks", "created_at" }
    ]
  }

DELETE /api/user/links/:code
  Headers: Authorization: Bearer {token}
  Response: { "success": true }

POST /api/user/apikey
  Headers: Authorization: Bearer {token}
  Response: { "success": true, "api_key" }
```

---

## 🔧 IMPLEMENTATION PHASES

### PHASE 1: PROJECT SETUP & CORE INFRASTRUCTURE
**Estimated Time**: 2-3 hours

**Tasks**:
1. [ ] Create Cloudflare account (if not exists)
2. [ ] Install `wrangler` CLI globally
3. [ ] Initialize Worker project: `wrangler init shrt-name`
4. [ ] Create D1 database: `wrangler d1 create shrt-db`
5. [ ] Create KV namespace: `wrangler kv:namespace create LINKS`
6. [ ] Update `wrangler.toml` with bindings
7. [ ] Run schema migrations: `wrangler d1 execute shrt-db --file=schema.sql`
8. [ ] Test database connection
9. [ ] Test KV connection

**Deliverable**: Working Cloudflare Worker with database and KV ready

---

### PHASE 2: CORE URL SHORTENING
**Estimated Time**: 3-4 hours

**Tasks**:
1. [ ] Implement URL validation function
2. [ ] Implement random code generator (6 chars, alphanumeric)
3. [ ] Create `POST /api/shorten` endpoint
   - Validate input URL
   - Check if custom code provided
   - Check code uniqueness in DB
   - Insert into D1
   - Cache in KV
   - Return response
4. [ ] Implement error handling (400, 409)
5. [ ] Test with curl/Postman
6. [ ] Test custom codes
7. [ ] Test auto-generated codes

**Deliverable**: Working `/api/shorten` endpoint

---

### PHASE 3: REDIRECT & CLICK TRACKING
**Estimated Time**: 2-3 hours

**Tasks**:
1. [ ] Implement `GET /:code` redirect endpoint
   - Check KV cache first
   - Fallback to D1 lookup
   - Return 301 redirect
   - Extract click metadata (CF headers)
2. [ ] Implement click tracking
   - Increment KV counter
   - Insert analytics record to D1
   - Extract: country, city, referrer, user_agent
3. [ ] Test redirect functionality
4. [ ] Test analytics recording
5. [ ] Verify click counts increment

**Deliverable**: Working redirect with analytics tracking

---

### PHASE 4: STATS ENDPOINT
**Estimated Time**: 1-2 hours

**Tasks**:
1. [ ] Create `GET /api/stats/:code` endpoint
   - Query D1 for link data
   - Get click count from KV or COUNT(*) from analytics
   - Return formatted response
2. [ ] Test stats endpoint
3. [ ] Add CORS headers
4. [ ] Verify data accuracy

**Deliverable**: Working statistics API

---

### PHASE 5: FRONTEND - MAIN PAGE
**Estimated Time**: 3-4 hours

**Tasks**:
1. [ ] Create `index.html` structure
   - Header with logo
   - URL input field
   - Optional custom code field
   - "Shorten" button
   - Result display with copy button
   - Footer
2. [ ] Create `css/style.css`
   - Clean, modern design
   - Responsive layout
   - Mobile-friendly
   - Dark mode support (optional)
3. [ ] Create `js/app.js`
   - Form submission handler
   - API call to `/api/shorten`
   - Error handling/display
   - Copy to clipboard functionality
   - Loading states
4. [ ] Deploy to Cloudflare Pages
5. [ ] Test in browser
6. [ ] Test responsive design

**Deliverable**: Functional web UI for URL shortening

---

### PHASE 6: FRONTEND - RESULT & STATS
**Estimated Time**: 2-3 hours

**Tasks**:
1. [ ] Add stats display to result area
   - Show click count
   - Show creation date
   - "View Stats" button
2. [ ] Create stats modal or section
   - Display detailed analytics
   - Click count graph (simple, maybe using canvas or SVG)
3. [ ] Add QR code generation (optional)
   - Use API like qrserver.com
   - Display QR code on result
4. [ ] Test stats display
5. [ ] Test QR code generation

**Deliverable**: Enhanced UI with stats and QR codes

---

### PHASE 7: USER MANAGEMENT (OPTIONAL - SKIP FOR MVP)
**Estimated Time**: 6-8 hours

**Tasks**:
1. [ ] Implement user registration endpoint
   - Email validation
   - Password hashing (bcrypt)
   - Generate API key
   - Insert to D1
2. [ ] Implement user login endpoint
   - Verify credentials
   - Generate JWT token
3. [ ] Create `admin.html` dashboard
   - Login form
   - Link listing table
   - Delete link functionality
   - API key display/regenerate
4. [ ] Implement protected endpoints
   - GET /api/user/links
   - DELETE /api/user/links/:code
   - POST /api/user/apikey
5. [ ] Add rate limiting middleware
   - Per IP
   - Per user
6. [ ] Test user flow end-to-end

**Deliverable**: Full user management system

---

### PHASE 8: POLISH & OPTIMIZATION
**Estimated Time**: 3-4 hours

**Tasks**:
1. [ ] Add error pages (404, 500)
2. [ ] Improve error messages
3. [ ] Add loading indicators
4. [ ] Optimize KV cache TTL
5. [ ] Add Cloudflare Analytics
6. [ ] Test with real traffic
7. [ ] Fix any bugs
8. [ ] Add README documentation
9. [ ] Clean up code

**Deliverable**: Production-ready application

---

## 📁 FILE STRUCTURE

```
shrt.name/
├── workers/
│   ├── src/
│   │   ├── index.js              # Main entry point
│   │   ├── db.js                 # D1 database operations
│   │   ├── kv.js                 # KV cache operations
│   │   ├── utils.js              # Helper functions
│   │   ├── middleware/
│   │   │   ├── cors.js
│   │   │   └── ratelimit.js
│   │   └── routes/
│   │       ├── shorten.js        # POST /api/shorten
│   │       ├── redirect.js       # GET /:code
│   │       └── stats.js          # GET /api/stats/:code
│   ├── wrangler.toml             # Cloudflare config
│   ├── package.json
│   └── schema.sql                # Database migrations
├── pages/
│   ├── index.html                # Main page
│   ├── js/
│   │   └── app.js
│   └── css/
│       └── style.css
├── README.md
└── IMPLEMENTATION_PLAN.md        # This file
```

---

## 🔧 WRANGLER.TOML CONFIG

```toml
name = "shrt-name"
main = "workers/src/index.js"
compatibility_date = "2024-01-01"

[vars]
ENVIRONMENT = "production"
DOMAIN = "shrt.name"

# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "shrt-db"
database_id = "<D1_DATABASE_ID>"

# KV Namespace
[[kv_namespaces]]
binding = "LINKS"
id = "<KV_NAMESPACE_ID>"

# Routes
routes = [
  { pattern = "https://shrt.name/*", zone_name = "shrt.name" }
]
```

---

## 🎨 SHORT CODE GENERATION

### Algorithm

```javascript
function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// With retry on collision
async function generateUniqueShortCode(db, length = 6) {
  let code;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    code = generateShortCode(length);
    const exists = await db.prepare('SELECT id FROM links WHERE code = ?').bind(code).first();
    if (!exists) return code;
    attempts++;
  } while (attempts < maxAttempts);

  throw new Error('Failed to generate unique code');
}
```

### Options

- **Random**: 6 characters, alphanumeric → ~56 billion combinations
- **Custom**: User-specified (validated for uniqueness and allowed chars)
- **Mixed**: Allow users to provide custom or auto-generate

---

## 🚀 DEPLOYMENT COMMANDS

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create shrt-db
# Copy database_id to wrangler.toml

# Create KV namespace
wrangler kv:namespace create LINKS
# Copy id to wrangler.toml

# Run migrations
wrangler d1 execute shrt-db --file=schema.sql

# Deploy worker
wrangler deploy

# Deploy pages (frontend)
npx wrangler pages deploy ./pages
```

---

## 📊 MONITORING & ANALYTICS

### Cloudflare Analytics (Built-in)
- Request counts
- Response times
- Geographic distribution
- Cache hit ratios

### Custom Analytics (D1)
- Click counts per link
- Click timestamps
- Referrer sources
- Geographic data (country, city)
- Device types (desktop/mobile)

### Tools
- Cloudflare Analytics Dashboard (free)
- Custom stats API (`GET /api/stats/:code`)

---

## 🔒 SECURITY CONSIDERATIONS

### MVP
- URL validation (prevent XSS through redirects)
- Rate limiting (prevent abuse)
- SQL injection prevention (use prepared statements)
- CORS headers (proper origins)

### Optional (with user accounts)
- Password hashing (bcrypt)
- JWT tokens with expiration
- HTTPS only
- API key authentication

---

## 💰 COST BREAKDOWN

### Free Tier Limits (Cloudflare)
- Workers: 100,000 requests/day
- KV: 100,000 reads/day, 1,000 writes/day
- D1: 5GB storage, 5 million rows
- Pages: Unlimited bandwidth

### When to Upgrade
- Exceed 100,000 daily requests → Workers Paid ($5/mo)
- Exceed KV limits → More KV namespaces or upgrade
- Need more storage → D1 Paid ($0.50/GB)

**MVP Cost**: $0/month (well within free tier)

---

## ✅ ACCEPTANCE CRITERIA

### MVP (Must Have)
- [ ] User can paste URL and get shortened link
- [ ] Custom shortcodes work (optional input)
- [ ] Auto-generated shortcodes work (6 chars)
- [ ] Redirects work (301)
- [ ] Clicks are counted accurately
- [ ] Stats API returns correct data
- [ ] Frontend is functional and responsive
- [ ] Works on mobile devices
- [ ] Errors are displayed clearly

### Nice to Have
- [ ] QR code generation for links
- [ ] Click count display on frontend
- [ ] Copy to clipboard button
- [ ] Dark mode support
- [ ] Loading states and animations

---

## 🐛 COMMON ISSUES & SOLUTIONS

### KV Cache Invalidation
- Problem: Link updated but KV cache still has old URL
- Solution: Add TTL to KV entries (e.g., 24 hours) or manual invalidation

### High Traffic on Redirects
- Problem: Too many KV reads hitting limit
- Solution: Use Cloudflare Cache on responses, not just KV

### Short Code Collisions
- Problem: Random code already exists
- Solution: Retry with new code (already implemented)

### Analytics Overhead
- Problem: Writing to D1 on every click is slow
- Solution: Increment KV counter immediately, batch insert to D1 later

---

## 📚 RESOURCES

### Documentation
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Workers KV Docs](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

### Examples
- [Cloudflare Workers Examples](https://github.com/cloudflare/workers-sdk/tree/main/templates)
- [URL Shortener Workers](https://github.com/search?q=url+shortener+cloudflare+workers)

---

## 🎯 NEXT STEPS

1. **Setup Cloudflare Account & Wrangler**
   - Create account at cloudflare.com
   - Install wrangler: `npm install -g wrangler`
   - Login: `wrangler login`

2. **Configure Domain**
   - Add shrt.name to Cloudflare
   - Point DNS to Workers
   - Configure SSL (auto)

3. **Create Infrastructure**
   - Run initialization commands from Phase 1
   - Update wrangler.toml with IDs

4. **Start Implementation**
   - Begin with Phase 2 (Core URL Shortening)
   - Test each phase before moving to next

5. **Deploy & Test**
   - Deploy worker: `wrangler deploy`
   - Deploy pages: `npx wrangler pages deploy ./pages`
   - Test thoroughly end-to-end

---

**Ready to implement? Start with Phase 1 and work through each phase systematically!**

**Estimated Total Time**: 20-30 hours for full MVP
**Timeline**: 1 week (part-time) or 2-3 days (full-time)

---

*Created by Sisyphus (Planner Mode)*
*Date: 2026-01-11*
