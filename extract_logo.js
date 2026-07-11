const fs = require('fs');
const path = require('path');

// 1. Update HTML files
function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Only process 'pages' directory and root
            if (file === 'pages') {
                processDirectory(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Regex to find the logo exactly inside the header-content container
            const headerRegex = /(<header id="main-header">[\s\S]*?<div class="container header-content">\s*)(<div class="logo"[\s\S]*?<\/div>)/;
            const match = content.match(headerRegex);
            if (match) {
                let logoHtml = match[2];
                // Add fixed-logo class without breaking existing classes
                let newLogoHtml = logoHtml.replace('class="logo"', 'class="logo fixed-logo"');
                
                // Replace the block, placing the new logo before the header
                let newContent = content.replace(headerRegex, newLogoHtml + '\n    $1');
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated HTML: ${fullPath}`);
            }
        }
    }
}
processDirectory('.');

// 2. Update style.css
let css = fs.readFileSync('css/style.css', 'utf8');

// Add fixed-logo class and mobile header tweaks
const fixedLogoCss = `
/* --- Fixed Logo Styles --- */
.fixed-logo {
    position: fixed !important;
    top: 28px !important;
    left: 40px !important;
    z-index: 1100 !important;
}

@media (max-width: 768px) {
    .fixed-logo {
        top: 25px !important;
        left: 20px !important;
        font-size: 1.5rem !important;
    }
    
    header#main-header {
        left: auto !important;
        right: 20px !important;
        transform: none !important;
        width: auto !important;
        padding: 0.5rem 1.2rem !important;
        border-radius: 12px !important;
        top: 20px !important;
    }
}
`;
if (!css.includes('.fixed-logo')) {
    css += fixedLogoCss;
}

// Update header width to max-content
const headerOld = `width: 90%; max-width: 1200px;`;
const headerNew = `width: max-content; max-width: 90%;`;
if (css.includes(headerOld)) {
    css = css.replace(headerOld, headerNew);
}

// Center the nav in the header-content
const hcOld = `.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
}`;
const hcNew = `.header-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
}`;
if (css.includes(hcOld)) {
    css = css.replace(hcOld, hcNew);
}

fs.writeFileSync('css/style.css', css);
console.log('Updated style.css');
