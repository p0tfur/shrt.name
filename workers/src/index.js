/**
 * Main Cloudflare Worker - URL Shortener
 */

import { cors } from './middleware/cors.js';
import { rateLimit } from './middleware/ratelimit.js';
import { shorten, bulkShorten } from './routes/shorten.js';
import { redirect } from './routes/redirect.js';
import { stats } from './routes/stats.js';
import { adminList, adminDelete, adminUpdate } from './routes/admin.js';
import { errorResponse } from './utils.js';
import { mainHTML } from './ui.js';
import { crosspostingHTML } from './seo-pages/crossposting.js';
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight for ALL requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    // Rate limiting for API endpoints
    if (path.startsWith('/api/')) {
      const rateLimitResult = await rateLimit(request, env.LINKS, 60, 60);
      if (rateLimitResult) return rateLimitResult;
    }

    // Route handling
    try {
      // API: Shorten URL
      if (path === '/api/shorten' && request.method === 'POST') {
        return shorten(request, env);
      }

      // API: Bulk Shorten URLs
      if (path === '/api/shorten/bulk' && request.method === 'POST') {
        return bulkShorten(request, env);
      }

      // API: Get stats
      if (path.startsWith('/api/stats/') && request.method === 'GET') {
        const code = path.replace('/api/stats/', '');
        return stats(request, env, code);
      }

      // API: Admin - List all links
      if (path === '/api/admin/links' && request.method === 'GET') {
        return adminList(request, env);
      }

      // API: Admin - Delete link
      if (path.startsWith('/api/admin/links/') && request.method === 'DELETE') {
        const code = path.replace('/api/admin/links/', '');
        return adminDelete(request, env, code);
      }

      // API: Admin - Update link
      if (path.startsWith('/api/admin/links/') && request.method === 'PUT') {
        const code = path.replace('/api/admin/links/', '');
        return adminUpdate(request, env, code);
      }

      // Serve static frontend files
      if (path === '/' || path === '/index.html') {
        return new Response(mainHTML, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
          }
        });
      }

      // Serve Crossposting SEO Page
      if (path === '/crossposting' || path === '/crossposting/') {
        return new Response(crosspostingHTML, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
          }
        });
      }

      // Serve Crossposting SEO Page
      if (path === '/crossposting' || path === '/crossposting/') {
        return new Response(crosspostingHTML, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
          }
        });
      }

      // Admin Panel HTML
      if (path === '/admin' || path === '/admin/') {
        const adminHTML = await getAdminHTML(env);
        return new Response(adminHTML, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
          }
        });
      }

      // Redirect: Everything else is treated as a short code
      return redirect(request, env, path.replace('/', ''));

    } catch (error) {
      console.error('Error in main handler:', error);
      return errorResponse('Internal server error', 500);
    }
  }
};

/**
 * Generate Admin Panel HTML
 */
async function getAdminHTML(env) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>shrt.name // ADMIN PANEL</title>
  <style>
    :root {
      --neon-cyan: #00f3ff;
      --neon-magenta: #ff00ff;
      --neon-purple: #bc13fe;
      --neon-green: #00ff88;
      --bg-void: #0a0a0f;
      --bg-grid: #1a1a2e;
      --text-primary: #ffffff;
      --text-secondary: #b8b8d4;
      --text-muted: #666699;
      --font-mono: 'Space Mono', monospace;
    }
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--font-mono);
      background: var(--bg-void);
      color: var(--text-primary);
      min-height: 100vh;
      padding: 2rem;
      line-height: 1.6;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    .header {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid var(--neon-cyan);
    }
    .logo {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.05em;
      margin-bottom: 0.5rem;
    }
    .logo-prefix { color: var(--neon-cyan); text-shadow: 0 0 10px var(--neon-cyan); }
    .logo-separator { color: var(--neon-magenta); }
    .logo-suffix { color: var(--neon-purple); text-shadow: 0 0 10px var(--neon-purple); }
    .tagline { color: var(--text-secondary); font-size: 0.875rem; letter-spacing: 0.3em; text-transform: uppercase; }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: rgba(26, 26, 46, 0.8);
      border: 2px solid rgba(0, 243, 255, 0.2);
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--neon-cyan);
      text-shadow: 0 0 10px var(--neon-cyan);
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 0.5rem;
    }
    
    .section {
      background: rgba(26, 26, 46, 0.8);
      border: 2px solid rgba(0, 243, 255, 0.2);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .section-title {
      font-size: 1.25rem;
      color: var(--neon-magenta);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .link-table {
      width: 100%;
      border-collapse: collapse;
    }
    .link-table th,
    .link-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid rgba(0, 243, 255, 0.1);
    }
    .link-table th {
      color: var(--neon-cyan);
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
    }
    .link-table tr:hover {
      background: rgba(0, 243, 255, 0.05);
    }
    .short-code {
      color: var(--neon-green);
      font-weight: 700;
    }
    .original-url {
      color: var(--text-secondary);
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .clicks { color: var(--neon-cyan); font-weight: 700; }
    
    .btn {
      padding: 0.5rem 1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      margin-right: 0.5rem;
    }
    .btn-edit {
      background: rgba(0, 243, 255, 0.2);
      color: var(--neon-cyan);
      border: 1px solid var(--neon-cyan);
    }
    .btn-edit:hover {
      background: var(--neon-cyan);
      color: var(--bg-void);
    }
    .btn-delete {
      background: rgba(255, 0, 255, 0.2);
      color: var(--neon-magenta);
      border: 1px solid var(--neon-magenta);
    }
    .btn-delete:hover {
      background: var(--neon-magenta);
      color: var(--bg-void);
    }
    
    .back-link {
      display: inline-block;
      margin-top: 2rem;
      color: var(--neon-cyan);
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.875rem;
    }
    .back-link:hover {
      text-shadow: 0 0 10px var(--neon-cyan);
    }
    
    .loading {
      text-align: center;
      padding: 2rem;
      color: var(--text-muted);
    }
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-muted);
    }
    
    @media (max-width: 768px) {
      body { padding: 1rem; }
      .link-table { font-size: 0.75rem; }
      .link-table th, .link-table td { padding: 0.5rem; }
      .original-url { max-width: 150px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1 class="logo">
        <span class="logo-prefix">SHRT</span><span class="logo-separator">//</span><span class="logo-suffix">ADMIN</span>
      </h1>
      <p class="tagline">MANAGE//YOUR//LINKS</p>
    </header>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value" id="total-links">-</div>
        <div class="stat-label">Total Links</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="total-clicks">-</div>
        <div class="stat-label">Total Clicks</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="custom-codes">-</div>
        <div class="stat-label">Custom Codes</div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">All Links</h2>
      <div id="links-container">
        <div class="loading">Loading...</div>
      </div>
    </div>
    
    <a href="/" class="back-link">← Back to Home</a>
  </div>

  <script>
    async function loadStats() {
      try {
        const response = await fetch('/api/admin/links');
        const data = await response.json();
        
        if (data.success) {
          document.getElementById('total-links').textContent = data.links.length;
          document.getElementById('total-clicks').textContent = data.totalClicks || 0;
          document.getElementById('custom-codes').textContent = 
            data.links.filter(l => l.custom_code).length;
          
          renderLinks(data.links);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        document.getElementById('links-container').innerHTML = 
          '<div class="empty-state">Error loading data</div>';
      }
    }
    
    function renderLinks(links) {
      if (links.length === 0) {
        document.getElementById('links-container').innerHTML = 
          '<div class="empty-state">No links found</div>';
        return;
      }
      
      const html = \`
        <table class="link-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Original URL</th>
              <th>Clicks</th>
              <th>Type</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            \${links.map(link => \`
              <tr data-code="\${link.code}">
                <td class="short-code">\${link.code}</td>
                <td class="original-url" title="\${link.original_url}">\${link.original_url}</td>
                <td class="clicks">\${link.clicks || 0}</td>
                <td>\${link.custom_code ? 'Custom' : 'Auto'}</td>
                <td>\${new Date(link.created_at).toLocaleDateString()}</td>
                <td>
                  <button class="btn btn-edit" onclick="editLink('\${link.code}')">Edit</button>
                  <button class="btn btn-delete" onclick="deleteLink('\${link.code}')">Delete</button>
                </td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      \`;
      
      document.getElementById('links-container').innerHTML = html;
    }
    
    async function deleteLink(code) {
      if (!confirm(\`Are you sure you want to delete "\${code}"?\`)) return;
      
      try {
        const response = await fetch(\`/api/admin/links/\${code}\`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        if (data.success) {
          loadStats();
        } else {
          alert('Error: ' + (data.error || 'Failed to delete'));
        }
      } catch (error) {
        alert('Error deleting link');
      }
    }
    
    async function editLink(code) {
      const newUrl = prompt('Enter new URL:');
      if (!newUrl) return;
      
      try {
        const response = await fetch(\`/api/admin/links/\${code}\`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: newUrl })
        });
        
        const data = await response.json();
        if (data.success) {
          loadStats();
        } else {
          alert('Error: ' + (data.error || 'Failed to update'));
        }
      } catch (error) {
        alert('Error updating link');
      }
    }
    
    loadStats();
  </script>
</body>
</html>`;
}
