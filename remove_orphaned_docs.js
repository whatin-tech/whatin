const fs = require('fs');

const files = [
    'pages/affidavit.html',
    'pages/anti-ragging.html',
    'pages/gap-affidavit.html',
    'pages/scholarship-affidavit.html',
    'pages/name-correction.html'
];

const regexToRemove = /\s*<div class="doc-card pop-scale".*?>\s*<h4><i class="fas fa-university"><\/i> College Proof<\/h4>[\s\S]*?<div class="doc-card pop-scale".*?>\s*<h4><i class="fas fa-user-circle"><\/i> Passport Photos<\/h4>[\s\S]*?<div class="doc-card pop-scale".*?>\s*<h4><i class="fas fa-graduation-cap"><\/i> Previous Marksheet<\/h4>[\s\S]*?<\/div>/;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.match(regexToRemove)) {
            content = content.replace(regexToRemove, '');
            fs.writeFileSync(file, content);
            console.log('Removed orphaned items from ' + file);
        } else {
            console.log('Orphaned items not found in ' + file);
        }
    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
