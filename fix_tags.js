const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Fix 1: Missing </div> before </section> in info-rich-section
content = content.replace(
    /<\/div>\s*<\/section>\s*<!-- FAQ Section/i,
    '</div>\n            </div>\n        </section>\n\n        <!-- FAQ Section'
);

// Fix 2: Missing <section> before "Why WHATIN?" and missing </div>
content = content.replace(
    /<div class="container">\s*<h2 class="section-title pop-in">Why WHATIN\?<\/h2>/i,
    '<section class="features-section">\n            <div class="container">\n            <h2 class="section-title pop-in">Why WHATIN?</h2>'
);
content = content.replace(
    /<\/div>\s*<\/section>\s*<section class="visionaries-section"/i,
    '</div>\n            </div>\n        </section>\n\n        <section class="visionaries-section"'
);

fs.writeFileSync('index.html', content);
