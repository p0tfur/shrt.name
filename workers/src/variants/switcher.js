/**
 * VARIANT SWITCHER
 * Mechanism to switch between different aesthetic variants
 * With localStorage persistence
 */

import { cyberGlitchHTML } from './cyberglitch.js';
import { synthwaveHTML } from './synthwave.js';
import { luxuryHTML } from './variants/luxury.js';
import { playfulHTML } from './variants/playful.js';
import { industrialHTML } from './variants/industrial.js';

// Available variants
const VARIANTS = {
  cyberglitch: {
    name: 'CYBER GLITCH',
    html: cyberGlitchHTML,
    emoji: '⚡',
    description: 'High contrast, glitch effects, aggressive geometry'
  },
  synthwave: {
    name: 'Synthwave',
    html: synthwaveHTML,
    emoji: '🌆',
    description: 'Retro-futuristic, neon glow, CRT effects'
  },
  luxury: {
    name: 'Luxury',
    html: luxuryHTML,
    emoji: '💎',
    description: 'Premium, elegant, gold accents'
  },
  playful: {
    name: 'Playful',
    html: playfulHTML,
    emoji: '🎈',
    description: 'Colorful, bouncy, fun & friendly'
  },
  industrial: {
    name: 'Industrial',
    html: industrialHTML,
    emoji: '🏭',
    description: 'Brutalist, terminal-like, functional'
  },
  brutalist: {
    name: 'Brutalist',
    html: null, // Placeholder - served from pages/varianty/brutalist.html
    emoji: '⬛',
    description: 'Raw, geometric, anti-design'
  },
  'maximalist-chaos': {
    name: 'Maximalist Chaos',
    html: null, // Placeholder - served from pages/varianty/maximalist-chaos.html
    emoji: '🌀',
    description: 'Chaotic, colorful, overwhelming'
  },
  organic: {
    name: 'Organic',
    html: null, // Placeholder - served from pages/varianty/organic.html
    emoji: '🌿',
    description: 'Natural, flowing, soft shapes'
  },
  editorial: {
    name: 'Editorial',
    html: null, // Placeholder - served from pages/varianty/editorial.html
    emoji: '📰',
    description: 'Magazine-style, typography focused'
  },
  artdeco: {
    name: 'Art Deco',
    html: null, // Placeholder - served from pages/varianty/artdeco.html
    emoji: '✨',
    description: '1920s elegance, geometric patterns'
  },
  softpastel: {
    name: 'Soft Pastel',
    html: null, // Placeholder - served from pages/varianty/softpastel.html
    emoji: '🌸',
    description: 'Gentle colors, calming'
  },
  'retro-futurystyczny': {
    name: 'Retro-futuristic',
    html: null, // Placeholder - served from pages/varianty/retro-futurystyczny.html
    emoji: '🚀',
    description: 'Polish retro sci-fi'
  }
};

/**
 * Get variant from URL query parameter or default to cyberglitch
 * Note: localStorage is checked client-side in the HTML
 */
export function getVariant(request) {
  const url = new URL(request.url);
  const variantParam = url.searchParams.get('variant');

  // Validate variant parameter
  if (variantParam && VARIANTS[variantParam]) {
    return VARIANTS[variantParam];
  }

  // Default to cyberglitch (new default)
  return VARIANTS.cyberglitch;
}

/**
 * Get all available variants (for UI)
 */
export function getAllVariants() {
  return Object.values(VARIANTS);
}

/**
 * Create variant switcher HTML with localStorage persistence
 */
export function createVariantSwitcher(currentVariant) {
  const variants = getAllVariants();

  return `
    <div class="variant-switcher" id="variant-switcher">
      <div class="switcher-title">SELECT_AESTHETIC://</div>
      <div class="switcher-options">
        ${variants.filter(v => v.html !== null).map(v => {
          const variantKey = Object.keys(VARIANTS).find(key => VARIANTS[key] === v);
          const isActive = v.name === currentVariant.name;
          const activeClass = isActive ? 'active' : '';

          return `
            <a href="?variant=${variantKey}" class="variant-option ${activeClass}" data-variant="${variantKey}" onclick="saveVariant('${variantKey}')">
              <span class="variant-emoji">${v.emoji}</span>
              <span class="variant-name">${v.name}</span>
              ${isActive ? '<span class="variant-indicator">[ACTIVE]</span>' : ''}
            </a>
          `;
        }).join('')}
      </div>
      <div class="switcher-footer">
        <small>Preference saved in browser</small>
      </div>
      <button class="switcher-close" onclick="closeSwitcher()">[X]</button>
    </div>

    <style>
      .variant-switcher {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid var(--accent-color, #00f3ff);
        border-radius: 8px;
        padding: 16px;
        z-index: 10000;
        min-width: 200px;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      }

      .switcher-title {
        font-family: monospace;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-color, #ffffff);
        margin-bottom: 12px;
        border-bottom: 1px solid var(--accent-color, #00f3ff);
        padding-bottom: 8px;
      }

      .switcher-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .variant-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-color, #333);
        border-radius: 4px;
        color: var(--text-color, #ffffff);
        text-decoration: none;
        font-family: monospace;
        font-size: 0.875rem;
        transition: all 0.2s ease-out;
        position: relative;
      }

      .variant-option:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--accent-color, #00f3ff);
        transform: translateX(-4px);
      }

      .variant-option.active {
        background: var(--accent-color, #00f3ff);
        color: var(--bg-color, #000000);
        border-color: var(--accent-color, #00f3ff);
      }

      .variant-emoji {
        font-size: 1.25rem;
      }

      .variant-name {
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .variant-indicator {
        margin-left: auto;
        font-size: 0.75rem;
      }

      .switcher-close {
        position: absolute;
        top: 4px;
        right: 4px;
        background: transparent;
        border: none;
        color: var(--text-color, #ffffff);
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.2s ease-out;
        line-height: 1;
      }

      .switcher-close:hover {
        opacity: 1;
      }
    </style>

    <script>
      // Save variant preference to localStorage
      function saveVariant(variantName) {
        try {
          localStorage.setItem('shrtname_variant', variantName);
          console.log('[SYSTEM] Variant saved:', variantName);
        } catch (e) {
          console.error('[ERROR] Failed to save variant:', e);
        }
      }
      
      // Close switcher
      function closeSwitcher() {
        const switcher = document.querySelector('.variant-switcher');
        if (switcher) {
          switcher.style.animation = 'fadeOut 0.2s ease forwards';
          setTimeout(() => switcher.remove(), 200);
        }
      }
      
      // Add fadeOut animation
      const style = document.createElement('style');
      style.textContent = \`
        @keyframes fadeOut {
          to { opacity: 0; transform: translateY(10px); }
        }
      \`;
      document.head.appendChild(style);
    </script>
  `;
}

export { VARIANTS, getAllVariants };
