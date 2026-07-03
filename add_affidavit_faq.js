const fs = require('fs');

const file = 'pages/affidavit.html';

const faqHTML = `
            <section class="faq-section pop-in" style="margin-top: 5rem; padding-bottom: 4rem;">
                <div class="section-badge pop-in" style="margin: 0 auto 1rem; display: table;">Got Doubts?</div>
                <h2 class="section-title pop-in" style="text-align: center; margin-bottom: 3rem;">Frequently Asked <span class="gradient-text">Questions</span></h2>
                
                <div class="faq-grid" style="display: grid; gap: 1.5rem; max-width: 900px; margin: 0 auto;">
                    
                    <!-- Q1 -->
                    <div class="guide-article-card faq-item pop-scale" style="padding: 2rem; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 20px;">
                        <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <h4 style="color: var(--accent-primary); font-size: 1.2rem; margin: 0;"><i class="fas fa-question-circle" style="margin-right: 0.5rem;"></i> How exactly does this process work?</h4>
                            <i class="fas fa-chevron-down faq-toggle-icon" style="color: var(--text-secondary); transition: transform 0.3s;"></i>
                        </div>
                        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                                First, select the type of affidavit you need. Then, fill out the form with your details, submit your documents, and complete the payment. After that, choose your preferred delivery mode (Fast or Normal). Finally, your legally notarized affidavit will be delivered directly to you inside the college campus.
                            </p>
                        </div>
                    </div>

                    <!-- Q2 -->
                    <div class="guide-article-card faq-item pop-scale" style="padding: 2rem; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 20px; animation-delay: 0.1s;">
                        <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <h4 style="color: var(--accent-primary); font-size: 1.2rem; margin: 0;"><i class="fas fa-shield-alt" style="margin-right: 0.5rem;"></i> Is this service reliable? Can I trust it?</h4>
                            <i class="fas fa-chevron-down faq-toggle-icon" style="color: var(--text-secondary); transition: transform 0.3s;"></i>
                        </div>
                        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                                Yes, it is <strong>100% reliable and verified</strong>. There is absolutely a 0% chance of any scam. Your documents are handled professionally, and the final affidavit is legally valid and stamped by an authorized Notary.
                            </p>
                        </div>
                    </div>

                    <!-- Q3 -->
                    <div class="guide-article-card faq-item pop-scale" style="padding: 2rem; background: var(--glass-bg); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 20px; animation-delay: 0.2s;">
                        <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <h4 style="color: #ef4444; font-size: 1.2rem; margin: 0;"><i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i> What if I provide the wrong details in the form?</h4>
                            <i class="fas fa-chevron-down faq-toggle-icon" style="color: var(--text-secondary); transition: transform 0.3s;"></i>
                        </div>
                        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                                <strong>You are strictly responsible for the details you submit.</strong> If you provide incorrect names, spellings, or any invalid data, and the affidavit gets printed with those errors, the liability falls entirely on you. Please double-check all entries before making the payment.
                            </p>
                        </div>
                    </div>

                    <!-- Q4 -->
                    <div class="guide-article-card faq-item pop-scale" style="padding: 2rem; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 20px; animation-delay: 0.3s;">
                        <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <h4 style="color: var(--accent-primary); font-size: 1.2rem; margin: 0;"><i class="fas fa-shipping-fast" style="margin-right: 0.5rem;"></i> What is the difference between Fast and Normal mode?</h4>
                            <i class="fas fa-chevron-down faq-toggle-icon" style="color: var(--text-secondary); transition: transform 0.3s;"></i>
                        </div>
                        <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                                Fast mode guarantees quicker processing and priority delivery on campus for urgent needs. Normal mode follows the standard processing timeline but guarantees the same legal authenticity.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
`;

try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the end of the section with the FAQ section and close the section properly
    const replaceTarget = '</section>\n        </div>\n    </main>';
    
    if (content.includes(replaceTarget)) {
        content = content.replace(replaceTarget, '</section>\n' + faqHTML + '\n        </div>\n    </main>');
        fs.writeFileSync(file, content);
        console.log('Successfully added FAQ section to ' + file);
    } else {
        console.log('Target insertion point not found!');
    }
} catch (e) {
    console.error('Error:', e.message);
}
