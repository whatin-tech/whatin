const fs = require('fs');
const path = require('path');

function removeAdsFromHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove all Ad-related Scripts and Link blocks
    // Google AdSense
    content = content.replace(/<!-- Google AdSense Verification -->[\s\S]*?<meta name="google-adsense-account"[^>]*>/gi, '');
    content = content.replace(/<meta name="google-adsense-account"[^>]*>/gi, '');
    content = content.replace(/<!-- Google AdSense -->[\s\S]*?(?:<\/script>\s*-->|<\/script>)/gi, '');
    content = content.replace(/<script async src="https:\/\/pagead2\.googlesyndication\.com[\s\S]*?<\/script>/gi, '');
    content = content.replace(/<ins class="adsbygoogle"[\s\S]*?<\/ins>/gi, '');
    content = content.replace(/<!--\s*<ins class="adsbygoogle"[\s\S]*?<\/ins>\s*-->/gi, '');
    
    // Other Ad Networks
    content = content.replace(/<script\b[^>]*src="[^"]*(highperformanceformat|profitablecpmratenetwork|invoke\.js|monetag|adsterra)[^>]*><\/script>/gi, '');
    content = content.replace(/<script[^>]*>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>/gi, '');
    content = content.replace(/<meta name="popunder"[^>]*>/gi, '');
    
    // 2. Clean Ad Wrappers (from all files)
    content = content.replace(/<div class="ad-leaderboard">[\s\S]*?<\/div>/gi, '');
    content = content.replace(/<div class="ad-floating">[\s\S]*?<\/div>/gi, '');
    content = content.replace(/<div id="container-[a-z0-9]+"><\/div>/gi, '');
    content = content.replace(/<div[^>]*>\s*<span[^>]*>\s*(IN-FEED RECOMMENDATION AD|Promoted|Native Banner)[^<]*<\/span>[\s\S]*?<\/div>/gi, '');
    
    // Clean empty center wrapper divs that were used for ads
    content = content.replace(/<div style="width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;">\s*(?:<!--[^>]*-->\s*)*<\/div>/gi, '');
    content = content.replace(/<div style="margin: 1rem auto; text-align: center;">\s*(?:<!--[^>]*-->\s*)*<\/div>/gi, '');
    content = content.replace(/<!-- Top Ad Placeholder -->/gi, '');
    content = content.replace(/<!-- Inline Banner Above CTA for High CTR -->/gi, '');

    fs.writeFileSync(filePath, content);
}

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== 'images') {
                processDirectory(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            removeAdsFromHtml(fullPath);
            console.log(`Cleaned ads from: ${fullPath}`);
        }
    }
}

// 1. Clean all HTML files
processDirectory('.');

// 2. Add hero image to index.html
let indexContent = fs.readFileSync('index.html', 'utf8');

// Insert the new image below the CTA buttons if it's not already there
if (!indexContent.includes('images/hero-new.png')) {
    const ctaMatch = /<div class="hero-cta pop-scale cin-container"[^>]*>[\s\S]*?<\/div>/;
    indexContent = indexContent.replace(ctaMatch, `$&
                <div class="hero-image-container" style="display: flex; justify-content: center; margin-top: 4rem; width: 100%;">
                    <img src="images/hero-new.png" alt="Meditate" class="float-animate" style="max-width: 60%; height: auto; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3)); border-radius: 20px;">
                </div>`);
    fs.writeFileSync('index.html', indexContent);
    console.log("Injected hero-new.png into index.html");
}

console.log("All done!");
