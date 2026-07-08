const fs = require('fs');

const newRoles = [
    "Chief Operations Officer (COO)",
    "Chief Technology Officer (CTO)",
    "Chief Content Officer (CCO)",
    "Chief Marketing & PR Officer (CMO)",
    "Creative Director",
    "Campus Operations Director",
    "GLA Head",
    "BSA Head"
];

let html = fs.readFileSync('pages/team.html', 'utf8');

// Replace roles for p2 to p9
html = html.replace(/{ id: 'p2', name: 'Member 3', role: 'Designer'/g, "{ id: 'p2', name: 'Name TBA', role: '" + newRoles[0] + "'");
html = html.replace(/{ id: 'p3', name: 'Member 4', role: 'Marketing'/g, "{ id: 'p3', name: 'Name TBA', role: '" + newRoles[1] + "'");
html = html.replace(/{ id: 'p4', name: 'Member 5', role: 'Operations'/g, "{ id: 'p4', name: 'Name TBA', role: '" + newRoles[2] + "'");
html = html.replace(/{ id: 'p5', name: 'Member 6', role: 'Content'/g, "{ id: 'p5', name: 'Name TBA', role: '" + newRoles[3] + "'");
html = html.replace(/{ id: 'p6', name: 'Member 7', role: 'Community'/g, "{ id: 'p6', name: 'Name TBA', role: '" + newRoles[4] + "'");
html = html.replace(/{ id: 'p7', name: 'Member 8', role: 'Strategy'/g, "{ id: 'p7', name: 'Name TBA', role: '" + newRoles[5] + "'");
html = html.replace(/{ id: 'p8', name: 'Member 9', role: 'Support'/g, "{ id: 'p8', name: 'Name TBA', role: '" + newRoles[6] + "'");
html = html.replace(/{ id: 'p9', name: 'Member 10', role: 'Join Us'/g, "{ id: 'p9', name: 'Name TBA', role: '" + newRoles[7] + "'");

fs.writeFileSync('pages/team.html', html);
console.log('Successfully updated 8 roles in team.html');
