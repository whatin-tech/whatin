const fs = require('fs');

// 1. Update contributors.html
let html = fs.readFileSync('pages/contributors.html', 'utf8');

const bsaOld = `                <!-- BSA Head -->
                <div class="contributor-card">
                    <div class="profile-image-container" style="position: relative; width: 140px; height: 140px; margin: 0 auto 2rem;">
                        <div style="width: 100%; height: 100%; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--accent-primary); border: 2px solid rgba(255,255,255,0.1);">
                            <i class="fas fa-user-astronaut"></i>
                        </div>
                    </div>
                    <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Name TBA</h2>
                    <h4 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem; letter-spacing: 1px; text-transform: uppercase;">BSA Head</h4>
                    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 2rem;">
                        Details will be updated soon.
                    </p>
                    <div class="social-links" style="margin-top: auto;">
                        <a href="#" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>`;

const bsaNew = `                <!-- Uma Saini (BSA Head) -->
                <div class="contributor-card">
                    <div class="profile-image-container" style="position: relative; width: 140px; height: 140px; margin: 0 auto 2rem;">
                        <div style="width: 100%; height: 100%; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--accent-primary); border: 2px solid rgba(255,255,255,0.1);">
                            <i class="fas fa-user-astronaut"></i>
                        </div>
                    </div>
                    <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Uma Saini</h2>
                    <h4 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem; letter-spacing: 1px; text-transform: uppercase;">BSA Head</h4>
                    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 2rem;">
                        As the BSA Head, Uma spearheads the Brand Strategy and Acquisition for WHATIN. She is responsible for driving growth initiatives, managing strategic partnerships, and ensuring our brand's message resonates effectively with our target audience.
                    </p>
                </div>`;

if(html.includes(bsaOld)) {
    html = html.replace(bsaOld, bsaNew);
    fs.writeFileSync('pages/contributors.html', html);
    console.log('contributors.html updated!');
} else {
    console.log('BSA block not found in contributors.html.');
}

// 2. Update team.html
let teamHtml = fs.readFileSync('pages/team.html', 'utf8');

const bsaTeamOld = `{ id: 'p8', name: 'Name TBA', role: 'BSA Head', icon: 'fa-headset', img: '', bio: 'Support placeholder. Helps students resolve technical issues.', color: '#38bdf8', s: [] },`;
const bsaTeamNew = `{ id: 'p8', name: 'Uma Saini', role: 'BSA Head', icon: 'fa-headset', img: '', bio: 'As the BSA Head, Uma spearheads the Brand Strategy and Acquisition for WHATIN. She is responsible for driving growth initiatives and managing strategic partnerships.', color: '#38bdf8', s: [] },`;

if(teamHtml.includes(bsaTeamOld)) {
    teamHtml = teamHtml.replace(bsaTeamOld, bsaTeamNew);
    fs.writeFileSync('pages/team.html', teamHtml);
    console.log('team.html updated!');
} else {
    console.log('BSA team line not found in team.html.');
}
