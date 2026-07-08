const fs = require('fs');

let teamHtml = fs.readFileSync('pages/team.html', 'utf8');

// 1. Update Dushyant's data
const dushyantOld = `{ id: 'dushyant', name: 'Dushyant Saini', role: 'FOUNDER, CTO', icon: '', img: '../images/dushyant_profile.png', bio: 'As the Chief Technology Officer (CTO), Dushyant spearheads the technological vision of WHATIN. He architects the core platforms, drives innovation, and ensures the ecosystem runs on robust, cutting-edge technology.', color: '#38bdf8', s: [] },`;
const dushyantNew = `{ id: 'dushyant', name: 'Dushyant Saini', role: 'FOUNDER, CTO', icon: '', img: '../images/dushyant_profile.png', bio: 'As the Chief Technology Officer (CTO), Dushyant spearheads the technological vision of WHATIN. He architects the core platforms, drives innovation, and ensures the ecosystem runs on robust, cutting-edge technology.', color: '#38bdf8', s: [], linkedin: 'https://linkedin.com/in/dushyant-saini-6384a532b', insta: 'https://www.instagram.com/thedushyant_saini?igsh=Z2sybHAzcTI2eTA2' },`;
teamHtml = teamHtml.replace(dushyantOld, dushyantNew);

// 2. Update Neelesh's data
const neeleshOld = `{ id: 'p1', name: 'Neelesh', role: 'CO - FOUNDER, COO', icon: '', img: '../images/neelesh_image.jpeg', bio: 'As the Chief Operations Officer (COO), Neelesh oversees the daily operations and strategic execution. He ensures seamless processes, team coordination, and scalable systems.', color: '#a855f7', s: [] },`;
const neeleshNew = `{ id: 'p1', name: 'Neelesh', role: 'CO - FOUNDER, COO', icon: '', img: '../images/neelesh_image.jpeg', bio: 'As the Chief Operations Officer (COO), Neelesh oversees the daily operations and strategic execution. He ensures seamless processes, team coordination, and scalable systems.', color: '#a855f7', s: [], linkedin: 'https://www.linkedin.com/in/neelesh-tiwari-383039358?utm_source=share_via&utm_content=profile&utm_medium=member_android', insta: 'https://www.instagram.com/neeleshtiwari395?igsh=MTFub2lndHppeW40bg==' },`;
teamHtml = teamHtml.replace(neeleshOld, neeleshNew);

// 3. Update Unnati's data
const unnatiOld = `{ id: 'p2', name: 'Unnati Gupta', role: 'Chief Marketing Officer (CMO)', icon: '', img: '../images/unnati_gupta.jpg', bio: 'As the Chief Marketing Officer (CMO), Unnati drives the brand strategy, public relations, and community outreach. She is responsible for expanding the platform\\'s visibility.', color: '#34d399', s: [] },`;
const unnatiNew = `{ id: 'p2', name: 'Unnati Gupta', role: 'Chief Marketing Officer (CMO)', icon: '', img: '../images/unnati_gupta.jpg', bio: 'As the Chief Marketing Officer (CMO), Unnati drives the brand strategy, public relations, and community outreach. She is responsible for expanding the platform\\'s visibility.', color: '#34d399', s: [], linkedin: 'https://www.linkedin.com/in/unnati-gupta-b91305328/', insta: 'https://www.instagram.com/unnatiiiguptaa?igsh=c2I2aHQ5Zm5wemQ0' },`;
teamHtml = teamHtml.replace(unnatiOld, unnatiNew);

// 4. Update Rishi's data
const rishiOld = `{ id: 'p3', name: 'Rishi Kumar', role: 'Chief Content Officer (CCO)', icon: '', img: '../images/rishi_kumar.jpg', bio: 'As the Chief Content Officer (CCO), Rishi curates, manages, and ensures the highest quality of study materials on WHATIN.', color: '#fbbf24', s: [] },`;
const rishiNew = `{ id: 'p3', name: 'Rishi Kumar', role: 'Chief Content Officer (CCO)', icon: '', img: '../images/rishi_kumar.jpg', bio: 'As the Chief Content Officer (CCO), Rishi curates, manages, and ensures the highest quality of study materials on WHATIN.', color: '#fbbf24', s: [], linkedin: 'https://www.linkedin.com/in/rishi-kumar-71415434a?utm_source=share_via&utm_content=profile&utm_medium=member_android', insta: 'https://www.instagram.com/rishi.kumar.82?igsh=MXh4eHg2a3licm1tYQ==' },`;
teamHtml = teamHtml.replace(rishiOld, rishiNew);

// 5. Update Parth's data
const parthOld = `{ id: 'p7', name: 'Parth Agrawal', role: 'GLA Head', icon: '', img: '../images/parth_agrawal.jpg', bio: 'As the GLA Head, Parth takes charge of all WHATIN initiatives at GLA University. He handles campus operations and drives student engagement.', color: '#fbbf24', s: [] },`;
const parthNew = `{ id: 'p7', name: 'Parth Agrawal', role: 'GLA Head', icon: '', img: '../images/parth_agrawal.jpg', bio: 'As the GLA Head, Parth takes charge of all WHATIN initiatives at GLA University. He handles campus operations and drives student engagement.', color: '#fbbf24', s: [], linkedin: 'https://www.linkedin.com/in/parth-agrawal-217193322?utm_source=share_via&utm_content=profile&utm_medium=member_android', insta: 'https://www.instagram.com/itzurparth_?utm_source=qr&igsh=ODBseTk1M2FtN3Fy' },`;
teamHtml = teamHtml.replace(parthOld, parthNew);

// 6. Update the Modal HTML Logic
const modalLogicOld = `                mContent.innerHTML = mediaHTML + 
                    \`<div style="font-size:2rem; font-weight:800; color:#fff;">\${data.name}</div>\` +
                    \`<div style="font-size:1rem; color:\${pieceColor}; text-transform:uppercase; letter-spacing:2px; font-weight:700; margin-bottom:1.5rem;">\${data.role}</div>\` +
                    \`<div style="font-size:1.05rem; line-height:1.7; color:#cbd5e1; margin-bottom:2rem;">\${data.bio}</div>\`;`;

const modalLogicNew = `                let socialLinksHTML = '';
                if(data.linkedin || data.insta) {
                    socialLinksHTML = \`<div class="social-links" style="display:flex; justify-content:center; gap:2rem; margin-top:0.5rem; margin-bottom: 2rem;">\`;
                    if(data.linkedin) {
                        socialLinksHTML += \`<a href="\${data.linkedin}" target="_blank" style="color:var(--accent-primary); font-size:1.8rem; transition:transform 0.3s ease;"><i class="fab fa-linkedin"></i></a>\`;
                    }
                    if(data.insta) {
                        socialLinksHTML += \`<a href="\${data.insta}" target="_blank" style="color:var(--accent-primary); font-size:1.8rem; transition:transform 0.3s ease;"><i class="fab fa-instagram"></i></a>\`;
                    }
                    socialLinksHTML += \`</div>\`;
                }

                mContent.innerHTML = mediaHTML + 
                    \`<div style="font-size:2rem; font-weight:800; color:#fff;">\${data.name}</div>\` +
                    \`<div style="font-size:1rem; color:\${pieceColor}; text-transform:uppercase; letter-spacing:2px; font-weight:700; margin-bottom:1.5rem;">\${data.role}</div>\` +
                    \`<div style="font-size:1.05rem; line-height:1.7; color:#cbd5e1; margin-bottom:1.5rem;">\${data.bio}</div>\` +
                    socialLinksHTML;`;
teamHtml = teamHtml.replace(modalLogicOld, modalLogicNew);

fs.writeFileSync('pages/team.html', teamHtml);
console.log('team.html successfully updated with social links logic and data!');
