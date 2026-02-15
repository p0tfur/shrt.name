/**
 * SHRT.NAME // SYNTHWAVE FRONTEND
 * Retro-futuristic URL shortener interface
 */

// ═══════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════
const CONFIG = {
  API_BASE: window.location.origin,
  SOUNDS: {
    TYPING: { freq: 800, duration: 0.05 },
    SUCCESS: { freq: 1200, duration: 0.15 },
    ERROR: { freq: 200, duration: 0.3 },
    HOVER: { freq: 600, duration: 0.05 }
  },
  PARTICLES: {
    COUNT: 50,
    SPEED: 2,
    SIZE_RANGE: [2, 6]
  }
};

// ═══════════════════════════════════════════════════════════════════
// DOM ELEMENTS
// ═══════════════════════════════════════════════════════════════════
const elements = {
  form: document.getElementById('shorten-form'),
  urlInput: document.getElementById('url-input'),
  codeInput: document.getElementById('code-input'),
  submitBtn: document.getElementById('submit-btn'),
  resultSection: document.getElementById('result'),
  shortUrl: document.getElementById('short-url'),
  statClicks: document.getElementById('stat-clicks'),
  statType: document.getElementById('stat-type'),
  statCode: document.getElementById('stat-code'),
  copyBtn: document.getElementById('copy-btn'),
  viewStatsBtn: document.getElementById('view-stats-btn'),
  qrCode: document.getElementById('qr-code'),
  qrDownload: document.getElementById('qr-download'),
  statsModal: document.getElementById('stats-modal'),
  closeModal: document.getElementById('close-modal'),
  modalClicks: document.getElementById('modal-clicks'),
  modalCreated: document.getElementById('modal-created'),
  modalUrl: document.getElementById('modal-url')
};

// ═══════════════════════════════════════════════════════════════════
// AUDIO SYSTEM
// ═══════════════════════════════════════════════════════════════════
class AudioSystem {
  constructor() {
    this.context = null;
    this.enabled = true;
    this.init();
  }

  init() {
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.log('Audio not supported');
      this.enabled = false;
    }
  }

  play(type) {
    if (!this.enabled || !this.context) return;

    const { freq, duration } = CONFIG.SOUNDS[type] || CONFIG.SOUNDS.HOVER;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, this.context.currentTime + duration);

    gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + duration);
  }

  playSuccess() {
    this.play('SUCCESS');
    setTimeout(() => this.play('SUCCESS'), 100);
  }
}

const audio = new AudioSystem();

// ═══════════════════════════════════════════════════════════════════
// PARTICLE SYSTEM
// ═══════════════════════════════════════════════════════════════════
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.canvas = null;
    this.ctx = null;
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 100;
    `;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createExplosion(x, y) {
    for (let i = 0; i < CONFIG.PARTICLES.COUNT; i++) {
      const angle = (Math.PI * 2 * i) / CONFIG.PARTICLES.COUNT;
      const speed = Math.random() * CONFIG.PARTICLES.SPEED + 1;
      const size = Math.random() * (CONFIG.PARTICLES.SIZE_RANGE[1] - CONFIG.PARTICLES.SIZE_RANGE[0]) + CONFIG.PARTICLES.SIZE_RANGE[0];

      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        size,
        color: this.getRandomColor()
      });
    }
  }

  getRandomColor() {
    const colors = ['#00f3ff', '#ff00ff', '#bc13fe', '#00ff88'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.particles = this.particles.filter(p => p.life > 0);

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // gravity
      p.life -= p.decay;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

const particles = new ParticleSystem();
particles.animate();

// ═══════════════════════════════════════════════════════════════════
// GLITCH EFFECTS
// ═══════════════════════════════════════════════════════════════════
function createGlitch(element, duration = 100) {
  const originalText = element.textContent || element.innerText;
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  let iterations = 0;

  const interval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((char, i) => {
        if (i < iterations) return originalText[i];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    if (iterations >= originalText.length) {
      clearInterval(interval);
      element.textContent = originalText;
    }

    iterations += 1 / 3;
  }, duration / originalText.length);
}

// ═══════════════════════════════════════════════════════════════════
// TYPING EFFECT
// ═══════════════════════════════════════════════════════════════════
async function typeText(element, text, speed = 50) {
  element.textContent = '';
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    audio.play('TYPING');
    await sleep(speed);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ═══════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════════
elements.form.addEventListener('submit', handleShorten);
elements.urlInput.addEventListener('input', () => audio.play('TYPING'));
elements.codeInput.addEventListener('input', () => audio.play('TYPING'));
elements.submitBtn.addEventListener('mouseenter', () => audio.play('HOVER'));
elements.copyBtn.addEventListener('click', copyToClipboard);
elements.viewStatsBtn.addEventListener('click', viewStats);
elements.closeModal.addEventListener('click', () => toggleModal(false));
elements.statsModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) toggleModal(false);
});

// ═══════════════════════════════════════════════════════════════════
// URL SHORTENING
// ═══════════════════════════════════════════════════════════════════
async function handleShorten(e) {
  e.preventDefault();

  const url = elements.urlInput.value.trim();
  const code = elements.codeInput.value.trim();

  if (!url) {
    showError('URL_REQUIRED');
    return;
  }

  // Visual feedback
  setLoading(true);
  createGlitch(elements.submitBtn.querySelector('.button-text'), 200);

  try {
    const response = await fetch(`${CONFIG.API_BASE}/api/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, code: code || null })
    });

    const data = await response.json();

    if (data.success) {
      audio.playSuccess();
      showResult(data);
      createSuccessEffect();
    } else {
      audio.play('ERROR');
      showError(data.error || 'COMPRESSION_FAILED');
    }
  } catch (error) {
    console.error('Error:', error);
    audio.play('ERROR');
    showError('NETWORK_ERROR');
  } finally {
    setLoading(false);
  }
}

// ═══════════════════════════════════════════════════════════════════
// LOADING STATE
// ═══════════════════════════════════════════════════════════════════
function setLoading(isLoading) {
  const btnText = elements.submitBtn.querySelector('.button-text');

  if (isLoading) {
    elements.submitBtn.disabled = true;
    btnText.textContent = 'COMPRESSING...';
    elements.submitBtn.classList.add('loading');
  } else {
    elements.submitBtn.disabled = false;
    btnText.textContent = 'INITIATE_COMPRESSION';
    elements.submitBtn.classList.remove('loading');
  }
}

// ═══════════════════════════════════════════════════════════════════
// RESULT DISPLAY
// ═══════════════════════════════════════════════════════════════════
function showResult(data) {
  // Update result content
  elements.shortUrl.href = data.short_url;
  elements.shortUrl.textContent = data.short_url;
  elements.statClicks.textContent = '0';
  elements.statType.textContent = data.custom_code ? 'CUSTOM' : 'AUTO';
  elements.statCode.textContent = data.code;

  // Generate QR code
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.short_url)}&color=00f3ff&bgcolor=1a1a2e`;
  elements.qrCode.src = qrUrl;
  elements.qrDownload.href = qrUrl;

  // Show result
  elements.resultSection.classList.remove('hidden');
  elements.resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Glitch effect on result
  createGlitch(elements.resultSection.querySelector('.result-title'), 300);
}

// ═══════════════════════════════════════════════════════════════════
// SUCCESS EFFECT
// ═══════════════════════════════════════════════════════════════════
function createSuccessEffect() {
  const rect = elements.resultSection.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  particles.createExplosion(centerX, centerY);

  // Flash effect
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 136, 0.3);
    pointer-events: none;
    z-index: 1500;
    animation: flashFade 0.5s ease-out forwards;
  `;

  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
}

// Add flash animation
const style = document.createElement('style');
style.textContent = `
  @keyframes flashFade {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════
function showError(message) {
  // Create error notification
  const notification = document.createElement('div');
  notification.className = 'error-notification';
  notification.innerHTML = `
    <span class="error-icon">⚠</span>
    <span class="error-message">${message}</span>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: rgba(239, 68, 68, 0.95);
    border: 1px solid #ff0080;
    border-radius: 8px;
    color: white;
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    letter-spacing: 0.1em;
    z-index: 3000;
    animation: errorSlide 0.4s ease-out;
    box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
  `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'errorFade 0.3s ease-out forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add error animations
const errorStyle = document.createElement('style');
errorStyle.textContent = `
  @keyframes errorSlide {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes errorFade {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(errorStyle);

// ═══════════════════════════════════════════════════════════════════
// COPY TO CLIPBOARD
// ═══════════════════════════════════════════════════════════════════
async function copyToClipboard() {
  const text = elements.shortUrl.textContent;

  try {
    await navigator.clipboard.writeText(text);
    audio.play('SUCCESS');

    // Show success notification
    showNotification('COPIED_TO_CLIPBOARD');
  } catch (error) {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    audio.play('SUCCESS');
    showNotification('COPIED_TO_CLIPBOARD');
  }
}

// ═══════════════════════════════════════════════════════════════════
// NOTIFICATION SYSTEM
// ═══════════════════════════════════════════════════════════════════
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <span class="notification-icon">✓</span>
    <span class="notification-message">${message}</span>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: rgba(0, 255, 136, 0.95);
    border: 1px solid #00ff88;
    border-radius: 8px;
    color: #0a0a0f;
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    letter-spacing: 0.1em;
    font-weight: 700;
    z-index: 3000;
    animation: notificationSlide 0.4s ease-out;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  `;

  document.body.appendChild(notification);

  // Auto remove after 2 seconds
  setTimeout(() => {
    notification.style.animation = 'notificationFade 0.3s ease-out forwards';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes notificationSlide {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes notificationFade {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(notificationStyle);

// ═══════════════════════════════════════════════════════════════════
// VIEW STATS
// ═══════════════════════════════════════════════════════════════════
async function viewStats() {
  const code = elements.statCode.textContent;

  try {
    const response = await fetch(`${CONFIG.API_BASE}/api/stats/${code}`);
    const data = await response.json();

    if (data.success) {
      elements.modalClicks.textContent = data.clicks;
      elements.modalCreated.textContent = new Date(data.created_at).toLocaleString();
      elements.modalUrl.textContent = truncateUrl(data.original_url, 40);

      toggleModal(true);
      audio.play('SUCCESS');
    } else {
      showError('FAILED_TO_LOAD_STATS');
    }
  } catch (error) {
    console.error('Error loading stats:', error);
    showError('NETWORK_ERROR');
  }
}

// ═══════════════════════════════════════════════════════════════════
// MODAL TOGGLE
// ═══════════════════════════════════════════════════════════════════
function toggleModal(show) {
  if (show) {
    elements.statsModal.classList.remove('hidden');
    audio.play('HOVER');
  } else {
    elements.statsModal.classList.add('hidden');
  }
}

// ═══════════════════════════════════════════════════════════════════
// URL TRUNCATION
// ═══════════════════════════════════════════════════════════════════
function truncateUrl(url, maxLength) {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength) + '...';
}

// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════
// Initialize audio on first user interaction
document.addEventListener('click', () => {
  if (audio.context && audio.context.state === 'suspended') {
    audio.context.resume();
  }
}, { once: true });

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    elements.urlInput.focus();
  }
});

// Console Easter Egg
console.log('%c SHRT.NAME // SYSTEM ONLINE', 'color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;');
console.log('%c ══════════════════════════════════════════════════════════════════', 'color: #ff00ff;');
console.log('%c NEURAL NETWORK: ACTIVE', 'color: #00ff88;');
console.log('%c COMPRESSION ENGINE: READY', 'color: #bc13fe;');
console.log('%c SYSTEM STATUS: OPERATIONAL', 'color: #00f3ff;');
