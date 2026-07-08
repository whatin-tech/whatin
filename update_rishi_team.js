const fs = require('fs');

let html = fs.readFileSync('pages/team.html', 'utf8');

// Replace p3 (CCO placeholder) with Rishi Kumar
html = html.replace(
    "{ id: 'p3', name: 'Name TBA', role: 'Chief Content Officer (CCO)', icon: 'fa-bullhorn', img: '', bio: 'Marketing placeholder. Drives user acquisition and brand presence.', color: '#fbbf24', s: [] },",
    "{ id: 'p3', name: 'Rishi Kumar', role: 'Chief Content Officer (CCO)', icon: '', img: '../images/rishi_kumar.jpg', bio: 'As the Chief Content Officer (CCO), Rishi curates, manages, and ensures the highest quality of study materials on WHATIN.', color: '#fbbf24', s: [] },"
);

fs.writeFileSync('pages/team.html', html);
console.log('team.html successfully updated with Rishi Kumar!');
