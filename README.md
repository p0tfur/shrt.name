# ⚡ shrt.name // SYNTHWAVE URL SHORTENER

A retro-futuristic, fast, and free URL shortener built entirely on Cloudflare Workers.

**Aesthetic**: Neo-cyberpunk / Synthwave interface with neon glow effects, CRT overlays, and glitch animations.

## ✨ Features

- **🎨 Distinctive Design**: Synthwave aesthetic with neon colors and retro-futuristic UI
- **🚀 Fast**: Powered by Cloudflare's global edge network
- **💰 Free**: Runs entirely on Cloudflare's free tier ($0/month)
- **⚡ Simple**: No account needed for basic URL shortening
- **🎯 Custom Codes**: Create memorable short URLs (optional)
- **📊 Analytics**: Track click counts per link
- **📱 QR Codes**: Automatically generated for each short URL
- **📦 Bulk Shortening**: Shorten up to 10 URLs at once
- **🎛️ Admin Panel**: Manage all links (delete, edit, view stats)
- **💾 Style Persistence**: Your chosen aesthetic is saved in localStorage
- **📱 Mobile Friendly**: Fully responsive design with dark mode support
- **🎮 Interactive**: Sound effects, animations, glitch effects, and particle systems

## 🎨 AESTHETIC VARIANTS

shrt.name supports **12 unique aesthetic variants** - choose the one that fits your brand!

### Available Variants

| Variant | URL | Description | Best For |
|---------|-----|-------------|----------|
| **CYBER GLITCH** | `/` (default) | High contrast, glitch effects, aggressive geometry | Cyberpunk, tech, gaming |
| **Synthwave** | `?variant=synthwave` | Retro-futuristic, neon glow, CRT effects | Tech brands, developers |
| **Luxury** | `?variant=luxury` | Premium, elegant, gold accents | Enterprise, luxury services |
| **Playful** | `?variant=playful` | Colorful, bouncy, fun & friendly | Social apps, casual use |
| **Industrial** | `?variant=industrial` | Brutalist, terminal-like, functional | Dev tools, CLI apps |
| **Brutalist** | `?variant=brutalist` | Raw, geometric, anti-design | Artists, bold brands |
| **Art Deco** | `?variant=artdeco` | 1920s elegance, geometric patterns | Luxury, vintage |
| **Editorial** | `?variant=editorial` | Magazine-style, typography focused | Publishers, blogs |
| **Maximalist Chaos** | `?variant=maximalist-chaos` | Chaotic, colorful, overwhelming | Creative, experimental |
| **Organic** | `?variant=organic` | Natural, flowing, soft shapes | Wellness, eco brands |
| **Soft Pastel** | `?variant=softpastel` | Gentle colors, calming | Lifestyle, wellness |
| **Retro-futurystyczny** | `?variant=retro-futurystyczny` | Polish retro sci-fi | Nostalgia, sci-fi |

**Note:** First 6 variants are embedded in the worker. Variants 7-12 are served from `/pages/varianty/` folder.

### How to Access Variants

**Default (Synthwave)**:
```
https://shrt.name/
```

**Specific Variant**:
```
https://shrt.name/?variant=luxury
https://shrt.name/?variant=playful
https://shrt.name/?variant=industrial
```

**Local Development**:
```
# Embedded variants (in worker)
http://localhost:8787/                          # CYBER GLITCH (default)
http://localhost:8787/?variant=synthwave
http://localhost:8787/?variant=luxury
http://localhost:8787/?variant=playful
http://localhost:8787/?variant=industrial
http://localhost:8787/?variant=brutalist

# Additional variants (in pages/varianty/)
http://localhost:8787/varianty/artdeco.html
http://localhost:8787/varianty/editorial.html
http://localhost:8787/varianty/maximalist-chaos.html
http://localhost:8787/varianty/organic.html
http://localhost:8787/varianty/softpastel.html
http://localhost:8787/varianty/retro-futurystyczny.html
```

**🎨 Style Persistence**
Your chosen style is automatically saved in browser's localStorage and will be restored on your next visit.

---

## 🚀 Quick Start

### Prerequisites

- Cloudflare account (free)
- Node.js and npm
- Domain name (e.g., shrt.name)

### Installation

1. **Clone or navigate to project:**
```bash
cd shrt.name
```

2. **Install Wrangler CLI:**
```bash
npm install -g wrangler
```

3. **Login to Cloudflare:**
```bash
wrangler login
```

4. **Navigate to workers directory:**
```bash
cd workers
```

5. **Create D1 database:**
```bash
wrangler d1 create shrt-db
```
Copy `database_id` from output and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "shrt-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

6. **Create KV namespace:**
```bash
wrangler kv:namespace create LINKS
```
Copy `id` from output and update `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "LINKS"
id = "YOUR_KV_NAMESPACE_ID_HERE"
```

7. **Run database migrations:**
```bash
wrangler d1 execute shrt-db --file=schema.sql
```

8. **Deploy worker:**
```bash
wrangler deploy
```

9. **Configure your domain:**
   - Add your domain to Cloudflare
   - Update `wrangler.toml` to include your routes:
```toml
routes = [
  { pattern = "https://shrt.name/*", zone_name = "shrt.name" }
]
```
   - Deploy again: `wrangler deploy`

10. **Test it!**
Visit your domain and test all variants:
```
# Main variants
https://shrt.name/                          # CYBER GLITCH (default)
https://shrt.name/?variant=synthwave
https://shrt.name/?variant=luxury
https://shrt.name/?variant=playful
https://shrt.name/?variant=industrial
https://shrt.name/?variant=brutalist

# Additional variants
https://shrt.name/varianty/artdeco.html
https://shrt.name/varianty/editorial.html
https://shrt.name/varianty/organic.html
https://shrt.name/varianty/softpastel.html
```

---

## 🎯 Variant Comparison (Top 6)

| Feature | CYBER GLITCH | Synthwave | Luxury | Playful | Industrial | Brutalist |
|---------|--------------|-----------|---------|----------|-------------|-----------|
| **Colors** | Yellow/Pink/Cyan | Neon dark | Gold/cream | Pastel bright | Grayscale | B&W + red |
| **Typography** | JetBrains/VT323 | Orbitron/Mono | Cormorant/Montserrat | Fredoka/Nunito | JetBrains/Code Pro | Impact/Mono |
| **Animations** | Glitch, scanlines | Glitch, particles | Smooth, elegant | Bouncy, confetti | Minimal, instant | Hard cuts |
| **Character** | Aggressive cyberpunk | Retro-futuristic | Premium | Fun/Playful | Brutalist | Raw/Anti-design |
| **Best For** | Gaming, tech | Tech brands | Enterprise | Social apps | Dev tools | Artists |
| **Sharp edges** | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |

## 📡 API Endpoints

### POST /api/shorten

Create a short URL.

**Request:**
```json
{
  "url": "https://example.com/very/long/url",
  "code": "custom-code"  // optional
}
```

**Response:**
```json
{
  "success": true,
  "short_url": "https://shrt.name/abc123",
  "code": "abc123",
  "original_url": "https://example.com/very/long/url",
  "custom_code": false
}
```

**Errors:**
- `400` - Invalid URL or code format
- `409` - Code already taken
- `429` - Rate limit exceeded (60 requests per minute)
- `500` - Internal server error

### GET /:code

Redirect to original URL and track click.

**Response:** 301 redirect to original URL

### POST /api/shorten/bulk

Create multiple short URLs at once (max 10 URLs per request).

**Request:**
```json
{
  "urls": [
    { "url": "https://example.com/page1" },
    { "url": "https://example.com/page2", "code": "custom1" },
    { "url": "https://example.com/page3" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "processed": 3,
  "successful": 3,
  "failed": 0,
  "results": [
    {
      "index": 0,
      "success": true,
      "short_url": "https://shrt.name/abc123",
      "code": "abc123",
      "original_url": "https://example.com/page1",
      "custom_code": false
    }
  ],
  "errors": []
}
```

### GET /api/stats/:code

Get statistics for a link.

**Response:**
```json
{
  "success": true,
  "code": "abc123",
  "original_url": "https://example.com/very/long/url",
  "clicks": 123,
  "created_at": "2024-01-01T00:00:00.000Z",
  "custom_code": false,
  "expires_at": null
}
```

## 🎛️ Admin Panel

Access the admin panel at `/admin` to manage all shortened links:

### Features
- **View all links**: List of all shortened URLs with stats
- **Click analytics**: Total clicks per link (real-time from KV)
- **Edit links**: Update the destination URL
- **Delete links**: Remove unwanted short URLs
- **Statistics**: Total links, total clicks, custom codes count

### Admin API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin` | GET | Admin panel HTML interface |
| `/api/admin/links` | GET | List all links with statistics |
| `/api/admin/links/:code` | DELETE | Delete a specific link |
| `/api/admin/links/:code` | PUT | Update link's destination URL |

**Example - Delete a link:**
```bash
curl -X DELETE http://localhost:8787/api/admin/links/abc123
```

**Example - Update a link:**
```bash
curl -X PUT http://localhost:8787/api/admin/links/abc123 \
  -H "Content-Type: application/json" \
  -d '{"url": "https://new-destination.com"}'
```

## 🗄️ Database Schema

### Links
```sql
CREATE TABLE links (
  id INTEGER PRIMARY KEY,
  original_url TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  custom_code BOOLEAN DEFAULT FALSE,
  user_id INTEGER,
  created_at DATETIME,
  expires_at DATETIME
);
```

### Analytics
```sql
CREATE TABLE analytics (
  id INTEGER PRIMARY KEY,
  link_id INTEGER NOT NULL,
  clicked_at DATETIME,
  country TEXT,
  city TEXT,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT
);
```

## 💾 Storage

- **Workers KV**: Fast cache for link lookups and click counts
- **D1 Database**: Persistent storage for links and analytics

## 🛡️ Security

- URL validation (prevents XSS through redirects)
- Rate limiting (60 requests/minute per IP)
- Blocked localhost and private IPs
- SQL injection prevention (prepared statements)
- CORS headers

## 💰 Cost

**$0/month** - Everything runs on Cloudflare's free tier:

- Workers: 100,000 requests/day
- KV: 100,000 reads/day, 1,000 writes/day
- D1: 5GB storage, 5 million rows
- Pages: Unlimited bandwidth

## 📁 Project Structure

```
shrt.name/
├── workers/
│   ├── src/
│   │   ├── index.js              # Main worker
│   │   ├── db.js                 # D1 operations
│   │   ├── kv.js                 # KV operations
│   │   ├── utils.js              # Utilities
│   │   ├── middleware/
│   │   │   ├── cors.js
│   │   │   └── ratelimit.js
│   │   └── routes/
│   │       ├── shorten.js      # + bulkShorten()
│   │       ├── redirect.js
│   │       ├── stats.js
│   │       └── admin.js        # Admin API
│   │   └── variants/
│   │       ├── synthwave.js    # Default variant
│   │       ├── luxury.js
│   │       ├── playful.js
│   │       ├── industrial.js
│   │       └── switcher.js
│   ├── wrangler.toml
│   ├── package.json
│   └── schema.sql
├── pages/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── README.md
```

## 🔧 Local Development

1. **Start local development server:**
```bash
cd workers
npm run dev
```

2. **Test endpoints:**
```bash
# Shorten a URL
curl -X POST http://localhost:8787/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Bulk shorten (up to 10 URLs)
curl -X POST http://localhost:8787/api/shorten/bulk \
  -H "Content-Type: application/json" \
  -d '{"urls": [{"url": "https://example.com/1"}, {"url": "https://example.com/2"}]}'

# Get stats
curl http://localhost:8787/api/stats/abc123

# Open admin panel
open http://localhost:8787/admin
```

## 🚨 Common Issues

### Database connection errors
Make sure you've created the D1 database and updated `wrangler.toml` with the correct `database_id`.

### KV namespace errors
Make sure you've created the KV namespace and updated `wrangler.toml` with the correct `id`.

### Rate limit errors
Wait for the rate limit to reset (60 seconds window) or adjust the limit in `src/middleware/ratelimit.js`.

### Custom code conflicts
If you get a "code already taken" error, try a different custom code or omit it for auto-generation.

## 📊 Monitoring

View your analytics in the Cloudflare Dashboard:
1. Go to Workers & Pages
2. Select your worker
3. View request logs, errors, and performance metrics

## 🤝 Contributing

Feel free to open issues or submit pull requests!

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🎯 Future Enhancements

- [x] Bulk URL shortening
- [x] Admin panel with link management
- [x] Multiple aesthetic variants
- [ ] User accounts and authentication
- [ ] Advanced analytics (graphs, charts)
- [ ] Custom domains for users
- [ ] Link expiration settings
- [ ] API keys for programmatic access
- [ ] Password-protected links

---

Made with 💜 in the future // SYNTHWAVE AESTHETIC
