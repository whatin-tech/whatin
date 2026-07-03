const fs = require('fs');
const path = require('path');

function replaceNav(filePath, isRoot) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Determine the path prefix
    const rootPrefix = isRoot ? '' : '../';
    const pagesPrefix = isRoot ? 'pages/' : '';
    
    // Determine active file for setting the active class
    const filename = path.basename(filePath);

    // Build the <ul>
    const getActive = (name) => {
        if (name === filename) return ' class="active"';
        if (filename === 'index.html' && name === 'index.html') return ' class="active"';
        return '';
    };

    const newNav = `            <nav id="nav-menu">
                <ul style="align-items: center; margin: 0;">
                    <li><a href="${rootPrefix}index.html"${getActive('index.html')}>Home</a></li>
                    <li><a href="${pagesPrefix}about.html"${getActive('about.html')}>About</a></li>
                    <li><a href="${rootPrefix}guidance.html"${getActive('guidance.html')}>Guidance</a></li>
                    <li><a href="${pagesPrefix}contributors.html"${getActive('contributors.html')}>Contributors</a></li>
                    <li><a href="${pagesPrefix}contact.html"${getActive('contact.html')}>Contact</a></li>
                    <li><a href="https://chat.whatsapp.com/BegnxxKgYZa4IWMV35CPxO" target="_blank" style="color: #25D366; font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;"><i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i> WhatsApp</a></li>
                    <li><a href="${pagesPrefix}login.html" class="admin-link"><i class="fas fa-lock"></i> Admin</a></li>
                    <li><a href="${rootPrefix}index.html#projects" class="cta-btn-header">Resources</a></li>
                </ul>
            </nav>`;

    // Replace the existing <nav id="nav-menu">...</nav>
    const navRegex = /<nav id="nav-menu">[\s\S]*?<\/nav>/gi;
    
    if (navRegex.test(content)) {
        content = content.replace(navRegex, newNav);
        fs.writeFileSync(filePath, content);
        console.log(`Updated nav in: ${filePath}`);
    } else {
        console.log(`No nav found in: ${filePath}`);
    }
}

// Update Root Files
const rootFiles = ['index.html', 'guidance.html'];
rootFiles.forEach(f => {
    if (fs.existsSync(f)) replaceNav(f, true);
});

// Update Pages Files
const pagesDir = 'pages';
if (fs.existsSync(pagesDir)) {
    const pagesFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
    pagesFiles.forEach(f => {
        replaceNav(path.join(pagesDir, f), false);
    });
}
