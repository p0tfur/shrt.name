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
- **📱 Mobile Friendly**: Fully responsive design with dark mode support
- **🎮 Interactive**: Sound effects, animations, and particle systems

## 🎨 AESTHETIC VARIANTS

shrt.name supports **4 unique aesthetic variants** - choose the one that fits your brand!

### Available Variants

| Variant | URL | Description | Best For |
|---------|-----|-------------|----------|
| **Synthwave** | `/` or `?variant=synthwave` | Retro-futuristic, neon glow, CRT effects | Tech brands, developers |
| **Luxury** | `?variant=luxury` | Premium, elegant, gold accents | Enterprise, luxury services |
| **Playful** | `?variant=playful` | Colorful, bouncy, fun & friendly | Social apps, casual use |
| **Industrial** | `?variant=industrial` | Brutalist, terminal-like, functional | Dev tools, CLI apps |

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
# Synthwave (default)
http://localhost:8787/

# Luxury
http://localhost:8787/?variant=luxury

# Playful
http://localhost:8787/?variant=playful

# Industrial
http://localhost:8787/?variant=industrial
```

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
https://shrt.name/                    # Synthwave (default)
https://shrt.name/?variant=luxury   # Luxury
https://shrt.name/?variant=playful  # Playful
https://shrt.name/?variant=industrial # Industrial
```

---

## 🎯 Variant Comparison

| Feature | Synthwave | Luxury | Playful | Industrial |
|---------|-----------|---------|----------|-------------|
| **Colors** | Neon dark | Gold/cream | Pastel bright | Grayscale |
| **Typography** | Orbitron/Mono | Cormorant/Montserrat | Fredoka/Nunito | JetBrains/Code Pro |
| **Animations** | Glitch, particles | Smooth, elegant | Bouncy, confetti | Minimal, instant |
| **Character** | Retro-futuristic | Premium | Fun/Playful | Brutalist |
| **Best For** | Tech brands | Enterprise | Social apps | Dev tools |
| **Lines CSS** | ~800 | ~600 | ~700 | ~500 |

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

### GET /api/stats/:code

Get statistics for a link.

**Response:**
```json
{
  "success": true,
  "code": "abc123",
  "original_url": "https://example.com/very/long/url",
  "clicks": 123,
  "created_at": "2026-01-01T00:00:00.000Z",
  "custom_code": false,
  "expires_at": null
}
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
│   │       ├── shorten.js
│   │       ├── redirect.js
│   │       └── stats.js
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

# Get stats
curl http://localhost:8787/api/stats/abc123
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

- [ ] User accounts and authentication
- [ ] Link management dashboard
- [ ] QR code download options
- [ ] Advanced analytics (graphs, charts)
- [ ] Custom domains for users
- [ ] Link expiration settings
- [ ] API keys for programmatic access

---

Made with 💜 in the future // SYNTHWAVE AESTHETIC
