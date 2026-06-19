const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Proper root detection
    const normalizedPath = filePath.replace(/\\/g, '/');
    // If path starts with 'pages/' or contains '/pages/', it's not root.
    const isRoot = !normalizedPath.match(/(^|\/)pages\//);
    const relativePrefix = isRoot ? 'pages/' : '';

    // Fix the Nav Links
    // In files INSIDE 'pages/', the links should NOT have 'pages/'
    if (!isRoot) {
        if (content.includes('href="pages/admin.html"')) {
            content = content.replace(/href="pages\/admin\.html"/g, 'href="admin.html"');
            changed = true;
        }
        if (content.includes('href="pages/contributors.html"')) {
            content = content.replace(/href="pages\/contributors\.html"/g, 'href="contributors.html"');
            changed = true;
        }
    }

    // Fix the Script Injection
    if (!isRoot) {
        if (content.includes('src="js/nav-auth.js"')) {
            content = content.replace(/src="js\/nav-auth\.js"/g, 'src="../js/nav-auth.js"');
            changed = true;
        }
    } else {
        if (content.includes('src="../js/nav-auth.js"')) {
            content = content.replace(/src="\.\.\/js\/nav-auth\.js"/g, 'src="js/nav-auth.js"');
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed paths in:', filePath);
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
