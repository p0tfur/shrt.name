const fs = require('fs');
const path = require('path');

const files = [
  'artdeco.html',
  'brutalist.html',
  'cyberglitch.html',
  'editorial.html',
  'industrial.html',
  'luxury.html',
  'maximalist-chaos.html',
  'organic.html',
  'playful.html',
  'retro-futurystyczny.html',
  'softpastel.html',
  'synthwave.html'
];

const selectorHTML = `
  <div class="style-selector">
    <span class="selector-label">STYLE:</span>
    <a href="synthwave.html" class="style-link">🌆 SYNTH</a>
    <a href="cyberglitch.html" class="style-link">⚡ CYBER</a>
    <a href="luxury.html" class="style-link">💎 LUXURY</a>
    <a href="playful.html" class="style-link">🎈 PLAY</a>
    <a href="industrial.html" class="style-link">🏭 INDUST</a>
    <a href="brutalist.html" class="style-link">⬛ BRUTAL</a>
    <a href="artdeco.html" class="style-link">✨ DECO</a>
    <a href="editorial.html" class="style-link">📰 EDIT</a>
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

files.forEach(file => {
  const filePath = path.join(__dirname, 'varianty', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skip ${file} - not found`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has selector
  if (content.includes('style-selector')) {
    console.log(`Skip ${file} - already has selector`);
    return;
  }
  
  // Add selector before </body>
  content = content.replace('</body>', selectorHTML + '\n</body>');
  
  fs.writeFileSync(filePath, content);
  console.log(`Added selector to ${file}`);
});

console.log('\nDone!');
