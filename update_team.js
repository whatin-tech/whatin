const fs = require('fs');

let html = fs.readFileSync('pages/team.html', 'utf8');

// Replace Dushyant
html = html.replace(
    "{ id: 'dushyant', name: 'Dushyant Saini', role: 'FOUNDER, CTA', icon: '', img: '../images/dushyant_profile.png', bio: 'A visionary student at GL Bajaj. Engineered the WHATIN Ecosystem to bridge the gap between academic curriculum and cutting-edge industry standards.', color: '#38bdf8', s: [] },",
    "{ id: 'dushyant', name: 'Dushyant Saini', role: 'FOUNDER, CTO', icon: '', img: '../images/dushyant_profile.png', bio: 'As the Chief Technology Officer (CTO), Dushyant spearheads the technological vision of WHATIN. He architects the core platforms, drives innovation, and ensures the ecosystem runs on robust, cutting-edge technology.', color: '#38bdf8', s: [] },"
);

// Replace Neelesh
html = html.replace(
    "{ id: 'p1', name: 'Neelesh', role: 'CO-Founder , COO', icon: '', img: '../images/neelesh_image.jpeg', bio: 'Co-founder of WHATIN. Responsible for writing clean, scalable code and building robust architecture.', color: '#a855f7', s: [] },",
    "{ id: 'p1', name: 'Neelesh', role: 'CO - FOUNDER, COO', icon: '', img: '../images/neelesh_image.jpeg', bio: 'As the Chief Operations Officer (COO), Neelesh oversees the daily operations and strategic execution. He ensures seamless processes, team coordination, and scalable systems.', color: '#a855f7', s: [] },"
);

// Replace p2 (Old CTO) with Unnati (CMO)
html = html.replace(
    "{ id: 'p2', name: 'Name TBA', role: 'Chief Technology Officer (CTO)', icon: 'fa-palette', img: '', bio: 'Design lead placeholder. Specializes in glassmorphism and liquid crystal UI.', color: '#34d399', s: [] },",
    "{ id: 'p2', name: 'Unnati Gupta', role: 'Chief Marketing Officer (CMO)', icon: '', img: '../images/unnati_gupta.jpg', bio: 'As the Chief Marketing Officer (CMO), Unnati drives the brand strategy, public relations, and community outreach. She is responsible for expanding the platform\\'s visibility.', color: '#34d399', s: [] },"
);

// Replace p4 (Old CMO) with generic placeholder
html = html.replace(
    "{ id: 'p4', name: 'Name TBA', role: 'Chief Marketing & PR Officer (CMO)', icon: 'fa-cogs', img: '', bio: 'Operations placeholder. Keeps the ecosystem running smoothly.', color: '#38bdf8', s: [] },",
    "{ id: 'p4', name: 'Name TBA', role: 'Team Member', icon: 'fa-user-astronaut', img: '', bio: 'Details will be updated soon.', color: '#38bdf8', s: [] },"
);

fs.writeFileSync('pages/team.html', html);
console.log('team.html successfully updated!');
