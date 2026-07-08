const fs = require('fs');
const path = require('path');

// 1. Update team.html
let teamPath = path.join(__dirname, 'pages', 'team.html');
if (fs.existsSync(teamPath)) {
    let html = fs.readFileSync(teamPath, 'utf8');
    
    // Update Dushyant to CTA
    html = html.replace("role: 'FOUNDER, COO'", "role: 'FOUNDER, CTA'");
    
    // Update Neelesh to COO
    html = html.replace("role: 'Co - founder'", "role: 'COO'");
    
    // Remove the 3rd box (index 2 in membersData which is Chief Operations Officer (COO))
    // We will replace it with 'Join Us' at the end of the array, by just removing index 2 and adding a new item
    // Wait, the easiest way is to shift everything up by 1.
    // Replace index 2 with index 3, index 3 with index 4, etc.
    html = html.replace(/{ id: 'p2', name: 'Name TBA', role: 'Chief Operations Officer \(COO\)'/g, "{ id: 'p2', name: 'Name TBA', role: 'Chief Technology Officer (CTO)'");
    html = html.replace(/{ id: 'p3', name: 'Name TBA', role: 'Chief Technology Officer \(CTO\)'/g, "{ id: 'p3', name: 'Name TBA', role: 'Chief Content Officer (CCO)'");
    html = html.replace(/{ id: 'p4', name: 'Name TBA', role: 'Chief Content Officer \(CCO\)'/g, "{ id: 'p4', name: 'Name TBA', role: 'Chief Marketing & PR Officer (CMO)'");
    html = html.replace(/{ id: 'p5', name: 'Name TBA', role: 'Chief Marketing & PR Officer \(CMO\)'/g, "{ id: 'p5', name: 'Name TBA', role: 'Creative Director'");
    html = html.replace(/{ id: 'p6', name: 'Name TBA', role: 'Creative Director'/g, "{ id: 'p6', name: 'Name TBA', role: 'Campus Operations Director'");
    html = html.replace(/{ id: 'p7', name: 'Name TBA', role: 'Campus Operations Director'/g, "{ id: 'p7', name: 'Name TBA', role: 'GLA Head'");
    html = html.replace(/{ id: 'p8', name: 'Name TBA', role: 'GLA Head'/g, "{ id: 'p8', name: 'Name TBA', role: 'BSA Head'");
    html = html.replace(/{ id: 'p9', name: 'Name TBA', role: 'BSA Head'/g, "{ id: 'p9', name: 'Member 10', role: 'Join Us'");
    
    fs.writeFileSync(teamPath, html);
    console.log("Updated team.html");
}

// 2. Update contributors.html
let contribPath = path.join(__dirname, 'pages', 'contributors.html');
if (fs.existsSync(contribPath)) {
    let html = fs.readFileSync(contribPath, 'utf8');
    
    // Update Dushyant to CTA
    html = html.replace("FOUNDER, COO", "FOUNDER, CTA");
    
    // Remove the COO card
    // We can use regex to find the COO card and remove it.
    const cooCardRegex = /<!-- Chief Operations Officer \( COO \) -->[\s\S]*?<h4[^>]*>Chief Operations Officer \(COO\)<\/h4>[\s\S]*?<\/div>\s*<\/div>/;
    html = html.replace(cooCardRegex, '');
    
    fs.writeFileSync(contribPath, html);
    console.log("Updated contributors.html");
}
