const fs = require('fs');

// 1. Remove from contributors.html
let html = fs.readFileSync('pages/contributors.html', 'utf8');

const campusOpsBlock = `                <!-- Campus Operations Director -->
                <div class="contributor-card">
                    <div class="profile-image-container" style="position: relative; width: 140px; height: 140px; margin: 0 auto 2rem;">
                        <div style="width: 100%; height: 100%; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--accent-primary); border: 2px solid rgba(255,255,255,0.1);">
                            <i class="fas fa-user-astronaut"></i>
                        </div>
                    </div>
                    <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Name TBA</h2>
                    <h4 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem; letter-spacing: 1px; text-transform: uppercase;">Campus Operations Director</h4>
                    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 2rem;">
                        Details will be updated soon.
                    </p>
                    <div class="social-links" style="margin-top: auto;">
                        <a href="#" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>`;

if(html.includes(campusOpsBlock)) {
    html = html.replace(campusOpsBlock, '');
    fs.writeFileSync('pages/contributors.html', html);
    console.log('Removed Campus Operations Director from contributors.html');
} else {
    console.log('Campus Operations Director block not found exactly in contributors.html. Skipping.');
}

// 2. Change to placeholder in team.html
let teamHtml = fs.readFileSync('pages/team.html', 'utf8');

const p6Old = `{ id: 'p6', name: 'Name TBA', role: 'Campus Operations Director', icon: 'fa-users', img: '', bio: 'Community manager placeholder. Moderates and grows our student network.', color: '#34d399', s: [] },`;
const p6New = `{ id: 'p6', name: 'Name TBA', role: 'Team Member', icon: 'fa-user-astronaut', img: '', bio: 'Details will be updated soon.', color: '#34d399', s: [] },`;

if(teamHtml.includes(p6Old)) {
    teamHtml = teamHtml.replace(p6Old, p6New);
    fs.writeFileSync('pages/team.html', teamHtml);
    console.log('Updated Campus Operations Director to placeholder in team.html');
} else {
    console.log('Campus Operations string not found exactly in team.html. Skipping.');
}
