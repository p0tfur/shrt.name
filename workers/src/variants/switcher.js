/**
 * VARIANT SWITCHER
 * Mechanism to switch between different aesthetic variants
 */

import { synthwaveHTML } from './synthwave.js';
import { luxuryHTML } from './variants/luxury.js';
import { playfulHTML } from './variants/playful.js';
import { industrialHTML } from './variants/industrial.js';

// Available variants
const VARIANTS = {
  synthwave: {
    name: 'Synthwave',
    html: synthwaveHTML,
    emoji: '⚡'
  },
  luxury: {
    name: 'Luxury',
    html: luxuryHTML,
    emoji: '💎'
  },
  playful: {
    name: 'Playful',
    html: playfulHTML,
    emoji: '🎈'
  },
  industrial: {
    name: 'Industrial',
    html: industrialHTML,
    emoji: '🏭'
  },
  brutalist: {
    name: 'Brutalist',
    html: null, // Placeholder - served from pages/varianty/brutalist.html
    emoji: '⬛'
  },
  'maximalist-chaos': {
    name: 'Maximalist Chaos',
    html: null, // Placeholder - served from pages/varianty/maximalist-chaos.html
    emoji: '🌀'
  },
  organic: {
    name: 'Organic',
    html: null, // Placeholder - served from pages/varianty/organic.html
    emoji: '🌿'
  },
  editorial: {
    name: 'Editorial',
    html: null, // Placeholder - served from pages/varianty/editorial.html
    emoji: '📰'
  },
  artdeco: {
    name: 'Art Deco',
    html: null, // Placeholder - served from pages/varianty/artdeco.html
    emoji: '✨'
  },
  softpastel: {
    name: 'Soft Pastel',
    html: null, // Placeholder - served from pages/varianty/softpastel.html
    emoji: '🌸'
  },
  'retro-futurystyczny': {
    name: 'Retro-futuristic',
    html: null, // Placeholder - served from pages/varianty/retro-futurystyczny.html
    emoji: '🚀'
  }
};

/**
 * Get variant from URL query parameter
 */
export function getVariant(request) {
  const url = new URL(request.url);
  const variantParam = url.searchParams.get('variant');

  // Validate variant parameter
  if (variantParam && VARIANTS[variantParam]) {
    return VARIANTS[variantParam];
  }

  // Default to synthwave
  return VARIANTS.synthwave;
}

/**
 * Get all available variants (for UI)
 */
export function getAllVariants() {
  return Object.values(VARIANTS);
}

/**
 * Create variant switcher HTML
 */
export function createVariantSwitcher(currentVariant) {
  const variants = getAllVariants();

  return `
    <div class="variant-switcher">
      <div class="switcher-title">SELECT AESTHETIC:</div>
      <div class="switcher-options">
        ${variants.map(v => {
          const isActive = v.name.toLowerCase() === currentVariant.name.toLowerCase();
          const activeClass = isActive ? 'active' : '';

          return `
            <a href="?variant=${v.name.toLowerCase()}" class="variant-option ${activeClass}">
              <span class="variant-emoji">${v.emoji}</span>
              <span class="variant-name">${v.name}</span>
              ${isActive ? '<span class="variant-indicator">✓</span>' : ''}
            </a>
          `;
        }).join('')}
      </div>
      <button class="switcher-close" onclick="closeSwitcher()">&times;</button>
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
      function closeSwitcher() {
        document.querySelector('.variant-switcher').remove();
      }
    </script>
  `;
}

export { VARIANTS };
