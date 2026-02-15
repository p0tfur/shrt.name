const fs = require('fs');

// Extract cyberglitch
let content = fs.readFileSync('cyberglitch.js', 'utf8');
let start = content.indexOf('`') + 1;
let end = content.lastIndexOf('`');
let html = content.slice(start, end);
fs.writeFileSync('../../../pages/varianty/cyberglitch.html', html);
console.log('cyberglitch.html extracted');

// Extract synthwave
content = fs.readFileSync('synthwave.js', 'utf8');
start = content.indexOf('`') + 1;
end = content.lastIndexOf('`');
html = content.slice(start, end);
fs.writeFileSync('../../../pages/varianty/synthwave.html', html);
console.log('synthwave.html extracted');
