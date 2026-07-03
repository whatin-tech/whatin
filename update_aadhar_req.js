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

        const oldAadhar = /<h4><i class="fas fa-id-card"><\/i> Aadhar Card<\/h4>\s*<p>A clear photocopy of your Aadhar card \(both sides\) is required for identity verification on the stamp paper\.<\/p>/;
        
        const newAadhar = `<h4><i class="fas fa-id-card"></i> Aadhar Cards</h4>\n                        <p>Clear photocopies of Aadhar cards (both sides) are required for: <strong>Yourself, your Father, and your Grandfather</strong> for complete identity verification on the stamp paper.</p>`;

        if (content.match(oldAadhar)) {
            content = content.replace(oldAadhar, newAadhar);
            fs.writeFileSync(file, content);
            console.log('Updated Aadhar requirements in ' + file);
        } else {
            console.log('Aadhar section not found in ' + file);
        }

    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
