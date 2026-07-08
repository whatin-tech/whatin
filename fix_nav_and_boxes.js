const fs = require('fs');
const path = require('path');

// 1. Resize boxes in team.html
let teamHtmlPath = path.join(__dirname, 'pages', 'team.html');
if (fs.existsSync(teamHtmlPath)) {
    let teamHtml = fs.readFileSync(teamHtmlPath, 'utf8');
    // Replace width: 160px; height: 160px; with width: 200px; height: 200px; in inner-desktop and inner-mobile
    teamHtml = teamHtml.replace(/width:\s*160px;\s*height:\s*160px;/g, "width: 200px; height: 200px;");
    fs.writeFileSync(teamHtmlPath, teamHtml);
    console.log("Updated team.html inner box sizes to 200x200");
}

// 2. Fix Nav Bar across all HTML files
function fixNav(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'pages') fixNav(fullPath);
        } else if (file.endsWith('.html')) {
            let html = fs.readFileSync(fullPath, 'utf8');
            
            // Check if Team link is missing
            if (!html.includes('href="team.html"') && !html.includes('href="pages/team.html"') && !html.includes('href="../pages/team.html"')) {
                // Determine the correct team path based on contributors path
                if (html.includes('<a href="contributors.html"')) {
                    html = html.replace(/<li[^>]*><a href="contributors\.html"/g, '<li><a href="team.html">Team</a></li>\n                    $&');
                    fs.writeFileSync(fullPath, html);
                    console.log("Fixed nav in " + fullPath);
                } else if (html.includes('<a href="pages/contributors.html"')) {
                    html = html.replace(/<li[^>]*><a href="pages\/contributors\.html"/g, '<li><a href="pages/team.html">Team</a></li>\n                    $&');
                    fs.writeFileSync(fullPath, html);
                    console.log("Fixed nav in " + fullPath);
                }
            }
        }
    }
}

fixNav(__dirname);
console.log("Done.");
