const fs = require('fs');

const files = [
    'pages/affidavit.html',
    'pages/anti-ragging.html',
    'pages/gap-affidavit.html',
    'pages/scholarship-affidavit.html',
    'pages/name-correction.html'
];

const newAadharHTML = `                <h3 class="pop-in" style="margin-top: 5rem; font-size: 2.2rem; color: #fff; text-align: center; letter-spacing: 1px; font-weight: 700;">Mandatory <span class="gradient-text">Document</span> <i class="fas fa-file-shield" style="color: var(--accent-primary); font-size: 1.8rem; vertical-align: middle;"></i></h3>
                
                <div class="premium-aadhar-box pop-scale" style="max-width: 850px; margin: 3rem auto 5rem; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(56, 189, 248, 0.2); border-top: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 4rem 3rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.05); position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; text-align: center;">
                    
                    <!-- High-level background animations -->
                    <div class="blob-1" style="position: absolute; top: -100px; left: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%); border-radius: 50%; animation: floatBlob 10s ease-in-out infinite alternate; pointer-events: none;"></div>
                    <div class="blob-2" style="position: absolute; bottom: -100px; right: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%); border-radius: 50%; animation: floatBlob 12s ease-in-out infinite alternate-reverse; pointer-events: none;"></div>
                    <div class="shimmer-sweep" style="position: absolute; top: 0; left: -150%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent); transform: skewX(-20deg); animation: shimmer 6s infinite; pointer-events: none;"></div>
                    
                    <div style="position: relative; z-index: 5;">
                        <div class="icon-container" style="width: 100px; height: 100px; margin: 0 auto 2rem; background: linear-gradient(135deg, rgba(56,189,248,0.1), rgba(14,165,233,0.2)); border: 1px solid rgba(56,189,248,0.3); border-radius: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(56,189,248,0.2), inset 0 0 20px rgba(56,189,248,0.2); animation: floatIcon 4s ease-in-out infinite;">
                            <i class="fas fa-id-card-clip" style="font-size: 3rem; color: #38bdf8; filter: drop-shadow(0 0 10px rgba(56,189,248,0.8));"></i>
                        </div>
                        
                        <h4 style="font-size: 1.8rem; color: #f8fafc; margin-bottom: 1rem; font-weight: 600;">Aadhar Cards <span style="background: rgba(239,68,68,0.1); color: #ef4444; font-size: 1rem; padding: 0.3rem 0.8rem; border-radius: 20px; border: 1px solid rgba(239,68,68,0.3); vertical-align: middle; margin-left: 0.5rem; display: inline-flex; align-items: center; gap: 0.4rem; animation: pulseRed 2s infinite;"><i class="fas fa-exclamation-circle"></i> Strictly Required</span></h4>
                        
                        <p style="color: #94a3b8; font-size: 1.1rem; line-height: 1.7; max-width: 600px; margin: 0 auto 3rem;">For complete legal identity verification on the stamp paper, <strong style="color: #cbd5e1;">clear photocopies (both sides)</strong> of Aadhar Cards are absolutely mandatory for the following individuals:</p>
                        
                        <div class="target-grid" style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
                            
                            <!-- Card 1 -->
                            <div class="target-card pop-scale" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(52,211,153,0.2); padding: 1.5rem 2rem; border-radius: 16px; display: flex; flex-direction: column; align-items: center; gap: 1rem; min-width: 160px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; animation-delay: 0.2s;">
                                <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(52,211,153,0.1); display: flex; align-items: center; justify-content: center; border: 1px dashed rgba(52,211,153,0.5);">
                                    <i class="fas fa-user" style="color: #34d399; font-size: 1.3rem;"></i>
                                </div>
                                <span style="color: #f1f5f9; font-weight: 600; font-size: 1.1rem;">Yourself</span>
                            </div>

                            <!-- Card 2 -->
                            <div class="target-card pop-scale" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(168,85,247,0.2); padding: 1.5rem 2rem; border-radius: 16px; display: flex; flex-direction: column; align-items: center; gap: 1rem; min-width: 160px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; animation-delay: 0.3s;">
                                <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(168,85,247,0.1); display: flex; align-items: center; justify-content: center; border: 1px dashed rgba(168,85,247,0.5);">
                                    <i class="fas fa-user-tie" style="color: #a855f7; font-size: 1.3rem;"></i>
                                </div>
                                <span style="color: #f1f5f9; font-weight: 600; font-size: 1.1rem;">Your Father</span>
                            </div>

                            <!-- Card 3 -->
                            <div class="target-card pop-scale" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(245,158,11,0.2); padding: 1.5rem 2rem; border-radius: 16px; display: flex; flex-direction: column; align-items: center; gap: 1rem; min-width: 160px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; animation-delay: 0.4s;">
                                <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(245,158,11,0.1); display: flex; align-items: center; justify-content: center; border: 1px dashed rgba(245,158,11,0.5);">
                                    <i class="fas fa-user-clock" style="color: #fbbf24; font-size: 1.3rem;"></i>
                                </div>
                                <span style="color: #f1f5f9; font-weight: 600; font-size: 1.1rem;">Your Grandfather</span>
                            </div>

                        </div>
                    </div>
                </div>

                <style>
                    /* Premium Animations */
                    @keyframes floatBlob { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(30px, 50px) scale(1.2); } }
                    @keyframes shimmer { 0% { left: -150%; } 100% { left: 200%; } }
                    @keyframes floatIcon { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); box-shadow: 0 15px 35px rgba(56,189,248,0.3), inset 0 0 25px rgba(56,189,248,0.3); } 100% { transform: translateY(0px); } }
                    @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 70% { box-shadow: 0 0 0 10px rgba(239,68,68,0); } 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); } }
                    
                    /* Hover Effects */
                    .target-card:hover { transform: translateY(-8px) scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
                    .target-card:nth-child(1):hover { border-color: #34d399; box-shadow: 0 20px 40px rgba(52,211,153,0.15); }
                    .target-card:nth-child(2):hover { border-color: #a855f7; box-shadow: 0 20px 40px rgba(168,85,247,0.15); }
                    .target-card:nth-child(3):hover { border-color: #fbbf24; box-shadow: 0 20px 40px rgba(245,158,11,0.15); }
                </style>
`;

const replaceRegex = /<h3 style="margin-top: 4rem; font-size: 1\.8rem; color: #fff; text-align: center;">Mandatory Document.*?<\/style>/s;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.match(replaceRegex)) {
            content = content.replace(replaceRegex, newAadharHTML);
            fs.writeFileSync(file, content);
            console.log('Successfully upgraded Aadhar section in ' + file);
        } else {
            console.log('Target section not found in ' + file);
        }
    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
