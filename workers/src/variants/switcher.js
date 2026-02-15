/**
 * VARIANT SWITCHER
 * Mechanism to switch between different aesthetic variants
 * With localStorage persistence
 */

import { cyberGlitchHTML } from './cyberglitch.js';
import { synthwaveHTML } from './synthwave.js';
import { luxuryHTML } from './luxury.js';
import { playfulHTML } from './playful.js';
import { industrialHTML } from './industrial.js';

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
 * Create simple inline variant switcher
 */
export function createVariantSwitcher(currentVariant) {
  const embeddedVariants = Object.entries(VARIANTS).filter(([_, v]) => v.html !== null);

  return `
    <div class="style-selector">
      <span class="selector-label">STYLE:</span>
      ${embeddedVariants.map(([key, v]) => {
        const isActive = v.name === currentVariant.name;
        return `
          <a href="?variant=${key}" 
             class="style-link ${isActive ? 'active' : ''}" 
             onclick="localStorage.setItem('shrtname_variant', '${key}')">
            ${v.emoji} ${v.name}
          </a>
        `;
      }).join('')}
    </div>

    <style>
      .style-selector {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid var(--neon-cyan, #00f3ff);
        padding: 12px 20px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: monospace;
        font-size: 0.75rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .selector-label {
        color: var(--text-muted, #666);
        font-weight: 700;
        letter-spacing: 0.1em;
      }
      .style-link {
        color: var(--text-secondary, #b8b8d4);
        text-decoration: none;
        padding: 4px 8px;
        border: 1px solid transparent;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .style-link:hover {
        color: var(--neon-cyan, #00f3ff);
        border-color: var(--neon-cyan, #00f3ff);
      }
      .style-link.active {
        background: var(--neon-cyan, #00f3ff);
        color: var(--bg-void, #0a0a0f);
        font-weight: 700;
      }
      @media (max-width: 768px) {
        .style-selector {
          bottom: 10px;
          padding: 8px 12px;
          gap: 8px;
          font-size: 0.625rem;
        }
      }
    </style>
  `;
}

export { VARIANTS };
