const fs = require('fs');

const files = [
    'pages/affidavit.html',
    'pages/anti-ragging.html',
    'pages/gap-affidavit.html',
    'pages/scholarship-affidavit.html',
    'pages/name-correction.html'
];

const q5HTML = `
                    <!-- Q5 -->
                    <div class="guide-article-card faq-item pop-scale" style="padding: 2rem; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 20px; animation-delay: 0.4s;">
                        <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <h4 style="color: var(--accent-primary); font-size: 1.2rem; margin: 0;"><i class="fas fa-users" style="margin-right: 0.5rem;"></i> What if my father is absent or deceased? Whose Aadhar should I provide?</h4>
                            <i class="fas fa-chevron-down faq-toggle-icon" style="color: var(--text-secondary); transition: transform 0.3s;"></i>
                        </div>
                        <div class="faq-answer">
                            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                                By default, your <strong>Father's Aadhar card</strong> is strictly required. However, in the unfortunate event that your father is deceased or absent, you can absolutely provide the Aadhar card of your <strong>Mother or legal Guardian</strong> instead.
                            </p>
                        </div>
                    </div>
`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Target string to inject Q5 before closing of faq-grid
        const targetStr = '\n                </div>\n            </section>';
        
        if (content.includes(targetStr)) {
            content = content.replace(targetStr, q5HTML + targetStr);
            fs.writeFileSync(file, content);
            console.log('Added Q5 to ' + file);
        } else {
            console.log('Could not find target string in ' + file);
        }

    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
