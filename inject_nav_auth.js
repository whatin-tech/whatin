const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const isRoot = !filePath.replace(/\\/g, '/').includes('/pages/');
    const relativePrefix = isRoot ? '' : '../';

    const scriptTag = `<script type="module" src="${relativePrefix}js/nav-auth.js"></script>\n</body>`;

    if (!content.includes('js/nav-auth.js')) {
        content = content.replace('</body>', scriptTag);
        fs.writeFileSync(filePath, content);
        console.log('Injected Nav Auth into:', filePath);
    }
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
        }
    }
}

walkDir('.');
