const fs = require('fs');

let content = fs.readFileSync('pages/topper.html', 'utf8');

// 1. Remove the floating "profitablecpmratenetwork" script block
content = content.replace(/<div style="width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;">\s*<script async="async" data-cfasync="false" src="https:\/\/pl27943413\.profitablecpmratenetwork\.com\/6990ef7af7a0c2b8bd6760c6ba5e4891\/invoke\.js"><\/script>\s*<div id="container-6990ef7af7a0c2b8bd6760c6ba5e4891"><\/div>\s*<\/div>/gi, '');

// 2. Remove leaderboard ad
content = content.replace(/<div class="ad-leaderboard">[\s\S]*?<\/div>/gi, '');

// 3. Fix the missing 'collapsed' class on 1st Year block
content = content.replace(/<!-- 1st Year Section -->\s*<div class="year-block">/gi, '<!-- 1st Year Section -->\n                    <div class="year-block collapsed">');

fs.writeFileSync('pages/topper.html', content);
console.log('Fixed topper.html');
