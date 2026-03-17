# AGENTS.md // SHRT.NAME PROJECT GUIDE

> **FOR AI CODING AGENTS**: This document contains essential information about the shrt.name project architecture, conventions, and development workflows. Read this before making any changes.

---

## Project Overview

**shrt.name** is a retro-futuristic URL shortener built entirely on Cloudflare's edge infrastructure. It features a distinctive synthwave/neo-cyberpunk aesthetic with multiple visual variants.

**Core Philosophy**: Simple, fast, free, serverless. Zero-cost operation on Cloudflare's free tier.

**Domain**: https://shrt.name

### Key Features
- URL shortening with auto-generated or custom short codes
- Click analytics and statistics
- QR code generation
- Rate limiting and security protections
- Real-time click tracking

---

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Runtime** | Cloudflare Workers | Serverless edge compute |
| **Database** | Cloudflare D1 (SQLite) | Persistent link storage |
| **Cache** | Workers KV | Fast lookups, rate limiting, sessions |
| **Language** | JavaScript (ES Modules) | Backend logic |
| **Frontend** | Vanilla HTML/CSS/JS | UI (embedded in worker) |
| **Deployment** | Wrangler CLI | Deploy to Cloudflare |

---

## Project Structure

```
shrt.name/
├── workers/                    # Cloudflare Worker backend
│   ├── src/
│   │   ├── index.js           # Main worker entry point
│   │   ├── db.js              # D1 database operations
│   │   ├── kv.js              # KV cache operations
│   │   ├── utils.js           # Helper functions
│   │   ├── middleware/
│   │   │   ├── cors.js        # CORS handling
│   │   │   └── ratelimit.js   # Rate limiting
│   │   ├── routes/
│   │   │   ├── shorten.js     # POST /api/shorten
│   │   │   ├── redirect.js    # GET /:code
│   │   │   └── stats.js       # GET /api/stats/:code
│   │   └── ui.js              # Unified UI HTML
│   ├── wrangler.toml          # Cloudflare configuration
│   ├── package.json           # NPM dependencies
│   └── schema.sql             # Database schema
│
├── pages/                      # Static frontend (Cloudflare Pages)
│   ├── index.html             # Main synthwave page
│   ├── css/style.css          # Stylesheet
│   ├── js/app.js              # Frontend JavaScript
│
├── docs/                       # Documentation
│   ├── shrt-name.md           # Implementation plan
│   ├── frontend-redesign.md   # Design system docs
│   └── frontend-unification.md # UI unification documentation
│
├── examples/                   # Example/reference projects
│   ├── Sink-master/           # Nuxt-based URL shortener example
│   └── slash-main/            # Go-based URL shortener example
│
└── README.md                   # User-facing documentation
```

---

## Build and Development Commands

### Prerequisites
- Node.js and npm installed
- Wrangler CLI: `npm install -g wrangler`
- Cloudflare account with domain added

### Local Development

```bash
# Navigate to workers directory
cd workers

# Install dependencies
npm install

# Start local development server
npm run dev
# or
wrangler dev

# Server runs at http://localhost:8787
```

### Testing Endpoints (Local)

```bash
# Shorten a URL
curl -X POST http://localhost:8787/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "code": "custom-code"}'

# Get stats
curl http://localhost:8787/api/stats/abc123

# Test redirect
curl -I http://localhost:8787/abc123
```

### Deployment

```bash
# Deploy worker to Cloudflare
cd workers
npm run deploy
# or
wrangler deploy

# Deploy static pages (if using Pages)
npx wrangler pages deploy ./pages
```

### Database Operations

```bash
# Create D1 database (one-time setup)
wrangler d1 create shrt-name

# Execute schema
wrangler d1 execute shrt-name --file=schema.sql

# Create KV namespace (one-time setup)
wrangler kv:namespace create LINKS
```

---

## Configuration

### wrangler.toml

The main configuration file is located at `workers/wrangler.toml`:

```toml
name = "shrt-name"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
ENVIRONMENT = "production"
DOMAIN = "shrt.name"

# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "shrt-name"
database_id = "YOUR_DATABASE_ID_HERE"

# KV Namespace
[[kv_namespaces]]
binding = "LINKS"
id = "YOUR_KV_NAMESPACE_ID_HERE"

# Routes (uncomment after domain setup)
routes = [
  { pattern = "https://shrt.name/*", zone_name = "shrt.name" }
]
```

**IMPORTANT**: Never commit the actual `database_id` or KV `id` to public repositories. Use environment-specific configs.

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/shorten` | POST | Create a short URL |
| `GET /api/stats/:code` | GET | Get link statistics |
| `GET /:code` | GET | Redirect to original URL |
| `OPTIONS *` | OPTIONS | CORS preflight |

### POST /api/shorten

Request:
```json
{
  "url": "https://example.com/very/long/url",
  "code": "custom-code"  // optional
}
```

Response:
```json
{
  "success": true,
  "short_url": "https://shrt.name/abc123",
  "code": "abc123",
  "original_url": "https://example.com/very/long/url",
  "custom_code": false
}
```

Error codes:
- `400` - Invalid URL or code format
- `409` - Code already taken
- `429` - Rate limit exceeded
- `500` - Internal server error

---

## Code Style Guidelines

### JavaScript

- Use ES Modules (`import`/`export`)
- Async/await preferred over callbacks
- Use camelCase for variables/functions
- Use PascalCase for classes
- JSDoc comments for function documentation

```javascript
/**
 * Brief description of function
 * @param {Request} request - The incoming request
 * @param {Object} env - Environment bindings
 * @returns {Promise<Response>} The response
 */
export async function handler(request, env) {
  // Implementation
}
```

### Naming Conventions

- Files: `lowercase-with-dashes.js` or `descriptiveName.js`
- Database functions: `createLink`, `getLinkByCode`, `codeExists`
- KV functions: `cacheLink`, `getLinkFromCache`, `incrementClickCount`
- Route handlers: `shorten`, `redirect`, `stats`

### Error Handling

Always use the utility functions for responses:

```javascript
import { jsonResponse, errorResponse } from './utils.js';

// Success
return jsonResponse({ success: true, data: result });

// Error
return errorResponse('Invalid URL', 400);
```

---

## Database Schema

### Tables

**links** - Stores URL mappings
```sql
CREATE TABLE links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  original_url TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  custom_code BOOLEAN DEFAULT 0,
  user_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME
);
```

**analytics** - Click tracking
```sql
CREATE TABLE analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_id INTEGER NOT NULL,
  clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  country TEXT,
  city TEXT,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT
);
```

**users** - Optional user accounts
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  api_key TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### KV Key Patterns

```
links:{code}      → JSON link data (cache)
clicks:{link_id}  → Integer click count
ratelimit:{ip}    → Rate limit data
session:{token}   → Session data
```

---

## Testing

### Manual Testing Checklist

Before deploying, verify:

1. **URL Shortening**
   - [ ] Valid URL creates short link
   - [ ] Invalid URL returns 400
   - [ ] Custom codes work
   - [ ] Duplicate custom code returns 409
   - [ ] Auto-generated codes are unique

2. **Redirects**
   - [ ] Existing code redirects (301)
   - [ ] Non-existent code returns 404
   - [ ] Clicks are tracked

3. **Stats**
   - [ ] Returns correct click count
   - [ ] Shows creation date
   - [ ] Returns 404 for invalid code

4. **Rate Limiting**
   - [ ] Limits requests after 60/minute
   - [ ] Returns 429 with retry info

5. **Security**
   - [ ] Blocks localhost URLs
   - [ ] Blocks private IPs
   - [ ] Validates URL format
   - [ ] CORS headers present

### Testing Commands

```bash
# Test URL shortening
curl -X POST http://localhost:8787/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Test with custom code
curl -X POST http://localhost:8787/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "code": "mycode"}'

# Test invalid URL
curl -X POST http://localhost:8787/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "not-a-url"}'

# Test redirect
curl -I http://localhost:8787/mycode

# Test stats
curl http://localhost:8787/api/stats/mycode
```

---

## Security Considerations

### URL Validation
- Only `http:` and `https:` protocols allowed
- Localhost and private IPs blocked (127.x.x.x, 192.168.x.x, 10.x.x.x)
- Reserved codes blocked: `api`, `admin`, `login`, `register`, `dashboard`, `stats`

### Rate Limiting
- 60 requests per minute per IP for API endpoints
- Implemented via KV with sliding window
- Returns `429` status with `Retry-After` info

### SQL Injection Prevention
- Always use prepared statements
- Never concatenate SQL with user input

```javascript
// CORRECT
await db.prepare('SELECT * FROM links WHERE code = ?').bind(code).first();

// WRONG - NEVER DO THIS
await db.prepare(`SELECT * FROM links WHERE code = '${code}'`).first();
```

### CORS
- Origin set to `*` for public API
- Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Headers: `Content-Type, Authorization`

---



## Common Issues & Solutions

### KV Cache Not Updating
Links are cached for 24 hours. To force refresh during development, use a new code or manually delete KV entries.

### Rate Limit During Testing
The rate limit is 60 requests/minute. If you hit it during testing, wait 60 seconds or restart the dev server.

### Database Connection Errors
Verify:
1. `database_id` in `wrangler.toml` is correct
2. Database exists: `wrangler d1 list`
3. Schema is applied: `wrangler d1 execute shrt-name --file=schema.sql`

### KV Namespace Errors
Verify:
1. KV `id` in `wrangler.toml` is correct
2. Namespace exists: `wrangler kv:namespace list`

### CORS Errors in Browser
Ensure the worker is returning proper CORS headers. Check browser Network tab for preflight responses.

---

## Environment Variables

Set in `wrangler.toml` under `[vars]`:

| Variable | Description | Default |
|----------|-------------|---------|
| `ENVIRONMENT` | Environment name | `production` |
| `DOMAIN` | Your domain | `shrt.name` |

Set secrets (never commit these):

```bash
wrangler secret put SECRET_KEY
```

---

## Cost & Limits

**Free Tier Limits:**
- Workers: 100,000 requests/day
- KV: 100,000 reads/day, 1,000 writes/day
- D1: 5GB storage, 5 million rows
- Pages: Unlimited bandwidth

**Current usage is well within free tier.**

---

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Workers KV Docs](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

---

## Notes for AI Agents

1. **Always test changes locally** with `wrangler dev` before deploying
2. **Never hardcode secrets** - use environment variables
3. **Keep the aesthetic consistent** - all UI changes must match the synthwave theme
4. **Preserve rate limiting** - don't remove or weaken security measures
5. **Use prepared statements** - always for database queries
6. **Minify frontend code** for production when possible
7. **Check CORS headers** when modifying API responses
8. **Validate all user input** - URLs, custom codes, etc.

---

*Last updated: 2026-03-17*
*Project: shrt.name // SYNTHWAVE URL SHORTENER*
