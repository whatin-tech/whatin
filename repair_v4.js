const fs = require('fs');
const path = require('path');

const adminPath = path.join('e:\\origin of whatin\\whatin', 'pages', 'admin.html');
let lines = fs.readFileSync(adminPath, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<!-- BSA Manager -->')) {
        // We found the marker. Insert a </div> right before this line.
        lines.splice(i, 0, '            </div>');
        break;
    }
}

fs.writeFileSync(adminPath, lines.join('\n'), 'utf8');
console.log('Successfully inserted closing div for collegeManager in admin.html');
