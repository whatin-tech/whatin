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

        // Update Q3 Answer
        const oldQ3Answer = /<strong>You are strictly responsible for the details you submit\.<\/strong> If you provide incorrect names, spellings, or any invalid data, and the affidavit gets printed with those errors, the liability falls entirely on you\. Please double-check all entries before making the payment\./;
        
        const newQ3Answer = `<strong>You are strictly responsible for the details you submit.</strong> However, if you provide wrong information and mistakenly complete the payment, contact the host immediately. You can find the host's direct number in our official WhatsApp group. Get your details corrected on time before printing. If printed with errors, the liability falls entirely on you.`;

        // Update Q4 Answer
        const oldQ4Answer = /Fast mode guarantees quicker processing and priority delivery on campus for urgent needs\. Normal mode follows the standard processing timeline but guarantees the same legal authenticity\./;
        
        const newQ4Answer = `In <strong>Fast Delivery</strong> mode, you pay an extra ₹30 and your affidavit will be ready within <strong>1 to 2 days</strong>. In <strong>Normal</strong> mode, the standard processing time is about <strong>1 week</strong>. This is the primary difference between the two modes.`;

        if (content.match(oldQ3Answer) && content.match(oldQ4Answer)) {
            content = content.replace(oldQ3Answer, newQ3Answer);
            content = content.replace(oldQ4Answer, newQ4Answer);
            fs.writeFileSync(file, content);
            console.log('Updated answers in ' + file);
        } else {
            console.log('Could not find old answers in ' + file);
        }

    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
