// Script to update all variant files with shared footer and style selector
const fs = require('fs');
const path = require('path');

const CURRENT_YEAR = '2026';
const BUILD_DATE = '2026.02.15.01';

// Style selector HTML
const getStyleSelector = (currentVariant) => `
  <div class="style-selector">
    <span class="selector-label">STYLE:</span>
    <a href="/?variant=cyberglitch" class="style-link ${currentVariant === 'cyberglitch' ? 'active' : ''}">⚡ CYBER</a>
    <a href="/?variant=synthwave" class="style-link ${currentVariant === 'synthwave' ? 'active' : ''}">🌆 SYNTH</a>
    <a href="/?variant=luxury" class="style-link ${currentVariant === 'luxury' ? 'active' : ''}">💎 LUXURY</a>
    <a href="/?variant=playful" class="style-link ${currentVariant === 'playful' ? 'active' : ''}">🎈 PLAY</a>
    <a href="/?variant=industrial" class="style-link ${currentVariant === 'industrial' ? 'active' : ''}">🏭 INDUST</a>
    <a href="/?variant=brutalist" class="style-link ${currentVariant === 'brutalist' ? 'active' : ''}">⬛ BRUTAL</a>
  </div>
  
  <style>
    .style-selector {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid #00f3ff;
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
      color: #666;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    .style-link {
      color: #b8b8d4;
      text-decoration: none;
      padding: 4px 8px;
      border: 1px solid transparent;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .style-link:hover {
      color: #00f3ff;
      border-color: #00f3ff;
    }
    .style-link.active {
      background: #00f3ff;
      color: #0a0a0f;
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

// LocalStorage script
const localStorageScript = `
  <script>
    (function() {
      const urlParams = new URLSearchParams(window.location.search);
      const currentVariant = urlParams.get('variant');
      if (!currentVariant) {
        const savedVariant = localStorage.getItem('shrtname_variant');
        if (savedVariant) {
          window.location.href = '/?variant=' + savedVariant;
        }
      } else {
        localStorage.setItem('shrtname_variant', currentVariant);
      }
    })();
  </script>
`;

// New footer
const getFooter = () => `
  <footer style="text-align: center; padding: 2rem; font-family: monospace; font-size: 0.75rem; color: #666; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3rem; border-top: 1px solid #333;">
    shrt.name // ${CURRENT_YEAR} // MIT // BUILD: ${BUILD_DATE}
  </footer>
`;

// Process each file
const files = [
  'artdeco.html',
  'brutalist.html', 
  'editorial.html',
  'industrial.html',
  'luxury.html',
  'maximalist-chaos.html',
  'organic.html',
  'playful.html',
  'retro-futurystyczny.html',
  'softpastel.html'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Get variant name from filename
  const variantName = file.replace('.html', '').replace('-', '');
  
  // 1. Add localStorage script after <body>
  if (!content.includes('shrtname_variant')) {
    content = content.replace('<body>', '<body>' + localStorageScript);
  }
  
  // 2. Replace footer
  content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, getFooter());
  
  // 3. Add style selector before </body>
  if (!content.includes('style-selector')) {
    const selector = getStyleSelector(variantName);
    content = content.replace('</body>', selector + '</body>');
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ Updated ${file}`);
});

console.log('\n✅ All files updated!');
