const fs = require('fs');

const pages = [
    { name: 'anti-ragging.html', title: 'Anti Ragging', icon: 'fa-ban' },
    { name: 'gap-affidavit.html', title: 'Gap', icon: 'fa-calendar-minus' },
    { name: 'scholarship-affidavit.html', title: 'Scholarship', icon: 'fa-award' },
    { name: 'name-correction.html', title: 'Name Correction', icon: 'fa-users-cog' }
];

let baseHTML = fs.readFileSync('pages/affidavit.html', 'utf8');

// Remove the "Available Affidavits" section from the subpages so it doesn't nest infinitely
const availableAffidavitsRegex = /<h3 style="margin-top: 4rem; font-size: 1\.8rem; color: #fff;">Available Affidavits[\s\S]*?<\/div>\s*<h3 style="margin-top: 4rem; font-size: 1\.8rem; color: #fff;">Required Documents/i;

baseHTML = baseHTML.replace(availableAffidavitsRegex, '<h3 style="margin-top: 4rem; font-size: 1.8rem; color: #fff;">Required Documents');

pages.forEach(page => {
    let pageHTML = baseHTML;
    
    // Replace Titles
    pageHTML = pageHTML.replace(/<title>.*?<\/title>/, `<title>${page.title} Affidavit | WHATIN Ecosystem</title>`);
    pageHTML = pageHTML.replace(/<h1 class="hero-title pop-in">Student <span class="gradient-text">Affidavit Portal<\/span><\/h1>/, `<h1 class="hero-title pop-in"><i class="fas ${page.icon}"></i> ${page.title} <span class="gradient-text">Affidavit</span></h1>`);
    
    // Update breadcrumb
    pageHTML = pageHTML.replace(/<li style="color: var\(--accent-primary\);">Get Affidavit<\/li>/, `<li><a href="affidavit.html">Get Affidavit</a></li>\n                    <li style="color: var(--accent-primary);">${page.title}</li>`);

    fs.writeFileSync('pages/' + page.name, pageHTML, 'utf8');
    console.log('Created ' + page.name);
});
