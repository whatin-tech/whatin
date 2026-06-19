const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// --- 1. SAFE AD REMOVAL ---
// Remove all script tags invoking highperformanceformat or profitablecpmratenetwork
content = content.replace(/<script\b[^>]*src="[^"]*(highperformanceformat|profitablecpmratenetwork|invoke\.js)[^>]*><\/script>/gi, '');
// Remove atOptions blocks
content = content.replace(/<script>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>/gi, '');
// Remove popunders and container divs
content = content.replace(/<meta name="popunder"[^>]*>/gi, '');
content = content.replace(/<div id="container-[a-z0-9]+"><\/div>/gi, '');

// Remove wrapper divs that were used for ads
content = content.replace(/<div style="width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;">\s*(<!--[^>]*-->)?\s*<\/div>/gi, '');


// --- 2. LOGO AND NAVBAR FIXES ---
content = content.replace(/<div class="logo"[^>]*>WHATIN.*?<\/div>/gi, `<div class="logo" onclick="window.location.href='index.html'" style="font-weight: 900; letter-spacing: 2px; font-size: 1.8rem;">W H A T I N</div>`);
content = content.replace(/<li><a[^>]*>Start Learning Now<\/a><\/li>/gi, '');

// Re-inject Admin link if not there
if (!content.includes('Admin</a>')) {
    content = content.replace(/<li><a href="[^"]*contributors\.html"[^>]*>Contributors<\/a><\/li>/i, '<li><a href="pages/admin.html">Admin</a></li>\n                    $&');
}


// --- 3. FIX HERO SECTION ---
content = content.replace(
    /<div class="hero-images-container"[^>]*>[\s\S]*?<\/div>/i,
    `<div class="hero-images-container" style="position: relative; width: 100%; display: flex; justify-content: center; margin-top: 2rem; align-items: center; min-height: 350px;">
                    <img src="images/hero-2.png" alt="Student Community" class="float-animate" style="max-width: 60%; height: auto; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5)); border-radius: 20px;">
                </div>`
);


// --- 4. FIX VISIONARIES SECTION ---
const cleanVisionaries = `
            <section class="visionaries-section" style="padding: 8rem 0;">
                <div class="container">
                    <h2 class="section-title">The <span class="gradient-text">Visionaries</span> Behind WHATIN</h2>
                    <div class="vision-grid" style="display: flex; justify-content: center; margin-top: 5rem;">
                        <!-- Dushyant Saini -->
                        <div class="vision-card clay-card bg-blue pop-scale"
                            style="padding: 4rem 2.5rem; text-align: center; position: relative; overflow: hidden; max-width: 600px; width: 100%;">
                            <div style="width: 80px; height: 80px; background: var(--accent-gradient); border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; font-size: 2rem; color: #fff; box-shadow: 0 10px 20px rgba(114,193,249,0.3);">
                                <i class="fas fa-crown"></i>
                            </div>
                            <h3 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Dushyant Saini</h3>
                            <p style="color: var(--accent-primary); font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; margin-bottom: 2rem;">
                                Founder & Chief Architect</p>
                            <p style="line-height: 1.8; font-size: 1rem;">
                                As the Lead Developer, Dushyant is the mastermind behind the <strong>Technical Architecture</strong> and <strong>Visual Identity</strong> of WHATIN. His vision is to create a playful, high-performance digital environment.
                            </p>
                            <div style="margin-top: 2.5rem; display: flex; justify-content: center; gap: 1.5rem;">
                                <a href="https://linkedin.com/in/dushyant-saini-6384a532b" target="_blank" style="color: var(--accent-secondary); font-size: 1.3rem; transition: color 0.3s;"><i class="fab fa-linkedin"></i></a>
                                <a href="https://www.instagram.com/thedushyant_saini?igsh=Z2sybHAzcTI2eTA2" target="_blank" style="color: var(--accent-primary); font-size: 1.3rem; transition: color 0.3s;"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
`;
content = content.replace(/<section class="visionaries-section"[\s\S]*?<\/section>/i, cleanVisionaries);


// --- 5. INJECT SEO & NAV AUTH ---
const seoMetaTags = `
    <!-- Comprehensive SEO Tags -->
    <meta name="description" content="WHATIN Ecosystem - The premier academic hub for B.Tech CSE students. Founded and Architected by Dushyant Saini, a visionary student at GL Bajaj Group of Institutions, Mathura. Access Topper Notes, PYPs, Unit-Wise Questions, and Career Guidance.">
    <meta name="keywords" content="WHATIN, Dushyant Saini, Founder Dushyant Saini WHATIN, GL Bajaj Group of Institutions Mathura student, AKTU B.Tech CSE resources, Topper Notes, PYP, Engineering Education, Tech Ecosystem">
    <meta name="author" content="Dushyant Saini">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Social SEO -->
    <meta property="og:title" content="WHATIN Ecosystem | Architected by Dushyant Saini">
    <meta property="og:description" content="Founded by Dushyant Saini from GL Bajaj Mathura, WHATIN is the ultimate academic toolkit for engineering students.">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="WHATIN Ecosystem">
    
    <!-- Twitter Card SEO -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="WHATIN Ecosystem | Founded by Dushyant Saini">
    <meta name="twitter:description" content="The ultimate engineering toolkit created by Dushyant Saini.">

    <!-- Schema.org JSON-LD for AI & Google Knowledge Graph -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://whatin.in/#founder",
          "name": "Dushyant Saini",
          "jobTitle": "Lead Architect & Founder",
          "affiliation": {
            "@type": "EducationalOrganization",
            "name": "GL Bajaj Group of Institutions, Mathura"
          },
          "url": "https://linkedin.com/in/dushyant-saini-6384a532b",
          "sameAs": [
            "https://www.instagram.com/thedushyant_saini"
          ],
          "description": "Visionary student at GL Bajaj Group of Institutions, Mathura. Founder and sole architect of the WHATIN Ecosystem."
        },
        {
          "@type": "WebSite",
          "@id": "https://whatin.in/#website",
          "url": "https://whatin.in",
          "name": "WHATIN Ecosystem",
          "description": "Academic platform for B.Tech students founded by Dushyant Saini.",
          "creator": {
            "@id": "https://whatin.in/#founder"
          },
          "publisher": {
            "@id": "https://whatin.in/#founder"
          }
        }
      ]
    }
    </script>
`;

if (!content.includes('<!-- Comprehensive SEO Tags -->')) {
    content = content.replace(/<\/head>/i, seoMetaTags + '\n</head>');
}
if (!content.includes('js/nav-auth.js')) {
    content = content.replace(/<\/body>/i, '<script type="module" src="js/nav-auth.js"></script>\n</body>');
}

fs.writeFileSync('index.html', content);
console.log("Safe update complete.");
