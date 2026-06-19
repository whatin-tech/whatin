const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove Ad Scripts (Monetag, Adsterra, etc)
    content = content.replace(/<!--\s*Monetag Ads\s*-->[\s\S]*?(?=<\/head>|<body|<!--)/gi, '');
    content = content.replace(/<script>\s*\(function\s*\(s\)\s*\{\s*s\.dataset\.zone[^<]+<\/script>/gi, '');
    content = content.replace(/<!--\s*Adsterra Popunder\s*(\(Removed\))?\s*-->/gi, '');
    content = content.replace(/<script[^>]*src=["'][^"']*nap5k\.com[^"']*["'][^>]*><\/script>/gi, '');
    content = content.replace(/<script[^>]*src=["'][^"']*n6wxm\.com[^"']*["'][^>]*><\/script>/gi, '');

    // Remove ad divs
    content = content.replace(/<!--\s*Top Ad Placeholder\s*-->/gi, '');
    content = content.replace(/<div\s+class=["']ad-leaderboard["']>[\s\S]*?<\/div>\s*<\/div>/g, '');
    content = content.replace(/<div\s+class=["']ad-leaderboard["']>[\s\S]*?<\/div>/g, '');
    content = content.replace(/<div\s+class=["']ad-floating["']>[\s\S]*?<\/div>/g, '');

    // Fix Navbar CTA Button (from clay-btn to cta-btn-header)
    content = content.replace(/<a\s+(href=["'][^"']+["'])\s+class=["'][^"']*clay-btn bg-pink[^"']*["'][^>]*>Start Learning Now<\/a>/gi, '<a $1 class="cta-btn-header">Start Learning Now</a>');
    content = content.replace(/<a[^>]*class=["'][^"']*clay-btn bg-pink[^"']*["'][^>]*>Start Learning Now<\/a>/gi, '<a href="index.html#projects" class="cta-btn-header">Start Learning Now</a>');

    fs.writeFileSync(filePath, content);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                walkDir(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            processFile(fullPath);
            console.log('Processed:', fullPath);
        }
    }
}

walkDir('.');
