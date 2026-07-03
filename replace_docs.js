const fs = require('fs');

const files = [
    'pages/affidavit.html',
    'pages/anti-ragging.html',
    'pages/gap-affidavit.html',
    'pages/scholarship-affidavit.html',
    'pages/name-correction.html'
];

const newHTML = `                <h3 style="margin-top: 4rem; font-size: 1.8rem; color: #fff; text-align: center;">Mandatory Document <i class="fas fa-file-signature" style="color: var(--accent-primary);"></i></h3>
                
                <div class="aadhar-requirement-box pop-scale" style="max-width: 800px; margin: 2rem auto 4rem; background: linear-gradient(145deg, rgba(30,30,40,0.9), rgba(15,15,20,0.95)); border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 20px; padding: 3rem; box-shadow: 0 15px 35px rgba(0,0,0,0.5), inset 0 0 20px rgba(56, 189, 248, 0.1); position: relative; overflow: hidden;">
                    
                    <!-- Animated glow effect -->
                    <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%); animation: spinGlow 15s linear infinite; pointer-events: none;"></div>
                    
                    <div style="position: relative; z-index: 2; text-align: center;">
                        <i class="fas fa-id-card pop-in" style="font-size: 3.5rem; color: #38bdf8; margin-bottom: 1.5rem; filter: drop-shadow(0 0 15px rgba(56,189,248,0.6));"></i>
                        <h4 class="pop-in" style="font-size: 1.8rem; color: #fff; margin-bottom: 1rem; animation-delay: 0.1s;">Aadhar Cards <span style="color: #ef4444; font-size: 1.3rem;">(Strictly Required)</span></h4>
                        <p class="pop-in" style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; margin-bottom: 2.5rem; animation-delay: 0.2s;">For complete legal identity verification on the stamp paper, clear photocopies (both sides) of Aadhar Cards are mandatory for the following individuals:</p>
                        
                        <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
                            <div class="pop-scale" style="background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3); padding: 1rem 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 0.8rem; animation-delay: 0.3s; box-shadow: 0 5px 15px rgba(56,189,248,0.15);">
                                <i class="fas fa-user" style="color: #38bdf8; font-size: 1.2rem;"></i>
                                <span style="color: #fff; font-weight: 500; font-size: 1.1rem;">Yourself</span>
                            </div>
                            <div class="pop-scale" style="background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.3); padding: 1rem 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 0.8rem; animation-delay: 0.4s; box-shadow: 0 5px 15px rgba(168,85,247,0.15);">
                                <i class="fas fa-user-tie" style="color: #a855f7; font-size: 1.2rem;"></i>
                                <span style="color: #fff; font-weight: 500; font-size: 1.1rem;">Your Father</span>
                            </div>
                            <div class="pop-scale" style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); padding: 1rem 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 0.8rem; animation-delay: 0.5s; box-shadow: 0 5px 15px rgba(16,185,129,0.15);">
                                <i class="fas fa-user-clock" style="color: #10b981; font-size: 1.2rem;"></i>
                                <span style="color: #fff; font-weight: 500; font-size: 1.1rem;">Your Grandfather</span>
                            </div>
                        </div>
                    </div>
                </div>

                <style>
                    @keyframes spinGlow { 100% { transform: rotate(360deg); } }
                </style>
`;

const oldRegex = /<h3 style="margin-top: 4rem; font-size: 1\.8rem; color: #fff;">Required Documents <i class="fas fa-file-alt".*?<\/h3>\s*<div class="document-grid">[\s\S]*?<\/div>/;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.match(oldRegex)) {
            content = content.replace(oldRegex, newHTML);
            fs.writeFileSync(file, content);
            console.log('Successfully updated docs in ' + file);
        } else {
            console.log('Could not find old docs section in ' + file);
        }
    } catch (e) {
        console.error('Error in ' + file + ':', e.message);
    }
});
