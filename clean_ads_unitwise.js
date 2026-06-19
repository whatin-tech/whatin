const fs = require('fs');

let content = fs.readFileSync('pages/unitwise.html', 'utf8');

// 1. Clean Ads
content = content.replace(/<script>\(function\s*\(s\)\s*\{\s*s\.dataset\.zone.*?<\/script>/gi, '');
content = content.replace(/<script src="https:\/\/(5gvci|omg10|nap5k|n6wxm)\.com.*?<\/script>/gi, '');
content = content.replace(/<script>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>\s*<script src="https:\/\/www\.highperformanceformat\.com\/.*?\/invoke\.js"><\/script>/gi, '');
content = content.replace(/<script>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>/gi, '');
content = content.replace(/<script src="https:\/\/www\.highperformanceformat\.com\/.*?\/invoke\.js"><\/script>/gi, '');
content = content.replace(/<!--\s*<script async src="https:\/\/pagead2\.googlesyndication\.com.*?<\/script>\s*-->/gi, '');
content = content.replace(/<script async="async" data-cfasync="false" src="https:\/\/pl27943413\.profitablecpmratenetwork\.com.*?<\/script>/gi, '');
content = content.replace(/<div id="container-[a-z0-9]+"><\/div>/gi, '');
content = content.replace(/<div class="ad-leaderboard">[\s\S]*?<\/div>/gi, '');
content = content.replace(/<div class="ad-floating">[\s\S]*?<\/div>/gi, '');
content = content.replace(/<div style="width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;">\s*<\/div>/gi, '');

fs.writeFileSync('pages/unitwise.html', content);
console.log('Cleaned ads from unitwise.html');
