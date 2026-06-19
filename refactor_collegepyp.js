const fs = require('fs');

let content = fs.readFileSync('pages/collegepyp.html', 'utf8');

// 1. Inject Premium Accordion CSS
const cssToInject = `
        /* Premium Topper Accordion Styles */
        .year-block {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            margin-bottom: 2rem;
            overflow: hidden;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .year-header {
            padding: 1.5rem 2.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .year-header h2 {
            font-size: 1.8rem;
            color: #fff;
            margin: 0;
        }

        .year-header i {
            transition: transform 0.3s ease;
            font-size: 1.5rem;
            color: var(--accent-primary);
        }

        .year-block.collapsed .year-content {
            display: none;
        }

        .year-block.collapsed .year-header {
            border-bottom: none;
        }

        .year-block.collapsed .year-header i {
            transform: rotate(-90deg);
        }

        .year-content {
            padding: 2.5rem;
        }
    </style>
`;
content = content.replace('</style>', cssToInject);

// 2. Remove the old year-tabs
content = content.replace(/<div class="year-tabs">[\s\S]*?<\/div>\s*(?=<!-- 1st Year Section -->)/i, '');

// 3. Replace the year-section wrappers with year-block wrappers
content = content.replace(/<div id="year1" class="year-section active">/i, 
`<div class="year-block collapsed">
    <div class="year-header" onclick="toggleYear(this)">
        <h2>1st Year Archive</h2>
        <i class="fas fa-chevron-down"></i>
    </div>
    <div class="year-content">`);

content = content.replace(/<div id="year2" class="year-section">/i, 
`<div class="year-block collapsed">
    <div class="year-header" onclick="toggleYear(this)">
        <h2>2nd Year Archive</h2>
        <i class="fas fa-chevron-down"></i>
    </div>
    <div class="year-content">`);

content = content.replace(/<div id="year3" class="year-section">/i, 
`<div class="year-block collapsed">
    <div class="year-header" onclick="toggleYear(this)">
        <h2>3rd Year Archive</h2>
        <i class="fas fa-chevron-down"></i>
    </div>
    <div class="year-content">`);

content = content.replace(/<div id="year4" class="year-section">/i, 
`<div class="year-block collapsed">
    <div class="year-header" onclick="toggleYear(this)">
        <h2>Final Year Archive</h2>
        <i class="fas fa-chevron-down"></i>
    </div>
    <div class="year-content">`);

// Close the newly added year-content div (the year-section's </div> will close the year-block)
// We need to insert a </div> before the closing of the year-section. Wait, the year-section </div> closes the year-section. If I replace <div id="year1"...> with TWO opening divs, I need to add one closing div.
content = content.replace(/<\/div>\s*<!-- 2nd Year Section -->/i, '    </div>\n</div>\n                <!-- 2nd Year Section -->');
content = content.replace(/<\/div>\s*<!-- 3rd & 4th year sections -->/i, '    </div>\n</div>\n                <!-- 3rd & 4th year sections -->');
content = content.replace(/<\/div>\s*<!-- 4th year section -->/i, '    </div>\n</div>\n                <!-- 4th year section -->'); // if exists
content = content.replace(/<\/div>\s*<section class="deep-content-section/i, '    </div>\n</div>\n            <section class="deep-content-section');

// Wait, the 3rd year and 4th year are right next to each other.
content = content.replace(/<\/div>\s*<div id="year4" class="year-block collapsed">/i, '    </div>\n</div>\n                <div id="year4" class="year-block collapsed">');

// Clean up old script references and add the new one
content = content.replace(/function initTabs\(\) \{[\s\S]*?initTabs\(\);/i, 
`function toggleYear(headerElement) {
            const block = headerElement.parentElement;
            block.classList.toggle('collapsed');
        }`);

fs.writeFileSync('pages/collegepyp.html', content);
console.log('Successfully refactored collegepyp.html to use Accordions.');
