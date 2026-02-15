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

// Simplified localStorage script - only saves, doesn't redirect
const simpleScript = `  <script>
    (function() {
      const urlParams = new URLSearchParams(window.location.search);
      const currentVariant = urlParams.get('variant');
      if (currentVariant) {
        localStorage.setItem('shrtname_variant', currentVariant);
      }
    })();
  </script>
`;

files.forEach(file => {
  const filePath = path.join(__dirname, 'varianty', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skip ${file} - not found`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove old localStorage script (the one with redirect)
  content = content.replace(/<script>\s*\(function\(\)\s*{\s*const urlParams = new URLSearchParams\(window\.location\.search\);[\s\S]*?}\)\(\);\s*<\/script>\s*/i, '');
  
  // Add simple script after <body>
  if (!content.includes('localStorage.setItem')) {
    content = content.replace('<body>', '<body>\n' + simpleScript);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
});

console.log('\nDone!');
