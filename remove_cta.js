const fs = require('fs');

const files = [
    'pages/affidavit.html',
    'pages/anti-ragging.html',
    'pages/gap-affidavit.html',
    'pages/scholarship-affidavit.html',
    'pages/name-correction.html'
];

const ctaRegex = /<div class="cta-container pop-scale">[\s\S]*?<\/div>\s*<\/section>/;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.match(ctaRegex)) {
            content = content.replace(ctaRegex, '</section>');
            fs.writeFileSync(file, content);
            console.log('Removed CTA from ' + file);
        } else {
            console.log('CTA not found in ' + file);
        }
    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
