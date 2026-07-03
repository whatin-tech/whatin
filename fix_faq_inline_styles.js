const fs = require('fs');

const files = [
    'pages/affidavit.html',
    'pages/anti-ragging.html',
    'pages/gap-affidavit.html',
    'pages/scholarship-affidavit.html',
    'pages/name-correction.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Remove inline style from .faq-answer
        const oldFaqAnswerDiv = /<div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0\.3s ease;">/g;
        content = content.replace(oldFaqAnswerDiv, '<div class="faq-answer">');
        
        fs.writeFileSync(file, content);
        console.log('Fixed inline styles in ' + file);

    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
