const fs = require('fs');
const path = require('path');

const teamPath = path.join('e:\\origin of whatin\\whatin', 'pages', 'team.html');
let content = fs.readFileSync(teamPath, 'utf8');

function shiftY(d, shiftAmount) {
    return d.replace(/(\d+),(\d+)/g, (match, x, y) => {
        const newY = parseInt(y, 10) + shiftAmount;
        return `${x},${newY}`;
    });
}

function processPuzzle(svgHtml, prefix, shiftAmount) {
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
    
    if (newClipPaths) {
        svgHtml = svgHtml.replace('</defs>', newClipPaths + '\n</defs>');
    }

    let newGroups = '';
    for (let i = 0; i < 10; i++) {
        const groupRegex = new RegExp(`<g class="jigsaw-group" data-idx="${i}">[\\s\\S]*?<\\/g>`);
        const match = svgHtml.match(groupRegex);
        if (match) {
            let groupHtml = match[0];
            groupHtml = groupHtml.replace(`data-idx="${i}"`, `data-idx="${i+10}"`);
            groupHtml = groupHtml.replace(`url(#${prefix}-clip-${i})`, `url(#${prefix}-clip-${i+10})`);
            groupHtml = groupHtml.replace(`id="inner-${prefix}-${i}"`, `id="inner-${prefix}-${i+10}"`);
            groupHtml = groupHtml.replace(/<foreignObject([^>]*?)y="(-?\d+)"([^>]*?)>/g, (m, p1, y, p2) => {
                const newY = parseInt(y, 10) + shiftAmount;
                return `<foreignObject${p1}y="${newY}"${p2}>`;
            });
            groupHtml = groupHtml.replace(/<path d="([^"]*?)"/g, (m, d) => {
                return `<path d="${shiftY(d, shiftAmount)}"`;
            });
            newGroups += '\n\n' + groupHtml;
        }
    }
    
    if (newGroups) {
        svgHtml = svgHtml.replace('</svg>', newGroups + '\n</svg>');
    }
    return svgHtml;
}

const desktopRegex = /<svg viewBox="-50 -50 1100 500"[^>]*>[\s\S]*?<\/svg>/;
const desktopMatch = content.match(desktopRegex);
if (desktopMatch) {
    let desktopSvg = desktopMatch[0];
    desktopSvg = desktopSvg.replace('viewBox="-50 -50 1100 500"', 'viewBox="-50 -50 1100 900"');
    desktopSvg = processPuzzle(desktopSvg, 'desktop', 400);
    content = content.replace(desktopMatch[0], desktopSvg);
    fs.writeFileSync(teamPath, content, 'utf8');
    console.log('Successfully expanded desktop SVG.');
} else {
    console.log('Failed to find desktop SVG again!');
}
