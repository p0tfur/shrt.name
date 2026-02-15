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

const WORKER_URL = 'https://shrt-name.p-wesolowski.workers.dev';

files.forEach(file => {
  const filePath = path.join(__dirname, 'varianty', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace API endpoints
  content = content.replace(/fetch\('\/api\/shorten'/g, `fetch('${WORKER_URL}/api/shorten'`);
  content = content.replace(/fetch\('\/api\/stats\//g, `fetch('${WORKER_URL}/api/stats/`);
  content = content.replace(/fetch\("\/api\/stats\//g, `fetch("${WORKER_URL}/api/stats/`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed API URLs in ${file}`);
});

console.log('\nDone!');
