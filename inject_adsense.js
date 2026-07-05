const fs = require('fs');
const path = require('path');

const rootDir = 'e:\\origin of whatin\\whatin';

const adsenseCode = `
    <!-- Google AdSense Integration -->
    <meta name="google-adsense-account" content="ca-pub-3296618712266727">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3296618712266727" crossorigin="anonymous"></script>
`;

function walkDir(dir) {
    let htmlFiles = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file.includes('.next')) continue; 
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            htmlFiles = htmlFiles.concat(walkDir(fullPath));
        } else if (file.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    }
    return htmlFiles;
}

const allHtml = walkDir(rootDir);
let updated = 0;

for (const file of allHtml) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('</head>')) {
        // Remove ALL variants of AdSense tags to ensure a clean injection
        content = content.replace(/<script[^>]*src="[^"]*adsbygoogle\.js[^"]*"[^>]*>[\s\S]*?<\/script>/gi, '');
        // Also remove commented out adsense scripts
        content = content.replace(/<!--\s*<script[^>]*src="[^"]*adsbygoogle\.js[^"]*"[^>]*>[\s\S]*?<\/script>\s*-->/gi, '');
        content = content.replace(/<meta[^>]*name="google-adsense-account"[^>]*>/gi, '');
        
        // Also clean up old comment blocks
        content = content.replace(/<!--\s*Google AdSense Integration\s*-->/gi, '');
        content = content.replace(/<!--\s*Google AdSense Verification\s*-->/gi, '');
        content = content.replace(/<!--\s*Google AdSense\s*-->/gi, '');

        content = content.replace('</head>', `${adsenseCode}\n</head>`);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Force-Injected AdSense into: ${file}`);
        updated++;
    } else {
        console.log(`Warning: No </head> tag found in ${file}`);
    }
}

console.log(`\nSuccessfully updated ${updated} HTML files with Google AdSense!`);
