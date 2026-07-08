const fs = require('fs');
const path = require('path');

const teamPath = path.join('e:\\origin of whatin\\whatin', 'pages', 'team.html');
let content = fs.readFileSync(teamPath, 'utf8');

// Function to shift all Y-coordinates in an SVG path data string
function shiftY(d, shiftAmount) {
    // Matches patterns like 'M 200,0', 'L 400,75', 'C 440,75 450,85 450,100'
    // Format is Command followed by space, then pairs of x,y separated by space or comma.
    // To do this simply, we replace all occurrences of `(\d+),(\d+)` with `\1,\2+shift`
    return d.replace(/(\d+),(\d+)/g, (match, x, y) => {
        const newY = parseInt(y, 10) + shiftAmount;
        return `${x},${newY}`;
    });
}

function processPuzzle(svgHtml, prefix, shiftAmount) {
    // 1. Expand clip paths
    let newClipPaths = '';
    for (let i = 0; i < 10; i++) {
        const regex = new RegExp(`<clipPath id="${prefix}-clip-${i}">[\\s\\S]*?<path d="([\\s\\S]*?)"><\\/path>[\\s\\S]*?<\\/clipPath>`);
        const match = svgHtml.match(regex);
        if (match) {
            const oldPath = match[1];
            const newPath = shiftY(oldPath, shiftAmount);
            newClipPaths += `\n  <clipPath id="${prefix}-clip-${i+10}">\n    <path d="${newPath}"></path>\n  </clipPath>`;
        }
    }
    
    // Insert new clip paths before </defs>
    if (newClipPaths) {
        svgHtml = svgHtml.replace('</defs>', newClipPaths + '\n</defs>');
    }

    // 2. Expand jigsaw groups
    let newGroups = '';
    for (let i = 0; i < 10; i++) {
        // Regex to capture the entire group
        const groupRegex = new RegExp(`<g class="jigsaw-group" data-idx="${i}">[\\s\\S]*?<\\/g>`);
        const match = svgHtml.match(groupRegex);
        if (match) {
            let groupHtml = match[0];
            
            // Update data-idx
            groupHtml = groupHtml.replace(`data-idx="${i}"`, `data-idx="${i+10}"`);
            
            // Update clip-path URL
            groupHtml = groupHtml.replace(`url(#${prefix}-clip-${i})`, `url(#${prefix}-clip-${i+10})`);
            
            // Update inner wrapper ID
            groupHtml = groupHtml.replace(`id="inner-${prefix}-${i}"`, `id="inner-${prefix}-${i+10}"`);
            
            // Shift Y in foreignObject
            groupHtml = groupHtml.replace(/<foreignObject([^>]*?)y="(-?\d+)"([^>]*?)>/g, (m, p1, y, p2) => {
                const newY = parseInt(y, 10) + shiftAmount;
                return `<foreignObject${p1}y="${newY}"${p2}>`;
            });
            
            // Shift Y in all path definitions
            groupHtml = groupHtml.replace(/<path d="([^"]*?)"/g, (m, d) => {
                return `<path d="${shiftY(d, shiftAmount)}"`;
            });
            
            newGroups += '\n\n' + groupHtml;
        }
    }
    
    // Insert new groups before </svg>
    if (newGroups) {
        svgHtml = svgHtml.replace('</svg>', newGroups + '\n</svg>');
    }
    
    return svgHtml;
}

// Extract Desktop SVG block
const desktopRegex = /<svg viewBox="0 -50 1000 500"[^>]*>[\s\S]*?<\/svg>/;
const desktopMatch = content.match(desktopRegex);
if (desktopMatch) {
    let desktopSvg = desktopMatch[0];
    desktopSvg = desktopSvg.replace('viewBox="0 -50 1000 500"', 'viewBox="0 -50 1000 900"'); // expand viewBox height by 400
    desktopSvg = processPuzzle(desktopSvg, 'desktop', 400);
    content = content.replace(desktopMatch[0], desktopSvg);
} else {
    console.log('Failed to find desktop SVG');
}

// Extract Mobile SVG block
const mobileRegex = /<svg viewBox="-50 -50 500 1100"[^>]*>[\s\S]*?<\/svg>/;
const mobileMatch = content.match(mobileRegex);
if (mobileMatch) {
    let mobileSvg = mobileMatch[0];
    mobileSvg = mobileSvg.replace('viewBox="-50 -50 500 1100"', 'viewBox="-50 -50 500 2100"'); // expand viewBox height by 1000
    mobileSvg = processPuzzle(mobileSvg, 'mobile', 1000);
    content = content.replace(mobileMatch[0], mobileSvg);
} else {
    console.log('Failed to find mobile SVG');
}

// Expand membersData array
const membersDataRegex = /const membersData = \[([\s\S]*?)\];/;
const dataMatch = content.match(membersDataRegex);
if (dataMatch) {
    let innerArray = dataMatch[1];
    let newItems = '';
    for (let i = 11; i <= 20; i++) {
        newItems += `            { id: 'm${i}', name: 'Member ${i}', role: 'Team Member', icon: 'fa-user-astronaut', img: '', bio: 'Bio for member ${i} will be updated soon.', color: '', s: [] },\n`;
    }
    content = content.replace(membersDataRegex, `const membersData = [\n${innerArray.trim()},\n${newItems}        ];`);
}

// Expand shifts array in renderInner
const shiftsRegex = /const shifts = \[([0-9,\s-]+)\];/;
const shiftsMatch = content.match(shiftsRegex);
if (shiftsMatch) {
    const shiftStr = shiftsMatch[1].trim(); // "6, -14, 6, -14, 6, 14, -6, 14, -6, 14"
    const newShiftStr = `${shiftStr}, ${shiftStr}`;
    content = content.replace(shiftsRegex, `const shifts = [${newShiftStr}];`);
}

fs.writeFileSync(teamPath, content, 'utf8');
console.log('Successfully expanded jigsaw puzzle to 20 members.');
