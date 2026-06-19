const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// The block to comment out starts with:
// <section class="visionaries-section" style="padding: 8rem 0; background: rgba(255,195,0,0.02);">
// And ends at the closing </section> right before:
// <div style="width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;">

// We'll use a regex that captures everything from that <section> to the </section> just before that div.
const startStr = '<section class="visionaries-section" style="padding: 8rem 0; background: rgba(255,195,0,0.02);">';
const endStrIndex = content.indexOf('<section id="faq"');

if (endStrIndex !== -1) {
    const startIndex = content.indexOf(startStr);
    if (startIndex !== -1) {
        // Find the last </section> before the FAQ section
        const textBeforeFAQ = content.substring(0, endStrIndex);
        const lastSectionEnd = textBeforeFAQ.lastIndexOf('</section>');
        
        if (lastSectionEnd > startIndex) {
            const blockToComment = content.substring(startIndex, lastSectionEnd + '</section>'.length);
            
            // Replace the block with a commented version
            content = content.substring(0, startIndex) +
                      '\n<!-- Visionaries Section Commented Out\n' +
                      blockToComment +
                      '\n-->\n' +
                      content.substring(lastSectionEnd + '</section>'.length);
                      
            fs.writeFileSync('index.html', content);
            console.log("Successfully commented out the Visionaries section.");
        }
    }
}
