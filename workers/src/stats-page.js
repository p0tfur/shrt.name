/**
 * Stats Page HTML - Dedicated statistics view
 */

export function getStatsHTML(code) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stats: ${code} - shrt.name</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0a0a0f;
      --bg-secondary: #1a1a2e;
      --bg-card: rgba(26, 26, 46, 0.6);
      --accent-primary: #00d4ff;
      --accent-secondary: #7c3aed;
      --accent-success: #10b981;
      --text-primary: #ffffff;
      --text-secondary: #9ca3af;
      --text-muted: #6b7280;
      --font-display: 'Orbitron', system-ui, sans-serif;
      --font-mono: 'Space Mono', monospace;
    }
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: var(--font-mono);
      background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      color: var(--text-primary);
      min-height: 100vh;
      padding: 2rem;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .logo {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2rem, 8vw, 3rem);
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      line-height: 1;
    }
    .logo-prefix { color: var(--accent-primary); }
    .logo-separator { color: var(--text-secondary); margin: 0 0.1em; }
    .logo-suffix { color: var(--accent-secondary); }
    .tagline {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
    .stats-card {
      background: var(--bg-card);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      margin-bottom: 2rem;
    }
    .stats-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .stats-icon {
      font-size: 2rem;
      color: var(--accent-success);
    }
    .stats-title {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .code-display {
      font-family: var(--font-mono);
      font-size: 1.25rem;
      color: var(--accent-primary);
      background: rgba(0, 212, 255, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 1.5rem;
    }
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.75rem;
    }
    .stat-value {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 700;
      color: var(--accent-primary);
    }
    .url-display {
      background: rgba(10, 10, 15, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .url-label {
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .url-value {
      color: var(--text-primary);
      word-break: break-all;
      font-size: 0.95rem;
    }
    .url-link {
      color: var(--accent-primary);
      text-decoration: none;
    }
    .url-link:hover {
      color: var(--accent-secondary);
    }
    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    .btn {
      flex: 1;
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      text-align: center;
      display: inline-block;
    }
    .btn:hover {
      background: rgba(0, 212, 255, 0.1);
      border-color: var(--accent-primary);
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border: none;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
    }
    .loading {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }
    .error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
    }
    .back-link {
      display: inline-block;
      margin-top: 2rem;
      color: var(--accent-primary);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s ease;
    }
    .back-link:hover {
      color: var(--accent-secondary);
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1 class="logo">
        <span class="logo-prefix">SHRT</span><span class="logo-separator">//</span><span class="logo-suffix">NAME</span>
      </h1>
      <p class="tagline">Link Statistics</p>
    </header>

    <div id="stats-container">
      <div class="loading">Loading statistics...</div>
    </div>

    <a href="/" class="back-link">← Back to Home</a>
  </div>

  <script>
    const code = '${code}';

    async function loadStats() {
      try {
        const response = await fetch('/api/stats/' + code);
        const data = await response.json();

        if (data.success) {
          renderStats(data);
        } else {
          renderError(data.error || 'Failed to load statistics');
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        renderError('Network error. Please try again.');
      }
    }

    function renderStats(data) {
      const createdDate = new Date(data.created_at).toLocaleString();
      const shortUrl = 'https://shrt.name/' + code;

      const html = \`
        <div class="stats-card">
          <div class="stats-header">
            <span class="stats-icon">📊</span>
            <h2 class="stats-title">Link Statistics</h2>
          </div>

          <div class="code-display">${code}</div>

          <div class="stat-grid">
            <div class="stat-item">
              <div class="stat-label">Total Clicks</div>
              <div class="stat-value">\${data.clicks || 0}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Created</div>
              <div class="stat-value" style="font-size: 1rem;">\${createdDate}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Type</div>
              <div class="stat-value" style="font-size: 1.25rem;">\${data.custom_code ? 'CUSTOM' : 'AUTO'}</div>
            </div>
          </div>

          <div class="url-display">
            <div class="url-label">Short URL</div>
            <div class="url-value">
              <a href="\${shortUrl}" target="_blank" class="url-link">\${shortUrl}</a>
            </div>
          </div>

          <div class="url-display">
            <div class="url-label">Original URL</div>
            <div class="url-value">
              <a href="\${data.original_url}" target="_blank" class="url-link">\${data.original_url}</a>
            </div>
          </div>

          <div class="actions">
            <button class="btn" onclick="copyToClipboard('\${shortUrl}')">Copy Short URL</button>
            <a href="\${shortUrl}" target="_blank" class="btn btn-primary">Visit Link</a>
          </div>
        </div>
      \`;

      document.getElementById('stats-container').innerHTML = html;
    }

    function renderError(message) {
      document.getElementById('stats-container').innerHTML = \`
        <div class="stats-card">
          <div class="error">\${message}</div>
          <div class="actions">
            <a href="/" class="btn btn-primary">Go Home</a>
          </div>
        </div>
      \`;
    }

    async function copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
      } catch (error) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied to clipboard!');
      }
    }

    loadStats();
  </script>
</body>
</html>`;
}
