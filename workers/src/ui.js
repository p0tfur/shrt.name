/**
 * SYNTHWAVE / RETRO-FUTURISTIC VARIANT
 * Default aesthetic - neon glow, cyberpunk vibes
 */

export const mainHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>shrt.name - URL Shortener</title>
  <meta name="description" content="Fast, simple URL shortener. Shorten your links instantly.">
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
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      line-height: 1.6;
    }

    .container {
      max-width: 640px;
      width: 100%;
      position: relative;
      z-index: 10;
    }
    
    .header {
      text-align: center;
      margin-bottom: 3.5rem;
      position: relative;
    }
    .logo {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(3rem, 10vw, 5rem);
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      line-height: 1;
    }
    .logo-prefix {
      color: var(--accent-primary);
    }
    .logo-separator {
      color: var(--text-secondary);
      margin: 0 0.1em;
    }
    .logo-suffix {
      color: var(--accent-secondary);
    }
    .tagline {
      font-family: var(--font-mono);
      font-size: clamp(0.75rem, 2vw, 0.9rem);
      letter-spacing: 0.1em;
      color: var(--text-secondary);
    }
    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: var(--bg-card);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .input-group {
      position: relative;
    }
    input {
      width: 100%;
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      color: var(--text-primary);
      background: rgba(10, 10, 15, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    input::placeholder {
      color: var(--text-muted);
    }
    input:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
    }
    button {
      width: 100%;
      padding: 1rem;
      margin-top: 0.5rem;
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: #fff;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
    }
    button:active {
      transform: translateY(0);
    }
    button:disabled {
      background: var(--bg-secondary);
      color: var(--text-muted);
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    #result {
      margin-top: 2rem;
      padding: 2rem;
      background: var(--bg-card);
      border: 1px solid var(--accent-success);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      display: none;
      animation: fadeIn 0.3s ease;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    #result.visible {
      display: block;
    }
    .result-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .result-status {
      font-size: 1.5rem;
      color: var(--accent-success);
    }
    .result-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }
    .result-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .result-field {
      margin-bottom: 0.5rem;
    }
    .result-label {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .result-value {
      background: rgba(10, 10, 15, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 1rem;
    }
    .result-link {
      display: block;
      color: var(--accent-primary);
      text-decoration: none;
      font-family: var(--font-mono);
      font-size: 1rem;
      word-break: break-all;
      transition: color 0.2s ease;
    }
    .result-link:hover {
      color: var(--accent-secondary);
    }
    .result-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 0.5rem 0;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }
    .stat-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }
    .stat-value {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    
    .result-actions {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    .action-button {
      flex: 1;
      padding: 0.875rem;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .action-button:hover {
      background: rgba(0, 212, 255, 0.1);
      border-color: var(--accent-primary);
    }
    .qr-section {
      margin-top: 2rem;
      text-align: center;
      padding-top: 2rem;
      border-top: 1px dashed rgba(255, 255, 255, 0.1);
    }
    .qr-container {
      display: inline-block;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }
    .qr-image {
      width: 160px;
      height: 160px;
      display: block;
      border-radius: 8px;
    }
    .qr-download {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-secondary);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .qr-download:hover {
      color: var(--accent-primary);
      border-color: var(--accent-primary);
    }
    .footer {
      margin-top: 4rem;
      text-align: center;
      font-size: 0.75rem;
      color: var(--text-muted);
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
    .footer a {
      color: var(--accent-primary);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .footer a:hover {
      color: var(--accent-secondary);
    }
    .admin-link {
      position: fixed;
      bottom: 20px;
      right: 20px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.75rem;
      opacity: 0.5;
      transition: opacity 0.2s;
    }
    .admin-link:hover {
      opacity: 1;
      color: var(--accent-primary);
    }
  </style>
</head>
<body>

  <div class="container">
    <header class="header">
      <h1 class="logo">
        <span class="logo-prefix">SHRT</span><span class="logo-separator">//</span><span class="logo-suffix">NAME</span>
      </h1>
      <p class="tagline">Fast & Simple URL Shortener</p>
    </header>

    <form id="shorten-form" class="form">
      <div class="input-group">
        <input type="url" id="url-input" placeholder="https://example.com/very-long-url" required autocomplete="off" />
      </div>

      <div class="input-group">
        <input type="text" id="code-input" placeholder="Custom short link (optional)" autocomplete="off" />
      </div>

      <button type="submit" id="submit-btn">Shorten URL</button>
    </form>

    <div id="result">
      <div class="result-header">
        <span class="result-status">✓</span>
        <h2 class="result-title">URL Shortened</h2>
      </div>

      <div class="result-content">
        <div class="result-field">
          <label class="result-label">Your Short URL</label>
          <div class="result-value">
            <a href="#" id="short-url" target="_blank" class="result-link"></a>
          </div>
        </div>

        <div class="result-stats">
          <div class="stat-item">
            <span class="stat-label">CLICKS</span>
            <span class="stat-value" id="stat-clicks">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">TYPE</span>
            <span class="stat-value" id="stat-type">AUTO</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">CODE</span>
            <span class="stat-value" id="stat-code"></span>
          </div>
        </div>

        <div class="result-actions">
          <button class="action-button copy-btn" id="copy-btn">
            Copy to Clipboard
          </button>
          <button class="action-button stats-btn" id="view-stats-btn">
            View Analytics
          </button>
        </div>

        <div class="qr-section">
          <div class="qr-container">
            <img id="qr-code" src="" alt="QR CODE" class="qr-image" loading="lazy">
          </div>
          <a href="#" id="qr-download" target="_blank" class="qr-download">Download QR</a>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>SHRT.NAME // 2026</p>
      <p style="margin-top: 10px; font-size: 0.85rem; color: var(--text-muted); letter-spacing: 0.05em; text-transform: none;">
        Do you use social media? Try <a href="/crossposting">crosspostingpal.com</a>
      </p>
    </footer>
  </div>

  <a href="/admin" class="admin-link">[ADMIN]</a>

  <script>
    const form = document.getElementById('shorten-form');
    const urlInput = document.getElementById('url-input');
    const codeInput = document.getElementById('code-input');
    const submitBtn = document.getElementById('submit-btn');
    const result = document.getElementById('result');
    const shortUrl = document.getElementById('short-url');
    const statClicks = document.getElementById('stat-clicks');
    const statType = document.getElementById('stat-type');
    const statCode = document.getElementById('stat-code');
    const copyBtn = document.getElementById('copy-btn');
    const viewStatsBtn = document.getElementById('view-stats-btn');
    const qrCode = document.getElementById('qr-code');
    const qrDownload = document.getElementById('qr-download');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const url = urlInput.value.trim();
      const code = codeInput.value.trim();

      if (!url) {
        alert('Please enter a URL to shorten.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Shortening...';

      try {
        const response = await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, code: code || null })
        });

        const data = await response.json();

        if (data.success) {
          shortUrl.href = data.short_url;
          shortUrl.textContent = data.short_url;
          statClicks.textContent = '0';
          statType.textContent = data.custom_code ? 'CUSTOM' : 'AUTO';
          statCode.textContent = data.code;

          const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(data.short_url) + '&color=0ff0fc&bgcolor=050508';
          qrCode.src = qrUrl;
          qrDownload.href = qrUrl;

          result.classList.add('visible');
          setTimeout(() => {
            result.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        } else {
          alert(data.error || 'Failed to shorten URL. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Shorten URL';
      }
    });

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(shortUrl.textContent);
        alert('Copied to clipboard!');
      } catch (error) {
        const textArea = document.createElement('textarea');
        textArea.value = shortUrl.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied to clipboard!');
      }
    });

    viewStatsBtn.addEventListener('click', () => {
      const code = statCode.textContent;
      window.location.href = '/stats/' + code;
    });
  </script>
</body>
</html>`;
