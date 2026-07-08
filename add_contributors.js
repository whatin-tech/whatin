const fs = require('fs');

const roles = [
    "Chief Operations Officer ( COO )",
    "Chief Technology Officer (CTO)",
    "Chief Content Officer (CCO)",
    "Chief Marketing & PR Officer (CMO)",
    "Creative Director",
    "Campus Operations Director",
    "GLA Head",
    "BSA Head"
];

let cardsHtml = '';
roles.forEach(role => {
    cardsHtml += `
                <!-- ${role} -->
                <div class="contributor-card">
                    <div class="profile-image-container" style="position: relative; width: 140px; height: 140px; margin: 0 auto 2rem;">
                        <div style="width: 100%; height: 100%; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--accent-primary); border: 2px solid rgba(255,255,255,0.1);">
                            <i class="fas fa-user-astronaut"></i>
                        </div>
                    </div>
                    <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Name TBA</h2>
                    <h4 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem; letter-spacing: 1px; text-transform: uppercase;">${role}</h4>
                    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 2rem;">
                        Details will be updated soon.
                    </p>
                    <div class="social-links" style="margin-top: auto;">
                        <a href="#" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
`;
});

let html = fs.readFileSync('pages/contributors.html', 'utf8');

// Update Dushyant's role
html = html.replace('Lead Architect &amp; Founder', 'FOUNDER, COO');
html = html.replace('Lead Architect & Founder', 'FOUNDER, COO');
html = html.replace('FOUNDER , COO', 'FOUNDER, COO'); // just in case

// Insert the new cards before the closing </div> of contributors-grid
// Let's replace the commented template area
const templateRegex = /<!-- Template for New Contributors [\s\S]*?-->/g;
html = html.replace(templateRegex, cardsHtml);

fs.writeFileSync('pages/contributors.html', html);
console.log('Successfully added 8 contributor cards and updated Dushyant role.');
