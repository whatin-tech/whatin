const fs = require('fs');

let lines = fs.readFileSync('pages/contributors.html', 'utf8').split('\n');

// 1. Remove the duplicated corrupted block (lines 168 to 205 inclusive)
// The indices are 0-based, so line 168 is index 167. 
// We want to remove 38 lines.
lines.splice(167, 38);

// 2. Find and replace the subtitle text
let html = lines.join('\n');
html = html.replace(
    'The brilliant minds building the future of engineering education.', 
    'The visionaries, architects, and engineers driving the next generation of academic excellence.'
);

fs.writeFileSync('pages/contributors.html', html);
console.log('Fixed contributors.html layout and updated subtitle!');
