const fs = require('fs');
const files = [
    'pages/anti-ragging.html',
    'pages/gap-affidavit.html',
    'pages/scholarship-affidavit.html',
    'pages/name-correction.html'
];
files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('animations.js')) {
            content = content.replace('<script src="../js/script.js"></script>', '<!-- Vanilla JS Animation Logic -->\n    <script src="../animations/animations.js"></script>\n    <script src="../js/script.js"></script>');
            fs.writeFileSync(file, content);
            console.log('Fixed ' + file);
        }
    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
