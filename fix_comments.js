const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// The botched comment out looks like:
// <!-- Visionaries Section Commented Out
// <section class="visionaries-section" ...

const startIndex = content.indexOf('<!-- Visionaries Section Commented Out');

if (startIndex !== -1) {
    // The intended end of the block was the "-->" after "</section>" which was right before "<div style=\"width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;\">" or "<section id=\"faq\""
    const nextFaqIndex = content.indexOf('<section id="faq"', startIndex);
    
    if (nextFaqIndex !== -1) {
        // Look for the last "-->" before nextFaqIndex
        const textBeforeFaq = content.substring(startIndex, nextFaqIndex);
        const lastCommentClose = textBeforeFaq.lastIndexOf('-->');
        
        if (lastCommentClose !== -1) {
            const endIndex = startIndex + lastCommentClose + 3; // +3 for '-->'
            
            // Delete the entire block permanently to fix HTML parsing errors
            content = content.substring(0, startIndex) + content.substring(endIndex);
            
            // Fix the loose </div> on line 172
            content = content.replace(/<div class="container">\s*<!--\s*-->\s*<\/div>\s*<\/div>/gi, '<div class="container">\n            <!--  -->\n        </div>');
            
            fs.writeFileSync('index.html', content);
            console.log("Successfully removed the broken Visionaries section.");
        }
    }
}
