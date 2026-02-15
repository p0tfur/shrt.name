/**
 * LUXURY / REFINED VARIANT
 * Elegance meets functionality - sophisticated, premium aesthetic
 */

export const luxuryHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>shrt.name // Premium Link Management</title>
  <meta name="description" content="Luxury URL shortener for discerning users.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      /* Luxury Color Palette */
      --gold-primary: #C9A961;
      --gold-light: #E8D5A3;
      --gold-dark: #8B7355;
      --cream: #FDF8F3;
      --black-ink: #1A1A1A;
      --charcoal: #2C2C2C;
      --silver: #8E8E8E;
      --platinum: #E5E4E2;

      /* Typography */
      --font-serif: 'Cormorant Garamond', serif;
      --font-sans: 'Montserrat', sans-serif;

      /* Spacing */
      --space-xs: 0.5rem;
      --space-sm: 1rem;
      --space-md: 2rem;
      --space-lg: 4rem;
      --space-xl: 6rem;

      /* Border Radius */
      --radius-sm: 2px;
      --radius-md: 4px;
      --radius-lg: 8px;

      /* Transitions */
      --transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-normal: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-fast: 0.2s ease-out;
    }

    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-sans);
      font-weight: 400;
      background: var(--cream);
      color: var(--black-ink);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-md);
      line-height: 1.7;
      letter-spacing: 0.01em;
    }

    /* Subtle Paper Texture */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      opacity: 0.02;
      pointer-events: none;
      z-index: 1000;
    }

    /* Container */
    .container {
      max-width: 700px;
      width: 100%;
      position: relative;
    }

    /* Elegant Header */
    .header {
      text-align: center;
      margin-bottom: var(--space-xl);
      position: relative;
    }

    .header::after {
      content: '';
      position: absolute;
      bottom: calc(var(--space-md) * -1);
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
    }

    .logo {
      font-family: var(--font-serif);
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 600;
      letter-spacing: 0.02em;
      color: var(--black-ink);
      margin-bottom: var(--space-sm);
      position: relative;
    }

    .logo::before {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border: 1px solid var(--gold-primary);
      opacity: 0;
      transition: opacity var(--transition-slow);
    }

    .logo:hover::before {
      opacity: 1;
    }

    .tagline {
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold-dark);
    }

    /* Elegant Form */
    .form {
      background: white;
      padding: var(--space-lg);
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.05),
        0 10px 40px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(201, 169, 97, 0.15);
      position: relative;
    }

    .form::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      bottom: 4px;
      border: 1px solid var(--gold-primary);
      opacity: 0.3;
      pointer-events: none;
    }

    .form-group {
      margin-bottom: var(--space-md);
      position: relative;
    }

    .form-group:last-of-type {
      margin-bottom: var(--space-lg);
    }

    .form-label {
      display: block;
      font-family: var(--font-sans);
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--gold-dark);
      margin-bottom: var(--space-xs);
    }

    .form-input {
      width: 100%;
      padding: var(--space-sm) 0;
      font-family: var(--font-sans);
      font-size: 1rem;
      font-weight: 400;
      color: var(--black-ink);
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--silver);
      border-radius: 0;
      transition: all var(--transition-normal);
    }

    .form-input::placeholder {
      color: var(--silver);
      font-weight: 300;
      letter-spacing: 0.02em;
    }

    .form-input:focus {
      outline: none;
      border-bottom-color: var(--gold-primary);
      background: linear-gradient(to top, rgba(201, 169, 97, 0.02), transparent);
    }

    .form-input:focus + .input-underline {
      width: 100%;
    }

    .input-underline {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--gold-primary);
      transition: width var(--transition-normal);
    }

    /* Elegant Button */
    .submit-button {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      font-family: var(--font-serif);
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: var(--cream);
      background: var(--black-ink);
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
    }

    .submit-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.2), transparent);
      transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .submit-button:hover::before {
      left: 100%;
    }

    .submit-button:hover {
      background: var(--charcoal);
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .submit-button:active {
      transform: translateY(0);
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Result Section */
    .result {
      margin-top: var(--space-lg);
      padding: var(--space-md);
      background: white;
      border: 1px solid var(--gold-primary);
      border-left: 3px solid var(--gold-primary);
      box-shadow:
        0 2px 8px rgba(201, 169, 97, 0.08),
        0 12px 32px rgba(0, 0, 0, 0.06);
      opacity: 0;
      transform: translateY(20px);
      animation: resultFadeIn 0.8s ease-out forwards;
    }

    @keyframes resultFadeIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .result.hidden {
      display: none;
    }

    .result-header {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid var(--platinum);
    }

    .result-icon {
      font-size: 1.5rem;
      color: var(--gold-primary);
    }

    .result-title {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--black-ink);
      letter-spacing: 0.02em;
    }

    .result-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .result-field {
      position: relative;
    }

    .result-label {
      display: block;
      font-family: var(--font-sans);
      font-size: 0.625rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold-dark);
      margin-bottom: var(--space-xs);
    }

    .result-value {
      padding: var(--space-sm);
      background: var(--cream);
      border: 1px solid var(--platinum);
      border-radius: var(--radius-sm);
    }

    .short-url {
      display: block;
      font-family: var(--font-serif);
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--gold-dark);
      text-decoration: none;
      word-break: break-all;
      transition: color var(--transition-fast);
    }

    .short-url:hover {
      color: var(--gold-primary);
    }

    .result-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
    }

    .stat-item {
      text-align: center;
      padding: var(--space-sm);
      background: var(--cream);
      border: 1px solid var(--platinum);
      border-radius: var(--radius-sm);
    }

    .stat-label {
      display: block;
      font-family: var(--font-sans);
      font-size: 0.5625rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--gold-dark);
      margin-bottom: 4px;
    }

    .stat-value {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--black-ink);
    }

    .result-actions {
      display: flex;
      gap: var(--space-sm);
    }

    .action-button {
      flex: 1;
      padding: var(--space-sm);
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--black-ink);
      background: white;
      border: 1px solid var(--gold-primary);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .action-button:hover {
      background: var(--gold-primary);
      color: var(--cream);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(201, 169, 97, 0.2);
    }

    .qr-section {
      text-align: center;
      margin-top: var(--space-md);
      padding-top: var(--space-md);
      border-top: 1px solid var(--platinum);
    }

    .qr-container {
      display: inline-block;
      padding: var(--space-sm);
      background: white;
      border: 1px solid var(--gold-primary);
      box-shadow: 0 4px 12px rgba(201, 169, 97, 0.1);
    }

    .qr-image {
      width: 150px;
      height: 150px;
      display: block;
    }

    /* Footer */
    .footer {
      margin-top: var(--space-xl);
      text-align: center;
      font-family: var(--font-sans);
      font-size: 0.6875rem;
      letter-spacing: 0.15em;
      color: var(--silver);
    }

    .footer a {
      color: var(--gold-dark);
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .footer a:hover {
      color: var(--gold-primary);
    }

    /* Responsive */
    @media (max-width: 768px) {
      body {
        padding: var(--space-sm);
      }

      .container {
        max-width: 100%;
      }

      .logo {
        font-size: clamp(2rem, 10vw, 3rem);
      }

      .form {
        padding: var(--space-md);
      }

      .result-stats {
        grid-template-columns: 1fr;
      }

      .result-actions {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <script>
    // Check for saved variant preference
    (function() {
      const urlParams = new URLSearchParams(window.location.search);
      const currentVariant = urlParams.get('variant');
      if (!currentVariant) {
        const savedVariant = localStorage.getItem('shrtname_variant');
        if (savedVariant && savedVariant !== 'luxury') {
          window.location.href = '/?variant=' + savedVariant;
        }
      } else {
        localStorage.setItem('shrtname_variant', currentVariant);
      }
    })();
  </script>
  <div class="container">
    <header class="header">
      <h1 class="logo">shrt.name</h1>
      <p class="tagline">Premium Link Management</p>
    </header>

    <form id="shorten-form" class="form">
      <div class="form-group">
        <label class="form-label">URL to shorten</label>
        <input type="url" id="url-input" class="form-input" placeholder="https://" required autocomplete="off" />
        <div class="input-underline"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Custom code <span style="opacity: 0.6; font-weight: 400;">(optional)</span></label>
        <input type="text" id="code-input" class="form-input" placeholder="custom-slug" autocomplete="off" />
        <div class="input-underline"></div>
      </div>

      <button type="submit" class="submit-button" id="submit-btn">
        Shorten Link
      </button>
    </form>

    <div id="result" class="result hidden">
      <div class="result-header">
        <span class="result-icon">✓</span>
        <h2 class="result-title">Link Shortened</h2>
      </div>

      <div class="result-content">
        <div class="result-field">
          <label class="result-label">Short URL</label>
          <div class="result-value">
            <a href="#" id="short-url" target="_blank" class="short-url"></a>
          </div>
        </div>

        <div class="result-stats">
          <div class="stat-item">
            <span class="stat-label">Clicks</span>
            <span class="stat-value" id="stat-clicks">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Type</span>
            <span class="stat-value" id="stat-type">Auto</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Code</span>
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
            <img id="qr-code" src="" alt="QR Code" class="qr-image" loading="lazy">
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>shrt.name © 2024 — <a href="#">Privacy</a> · <a href="#">Terms</a></p>
    </footer>
  </div>

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

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const url = urlInput.value.trim();
      const code = codeInput.value.trim();

      if (!url) {
        alert('Please enter a URL');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';

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
          statType.textContent = data.custom_code ? 'Custom' : 'Auto';
          statCode.textContent = data.code;

          const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(data.short_url) + '&color=C9A961&bgcolor=FFFFFF';
          qrCode.src = qrUrl;

          result.classList.remove('hidden');
          result.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert(data.error || 'Failed to shorten URL');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Shorten Link';
      }
    });

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(shortUrl.textContent);
        alert('Copied to clipboard');
      } catch (error) {
        const textArea = document.createElement('textarea');
        textArea.value = shortUrl.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied to clipboard');
      }
    });

    viewStatsBtn.addEventListener('click', async () => {
      const code = statCode.textContent;
      const response = await fetch('/api/stats/' + code);
      const data = await response.json();

      if (data.success) {
        alert('Clicks: ' + data.clicks + '\\nCreated: ' + new Date(data.created_at).toLocaleString());
      }
    });
  </script>
</body>
</html>
`;
