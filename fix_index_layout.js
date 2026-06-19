const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Strip all ads
content = content.replace(/<script[^>]*>[\s\S]*?atOptions[\s\S]*?<\/script>\s*<script[^>]*invoke\.js[^>]*><\/script>/gi, '');
content = content.replace(/<div style="width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;">\s*<\/div>/g, '');

// Fix Dushyant Saini section (Lines 198 to 230)
// Just replace the entire visionaries-section with a clean one
const cleanVisionaries = `
            <section class="visionaries-section" style="padding: 8rem 0;">
                <div class="container">
                    <h2 class="section-title">The <span class="gradient-text">Visionaries</span> Behind WHATIN</h2>
                    <div class="vision-grid" style="display: flex; justify-content: center; margin-top: 5rem;">
                        <!-- Dushyant Saini -->
                        <div class="vision-card clay-card bg-blue pop-scale"
                            style="padding: 4rem 2.5rem; text-align: center; position: relative; overflow: hidden; max-width: 600px; width: 100%;">
                            <div style="width: 80px; height: 80px; background: var(--accent-gradient); border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; font-size: 2rem; color: #fff; box-shadow: 0 10px 20px rgba(114,193,249,0.3);">
                                <i class="fas fa-crown"></i>
                            </div>
                            <h3 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Dushyant Saini</h3>
                            <p style="color: var(--accent-primary); font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; margin-bottom: 2rem;">
                                Founder & Chief Architect</p>
                            <p style="line-height: 1.8; font-size: 1rem;">
                                As the Lead Developer, Dushyant is the mastermind behind the <strong>Technical Architecture</strong> and <strong>Visual Identity</strong> of WHATIN. His vision is to create a playful, high-performance digital environment.
                            </p>
                            <div style="margin-top: 2.5rem; display: flex; justify-content: center; gap: 1.5rem;">
                                <a href="https://linkedin.com/in/dushyant-saini-6384a532b" target="_blank" style="color: var(--accent-secondary); font-size: 1.3rem; transition: color 0.3s;"><i class="fab fa-linkedin"></i></a>
                                <a href="https://www.instagram.com/thedushyant_saini?igsh=Z2sybHAzcTI2eTA2" target="_blank" style="color: var(--accent-primary); font-size: 1.3rem; transition: color 0.3s;"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
`;
content = content.replace(/<section class="visionaries-section"[\s\S]*?(?=<footer>|<section)/, cleanVisionaries);

// Fix Hero section
// Remove hero-1 and animate hero-2
content = content.replace(/<div class="hero-images-container"[^>]*>[\s\S]*?<\/div>/, 
    `<div class="hero-images-container" style="position: relative; width: 100%; display: flex; justify-content: center; margin-top: 2rem; align-items: center; min-height: 350px;">
        <img src="images/hero-2.png" alt="Student Community" class="float-animate" style="max-width: 60%; height: auto; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5)); border-radius: 20px;">
    </div>`
);

fs.writeFileSync('index.html', content);
