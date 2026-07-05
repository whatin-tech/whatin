const fs = require('fs');
const path = require('path');

const rootDir = 'e:\\origin of whatin\\whatin';
const imagesDir = path.join(rootDir, 'images');
const faviconName = 'favicon.png';

function walkDir(dir) {
    let htmlFiles = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file.includes('.next')) continue; // Skip build dirs
        
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
    
    // Calculate relative path from this HTML file to images/favicon.png
    const fileDir = path.dirname(file);
    const relPathToImages = path.relative(fileDir, imagesDir).replace(/\\/g, '/');
    const faviconRelPath = `${relPathToImages}/${faviconName}`;

    const faviconHtml = `
    <!-- Favicon for Browser & Google Search -->
    <link rel="icon" type="image/png" href="${faviconRelPath}">
    <link rel="apple-touch-icon" href="${faviconRelPath}">`;

    if (content.includes('</head>')) {
        // Remove ALL existing favicon tags to avoid duplicates
        content = content.replace(/<link[^>]*rel="icon"[^>]*>/gi, '');
        content = content.replace(/<link[^>]*rel="shortcut icon"[^>]*>/gi, '');
        content = content.replace(/<link[^>]*rel="apple-touch-icon"[^>]*>/gi, '');
        
        // Remove old '<!-- Favicon -->' comments
        content = content.replace(/<!--\s*Favicon\s*-->/gi, '');
        content = content.replace(/<!--\s*Favicon for Browser & Google Search\s*-->/gi, '');
        
        content = content.replace('</head>', `${faviconHtml}\n</head>`);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Injected favicon into: ${file} (Path: ${faviconRelPath})`);
        updated++;
    } else {
        console.log(`Warning: No </head> tag found in ${file}`);
    }
}

console.log(`\nSuccessfully updated ${updated} HTML files with the new Favicon logic!`);
