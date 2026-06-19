const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The "Promoted" label and the Native Banner div
content = content.replace(/<div[^>]*>\s*<span[^>]*>\s*Promoted\s*<\/span>[\s\S]*?<\/div>/gi, '');

// The "RECOMMENDATION AD" label and the Leaderboard Banner div
content = content.replace(/<div class="ad-leaderboard">[\s\S]*?<\/div>/gi, '');

// Clean up empty containers
content = content.replace(/<div class="container">\s*<\/div>/gi, '');
content = content.replace(/<div style="margin: 1rem auto; text-align: center;">\s*<\/div>/gi, '');

// Check if any specific floating ad labels exist
content = content.replace(/<div class="ad-floating">[\s\S]*?<\/div>/gi, '');

fs.writeFileSync('index.html', content);
