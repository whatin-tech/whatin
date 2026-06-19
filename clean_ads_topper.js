const fs = require('fs');

let content = fs.readFileSync('pages/topper.html', 'utf8');

// Remove native popunder / vignette ads in the head or body
content = content.replace(/<script>\(function\s*\(s\)\s*\{\s*s\.dataset\.zone.*?<\/script>/gi, '');
content = content.replace(/<script src="https:\/\/(5gvci|omg10|nap5k|n6wxm)\.com.*?<\/script>/gi, '');

// Remove all highperformanceformat scripts and their associated atOptions configs
content = content.replace(/<script>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>\s*<script src="https:\/\/www\.highperformanceformat\.com\/.*?\/invoke\.js"><\/script>/gi, '');

// Sometimes the atOptions and invoke.js are not perfectly adjacent, so we can also remove them individually
content = content.replace(/<script>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>/gi, '');
content = content.replace(/<script src="https:\/\/www\.highperformanceformat\.com\/.*?\/invoke\.js"><\/script>/gi, '');

// Remove the AdSense script
content = content.replace(/<!--\s*<script async src="https:\/\/pagead2\.googlesyndication\.com.*?<\/script>\s*-->/gi, '');

// Remove profitablecpmratenetwork
content = content.replace(/<script async="async" data-cfasync="false" src="https:\/\/pl27943413\.profitablecpmratenetwork\.com.*?<\/script>/gi, '');
content = content.replace(/<div id="container-[a-z0-9]+"><\/div>/gi, '');

fs.writeFileSync('pages/topper.html', content);
console.log('Cleaned all ads from topper.html');
