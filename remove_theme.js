const fs = require('fs');
const path = require('path');

// Regex patterns to match the theme toggle block and the head script
const themeDivRegex = /<div class="theme-toggle" id="theme-toggle"[\s\S]*?<\/div>/gi;
const themeScriptRegex = /<script>\s*if\s*\(localStorage\.getItem\('theme'\)\s*===\s*'light'\)\s*\{\s*document\.documentElement\.classList\.add\('light-mode'\);\s*\}\s*<\/script>/gi;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (themeDivRegex.test(content)) {
        content = content.replace(themeDivRegex, '');
        changed = true;
    }

    if (themeScriptRegex.test(content)) {
        content = content.replace(themeScriptRegex, '');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Removed theme toggle from: ${filePath}`);
    }
}

// Process root files
['index.html', 'guidance.html'].forEach(f => {
    if (fs.existsSync(f)) processFile(f);
});

// Process pages/ files
const pagesDir = 'pages';
if (fs.existsSync(pagesDir)) {
    const pagesFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
    pagesFiles.forEach(f => {
        processFile(path.join(pagesDir, f));
    });
}

// Also remove from js/script.js
const scriptPath = 'js/script.js';
if (fs.existsSync(scriptPath)) {
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    // We can just find the theme toggle logic block and remove it.
    // Easiest is to replace everything related to theme-toggle.
    const jsThemeRegex = /\/\/ Theme Toggle Logic[\s\S]*?if\s*\(localStorage\.getItem\('theme'\)\s*===\s*'light'\)\s*\{[\s\S]*?\}/g;
    
    // Simpler: Just find the block manually or by a broad regex
    const startTheme = scriptContent.indexOf('// Theme Toggle Logic');
    if (startTheme !== -1) {
        // Find next comment or something
        const endTheme = scriptContent.indexOf('// Mobile Menu Logic', startTheme);
        if (endTheme !== -1) {
            scriptContent = scriptContent.substring(0, startTheme) + scriptContent.substring(endTheme);
            fs.writeFileSync(scriptPath, scriptContent);
            console.log("Removed theme logic from js/script.js");
        }
    }
}
