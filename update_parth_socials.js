const fs = require('fs');

// --- Update contributors.html ---
let html = fs.readFileSync('pages/contributors.html', 'utf8');

// Update Parth Agrawal (GLA Head)
const parthOld = `                <!-- GLA Head -->
                <div class="contributor-card">
                    <div class="profile-image-container" style="position: relative; width: 140px; height: 140px; margin: 0 auto 2rem;">
                        <div style="width: 100%; height: 100%; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--accent-primary); border: 2px solid rgba(255,255,255,0.1);">
                            <i class="fas fa-user-astronaut"></i>
                        </div>
                    </div>
                    <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Name TBA</h2>
                    <h4 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem; letter-spacing: 1px; text-transform: uppercase;">GLA Head</h4>
                    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 2rem;">
                        Details will be updated soon.
                    </p>
                    <div class="social-links" style="margin-top: auto;">
                        <a href="#" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>`;

const parthNew = `                <!-- Parth Agrawal (GLA Head) -->
                <div class="contributor-card premium-card">
                    <div class="profile-image-container" style="position: relative; width: 180px; height: 180px; margin: 0 auto 2rem; perspective: 1000px;">
                        <div style="position: absolute; inset: -10px; background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary)); border-radius: 50%; opacity: 0.3; filter: blur(20px); animation: premiumPulseBg 4s ease-in-out infinite;"></div>
                        <div class="profile-image-box" style="width: 100%; height: 100%; position: relative; z-index: 1; border-radius: 30px; border: 2px solid rgba(255,255,255,0.2); overflow: hidden; animation: premiumFloatGlow 3s ease-in-out infinite; transform-style: preserve-3d; cursor: pointer;" onclick="openImageModal('../images/parth_agrawal.jpg')">
                            <img src="../images/parth_agrawal.jpg" alt="Parth Agrawal" style="width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1) brightness(1.1); pointer-events: none;">
                        </div>
                    </div>
                    <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Parth Agrawal</h2>
                    <h4 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem; letter-spacing: 1px; text-transform: uppercase;">GLA Head</h4>
                    <p style="font-size: 1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 2rem;">
                        As the GLA Head, Parth takes charge of all WHATIN initiatives at GLA University. He actively handles campus operations, drives student engagement, and serves as the core liaison ensuring that every student gets maximum value from our platform.
                    </p>
                    <div class="social-links" style="margin-top: auto;">
                        <a href="https://www.linkedin.com/in/parth-agrawal-217193322?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/itzurparth_?utm_source=qr&igsh=ODBseTk1M2FtN3Fy" target="_blank" class="insta-btn"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>`;
html = html.replace(parthOld, parthNew);

// Update Unnati Links
const unnatiLinksOld = `                    <div class="social-links" style="margin-top: auto;">
                        <a href="#" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" target="_blank" class="insta-btn"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <!-- Rishi Kumar (CCO) -->`;
const unnatiLinksNew = `                    <div class="social-links" style="margin-top: auto;">
                        <a href="https://www.linkedin.com/in/unnati-gupta-b91305328/" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/unnatiiiguptaa?igsh=c2I2aHQ5Zm5wemQ0" target="_blank" class="insta-btn"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <!-- Rishi Kumar (CCO) -->`;
html = html.replace(unnatiLinksOld, unnatiLinksNew);

// Update Rishi Links
const rishiLinksOld = `                    <div class="social-links" style="margin-top: auto;">
                        <a href="#" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" target="_blank" class="insta-btn"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <!-- Creative Director -->`;
const rishiLinksNew = `                    <div class="social-links" style="margin-top: auto;">
                        <a href="https://www.linkedin.com/in/rishi-kumar-71415434a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" class="linkedin-btn"><i class="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/rishi.kumar.82?igsh=MXh4eHg2a3licm1tYQ==" target="_blank" class="insta-btn"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <!-- Creative Director -->`;
html = html.replace(rishiLinksOld, rishiLinksNew);

fs.writeFileSync('pages/contributors.html', html);
console.log('contributors.html updated!');

// --- Update team.html ---
let teamHtml = fs.readFileSync('pages/team.html', 'utf8');

const parthTeamOld = `{ id: 'p7', name: 'Name TBA', role: 'GLA Head', icon: 'fa-chess-knight', img: '', bio: 'Strategy placeholder. Plans the future roadmap of WHATIN.', color: '#fbbf24', s: [] },`;
const parthTeamNew = `{ id: 'p7', name: 'Parth Agrawal', role: 'GLA Head', icon: '', img: '../images/parth_agrawal.jpg', bio: 'As the GLA Head, Parth takes charge of all WHATIN initiatives at GLA University. He handles campus operations and drives student engagement.', color: '#fbbf24', s: [] },`;
teamHtml = teamHtml.replace(parthTeamOld, parthTeamNew);

fs.writeFileSync('pages/team.html', teamHtml);
console.log('team.html updated!');
