/**
 * FOOTER COMPONENT
 * Shared footer across all variants
 */

const BUILD_DATE = '2026.02.15.01';
const CURRENT_YEAR = '2026';

/**
 * Generate footer HTML
 * @param {Object} options - Optional styling overrides
 * @returns {string} Footer HTML
 */
export function generateFooter(options = {}) {
  const {
    variant = 'default', // 'cyber', 'synthwave', 'luxury', 'playful', 'industrial', 'brutalist'
    extraContent = ''
  } = options;

  // Variant-specific styling
  const styles = getFooterStyles(variant);

  return `
    <footer class="shrt-footer" style="${styles.container}">
      <div class="footer-main" style="${styles.main}">
        <div class="footer-brand" style="${styles.brand}">
          <span style="${styles.name}">shrt.name</span>
          <span style="${styles.divider}">//</span>
          <span style="${styles.year}">${CURRENT_YEAR}</span>
          <span style="${styles.divider}">//</span>
          <span style="${styles.license}">MIT</span>
        </div>
        <div class="footer-meta" style="${styles.meta}">
          <span style="${styles.build}">BUILD: ${BUILD_DATE}</span>
        </div>
      </div>
      ${extraContent}
    </footer>

    <style>
      .shrt-footer {
        margin-top: auto;
        padding: 1.5rem 2rem;
        font-family: 'JetBrains Mono', 'Space Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .footer-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .footer-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      @media (max-width: 768px) {
        .footer-main {
          flex-direction: column;
          text-align: center;
        }
        .shrt-footer {
          padding: 1rem;
        }
      }
    </style>
  `;
}

/**
 * Get footer styles based on variant
 */
function getFooterStyles(variant) {
  const variants = {
    cyber: {
      container: 'background: #09090b; border-top: 3px solid #1a1a1e; color: #71717a;',
      main: '',
      brand: '',
      name: 'color: #facc15; font-weight: 800;',
      divider: 'color: #ec4899;',
      year: 'color: #22d3ee;',
      license: 'color: #71717a;',
      meta: '',
      build: 'color: #71717a; font-size: 0.625rem;'
    },
    synthwave: {
      container: 'text-align: center; margin-top: 4rem; font-size: 0.75rem; color: #666699; letter-spacing: 0.2em; text-transform: uppercase;',
      main: 'display: block;',
      brand: '',
      name: 'color: #00f3ff;',
      divider: 'color: #ff00ff;',
      year: 'color: #00f3ff;',
      license: 'color: #b8b8d4;',
      meta: 'display: block; margin-top: 0.5rem;',
      build: 'color: #666699;'
    },
    luxury: {
      container: 'margin-top: var(--space-xl); text-align: center; font-family: var(--font-sans); font-size: 0.6875rem; letter-spacing: 0.15em; color: var(--silver); border-top: 1px solid var(--platinum); padding-top: 2rem;',
      main: 'display: block;',
      brand: '',
      name: 'color: var(--gold-dark);',
      divider: 'color: var(--gold-primary);',
      year: 'color: var(--gold-dark);',
      license: 'color: var(--silver);',
      meta: 'display: block; margin-top: 0.5rem;',
      build: 'color: var(--silver);'
    },
    playful: {
      container: 'margin-top: var(--space-lg); text-align: center; font-family: var(--font-display); font-size: 0.875rem; color: var(--purple-bright);',
      main: 'display: block;',
      brand: '',
      name: 'display: inline-block; animation: bounce 1.5s ease-in-out infinite;',
      divider: 'display: inline-block; animation: bounce 1.5s ease-in-out infinite 0.2s;',
      year: 'display: inline-block; animation: bounce 1.5s ease-in-out infinite 0.4s;',
      license: 'display: inline-block; animation: bounce 1.5s ease-in-out infinite 0.6s;',
      meta: 'display: block; margin-top: 0.5rem;',
      build: 'color: var(--purple-pastel); font-size: 0.75rem;'
    },
    industrial: {
      container: 'background: var(--bg-tertiary); border-top: var(--border-thick) solid var(--border-color); padding: var(--space-md); font-family: var(--font-mono); font-size: 0.625rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-sm);',
      main: 'display: contents;',
      brand: 'display: flex; gap: var(--space-lg);',
      name: 'color: var(--text-secondary);',
      divider: 'color: var(--accent-primary);',
      year: 'color: var(--text-secondary);',
      license: 'color: var(--accent-primary);',
      meta: '',
      build: 'color: var(--text-muted);'
    },
    brutalist: {
      container: 'border: var(--border-thick); background: var(--black); color: var(--white); padding: var(--space-md); text-transform: uppercase; font-family: var(--font-mono); font-size: 0.9rem; font-weight: 700; text-align: center; margin-top: var(--space-lg);',
      main: 'display: block;',
      brand: 'display: flex; justify-content: center; gap: var(--space-md); flex-wrap: wrap; margin-bottom: var(--space-sm);',
      name: 'color: var(--white);',
      divider: 'color: var(--red);',
      year: 'color: var(--yellow);',
      license: 'color: var(--white);',
      meta: 'display: block; border-top: var(--border-thin); padding-top: var(--space-sm); margin-top: var(--space-sm);',
      build: 'color: var(--gray); font-size: 0.8rem;'
    },
    default: {
      container: 'text-align: center; padding: 1.5rem; font-family: monospace; font-size: 0.75rem; color: #666; letter-spacing: 0.1em; text-transform: uppercase; border-top: 1px solid #333; margin-top: 3rem;',
      main: 'display: block;',
      brand: '',
      name: 'color: #00f3ff; font-weight: 700;',
      divider: 'color: #ff00ff;',
      year: 'color: #b8b8d4;',
      license: 'color: #666;',
      meta: 'display: block; margin-top: 0.5rem;',
      build: 'color: #444;'
    }
  };

  return variants[variant] || variants.default;
}

/**
 * Simple inline footer for minimalist variants
 */
export function generateSimpleFooter() {
  return `
    <footer style="text-align: center; padding: 2rem; font-family: monospace; font-size: 0.75rem; color: #666; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3rem;">
      shrt.name // ${CURRENT_YEAR} // MIT // BUILD: ${BUILD_DATE}
    </footer>
  `;
}
