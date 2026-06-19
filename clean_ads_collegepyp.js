const fs = require('fs');

let content = fs.readFileSync('pages/collegepyp.html', 'utf8');

// 1. Clean script tags directly
content = content.replace(/<script async="async" data-cfasync="false" src="https:\/\/pl27943413\.profitablecpmratenetwork\.com\/.*?\/invoke\.js"><\/script>/gi, '');
content = content.replace(/<div id="container-[a-z0-9]+"><\/div>/gi, '');

// Clean highperformanceformat ads safely
content = content.replace(/<script>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>/gi, '');
content = content.replace(/<script src="https:\/\/www\.highperformanceformat\.com\/.*?\/invoke\.js"><\/script>/gi, '');

// Clean the wrapper divs safely without swallowing siblings
content = content.replace(/<div style="width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;">\s*<\/div>/gi, '');
content = content.replace(/<div class="ad-leaderboard">\s*<!-- Adsterra Native Banner -->\s*<\/div>/gi, '');
content = content.replace(/<div class="ad-floating">\s*<\/div>/gi, '');

// Remove profitablecpmratenetwork fast download links (cleaning it out of the HTML completely)
content = content.replace(/<a href="https:\/\/www\.profitablecpmratenetwork\.com\/.*?<\/a>/gi, '');

fs.writeFileSync('pages/collegepyp.html', content);
console.log('Cleaned ads from collegepyp.html safely');
