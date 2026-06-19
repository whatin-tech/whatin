const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const isRoot = !filePath.replace(/\\/g, '/').includes('/pages/');
    const relativePrefix = isRoot ? 'pages/' : '';
    const indexPrefix = isRoot ? '' : '../';

    // 1. Remove Neelesh Tiwari copyright strings
    content = content.replace(/Architected by Dushyant Saini & Neelesh Tiwari\./g, 'Architected by Dushyant Saini.');
    content = content.replace(/Dushyant Saini and Neelesh Tiwari/g, 'Dushyant Saini');

    // 2. Remove Neelesh Tiwari specific blocks in about.html and index.html
    // In index.html
    content = content.replace(/<!-- Neelesh Tiwari -->[\s\S]*?(?=<!--|\/div>\s*<\/div>\s*<\/section>)/g, '');
    
    // In about.html
    content = content.replace(/<div class="creator-card">[\s\S]*?<h3 class="creator-name">NEELESH TIWARI[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g, '');

    // 3. Update the logo to be cleaner
    content = content.replace(/<div class="logo"[^>]*>WHATIN.*?<\/div>/gi, `<div class="logo" onclick="window.location.href='${indexPrefix}index.html'">W H A T I N</div>`);
    content = content.replace(/<div class="logo">WHATIN 💡<\/div>/g, '<div class="logo">W H A T I N</div>');

    // 4. Update Navbar links: Remove "Start Learning Now" and Add "Contributors"
    content = content.replace(/<li><a[^>]*>Start Learning Now<\/a><\/li>/gi, `<li><a href="${relativePrefix}contributors.html">Contributors</a></li>`);

    fs.writeFileSync(filePath, content);
}

function processCSS(cssPath) {
    let css = fs.readFileSync(cssPath, 'utf8');
    // Change header width to push logo to the side
    css = css.replace(/header\s*\{[^}]*width:\s*auto;[^}]*\}/, (match) => {
        return match.replace(/width:\s*auto;/, 'width: 90%; max-width: 1200px;');
    });
    // Update logo styling
    css = css.replace(/\.logo\s*\{[^}]*\}/, `.logo {
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    cursor: pointer;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}`);
    fs.writeFileSync(cssPath, css);
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
        } else if (fullPath.endsWith('style.css')) {
            processCSS(fullPath);
            console.log('Processed CSS:', fullPath);
        }
    }
}

walkDir('.');
