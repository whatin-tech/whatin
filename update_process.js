const fs = require('fs');

const files = [
    'pages/affidavit.html',
    'pages/anti-ragging.html',
    'pages/gap-affidavit.html',
    'pages/scholarship-affidavit.html',
    'pages/name-correction.html'
];

const newProcessHTML = `                <div class="process-container pop-in" style="position: relative; padding: 4rem; overflow: hidden;">
                    <!-- Decorative Background elements -->
                    <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(56, 189, 248, 0.1); filter: blur(40px); border-radius: 50%;"></div>
                    <div style="position: absolute; bottom: -50px; left: -50px; width: 200px; height: 200px; background: rgba(139, 92, 246, 0.1); filter: blur(50px); border-radius: 50%;"></div>

                    <h3 style="font-size: 2rem; color: #fff; margin-bottom: 3rem; text-align: center; position: relative; z-index: 2;">How It <span class="gradient-text">Works</span> <i class="fas fa-cogs" style="font-size: 1.5rem; color: var(--accent-primary);"></i></h3>
                    
                    <div style="position: relative; z-index: 2; display: flex; flex-direction: column; gap: 2.5rem;">
                        
                        <div class="step-item pop-left" style="align-items: flex-start;">
                            <div class="step-number" style="box-shadow: 0 0 20px rgba(56, 189, 248, 0.6); background: linear-gradient(135deg, #0ea5e9, #38bdf8);">
                                <i class="fas fa-mouse-pointer" style="font-size: 1.1rem;"></i>
                            </div>
                            <div class="step-content" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 16px; flex-grow: 1; backdrop-filter: blur(5px);">
                                <h4 style="color: #38bdf8; font-size: 1.3rem;"><span style="color: #fff;">01.</span> Select Category</h4>
                                <p style="font-size: 0.95rem; line-height: 1.6; margin-top: 0.5rem;">Choose the specific type of affidavit you need from our available options above (Anti-Ragging, Gap, Scholarship, etc.).</p>
                            </div>
                        </div>

                        <div class="step-item pop-right" style="align-items: flex-start; animation-delay: 0.2s;">
                            <div class="step-number" style="box-shadow: 0 0 20px rgba(168, 85, 247, 0.6); background: linear-gradient(135deg, #9333ea, #c084fc);">
                                <i class="fas fa-file-invoice" style="font-size: 1.1rem;"></i>
                            </div>
                            <div class="step-content" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 16px; flex-grow: 1; backdrop-filter: blur(5px);">
                                <h4 style="color: #c084fc; font-size: 1.3rem;"><span style="color: #fff;">02.</span> Submit & Pay</h4>
                                <p style="font-size: 0.95rem; line-height: 1.6; margin-top: 0.5rem;">Carefully fill out the official form with your exact details, upload your required documents, and securely complete the payment.</p>
                            </div>
                        </div>

                        <div class="step-item pop-left" style="align-items: flex-start; animation-delay: 0.4s;">
                            <div class="step-number" style="box-shadow: 0 0 20px rgba(245, 158, 11, 0.6); background: linear-gradient(135deg, #d97706, #fbbf24);">
                                <i class="fas fa-tachometer-alt" style="font-size: 1.1rem;"></i>
                            </div>
                            <div class="step-content" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 16px; flex-grow: 1; backdrop-filter: blur(5px);">
                                <h4 style="color: #fbbf24; font-size: 1.3rem;"><span style="color: #fff;">03.</span> Select Speed</h4>
                                <p style="font-size: 0.95rem; line-height: 1.6; margin-top: 0.5rem;">Choose your processing mode: <strong>Fast-Track</strong> for urgent needs or <strong>Normal</strong> processing based on your timeline.</p>
                            </div>
                        </div>

                        <div class="step-item pop-right" style="align-items: flex-start; animation-delay: 0.6s;">
                            <div class="step-number" style="box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); background: linear-gradient(135deg, #059669, #34d399);">
                                <i class="fas fa-map-marker-alt" style="font-size: 1.1rem;"></i>
                            </div>
                            <div class="step-content" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 16px; flex-grow: 1; backdrop-filter: blur(5px);">
                                <h4 style="color: #34d399; font-size: 1.3rem;"><span style="color: #fff;">04.</span> Campus Delivery</h4>
                                <p style="font-size: 0.95rem; line-height: 1.6; margin-top: 0.5rem;">Your official, legally notarized affidavit will be prepared and delivered directly to you inside the college campus right on time.</p>
                            </div>
                        </div>

                    </div>

                    <!-- Trust and Responsibility Banner -->
                    <div class="trust-banner pop-scale" style="margin-top: 3.5rem; position: relative; z-index: 2; background: linear-gradient(145deg, rgba(20,20,20,0.8), rgba(10,10,10,0.9)); border: 1px solid rgba(239, 68, 68, 0.3); border-left: 5px solid #ef4444; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <h4 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.8rem;">
                            <i class="fas fa-shield-check" style="color: #10b981;"></i> 100% Reliable Service
                        </h4>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
                            This ecosystem is fully verified and transparent. There is absolutely <strong>0% chance of any scam</strong> or fraud. Your documents are handled with utmost professionalism.
                        </p>
                        
                        <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 1rem 1.5rem; border: 1px dashed rgba(239, 68, 68, 0.4);">
                            <h5 style="color: #ef4444; font-size: 1.1rem; margin-bottom: 0.5rem;"><i class="fas fa-exclamation-triangle"></i> Student Responsibility Notice</h5>
                            <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                You are strictly responsible for the details you provide in the form. If you provide incorrect spelling, wrong names, or invalid data, and the affidavit is printed with those errors, <strong>the liability falls entirely on you</strong>. Please double-check your entries before paying.
                            </p>
                        </div>
                    </div>
                </div>`;

// Regex to match the old process-container until the end of its closing div (before cta-container)
const oldProcessRegex = /<div class="process-container pop-in">[\s\S]*?(?=<div class="cta-container)/;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        if (content.match(oldProcessRegex)) {
            content = content.replace(oldProcessRegex, newProcessHTML + '\n\n                ');
            fs.writeFileSync(file, content);
            console.log('Updated ' + file);
        } else {
            console.log('process-container not found in ' + file);
        }
    } catch (e) {
        console.error('Error updating ' + file + ':', e.message);
    }
});
