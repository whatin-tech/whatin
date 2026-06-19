const fs = require('fs');
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

let content = fs.readFileSync('index.html', 'utf8');

// 1. Inject or update Meta Tags & JSON-LD
content = content.replace(/<meta name="description"[^>]*>/i, '');
content = content.replace(/<meta name="keywords"[^>]*>/i, '');
content = content.replace(/<meta name="author"[^>]*>/i, '');

if (!content.includes('<!-- Comprehensive SEO Tags -->')) {
    content = content.replace('</head>', seoMetaTags + '\n</head>');
}

// 2. Add Admin to Navbar if not already there
if (!content.includes('Admin</a>')) {
    const contributorsLinkRegex = /<li><a href="[^"]*contributors\.html"[^>]*>Contributors<\/a><\/li>/i;
    content = content.replace(contributorsLinkRegex, `<li><a href="pages/admin.html">Admin</a></li>\n                    $&`);
}

// 3. Add Nav-auth
if (!content.includes('src="js/nav-auth.js"')) {
    content = content.replace('</body>', '<script type="module" src="js/nav-auth.js"></script>\n</body>');
}

// 4. Center Dushyant Saini
content = content.replace(
    /<div class="vision-grid"\s*style="[^"]*">/g, 
    '<div class="vision-grid" style="display: flex; justify-content: center; margin-top: 5rem;">'
);
content = content.replace(
    /<div class="vision-card clay-card bg-blue pop-scale"\s*style="[^"]*">/g,
    '<div class="vision-card clay-card bg-blue pop-scale" style="padding: 4rem 2.5rem; text-align: center; position: relative; overflow: hidden; max-width: 600px; width: 100%;">'
);
content = content.replace(/<\/div>\s*\/div>\s*<\/div>\s*<\/section>/, '</div>\n</div>\n</section>');

// 5. Remove hero-1.png, center hero-2.png, add animation
content = content.replace(
    /<div class="hero-images-container"[^>]*>[\s\S]*?<\/div>/i,
    `<div class="hero-images-container" style="position: relative; width: 100%; display: flex; justify-content: center; margin-top: 2rem; align-items: center; min-height: 350px;">
        <img src="images/hero-2.png" alt="Student Community" class="float-animate" style="max-width: 60%; height: auto; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5)); border-radius: 20px;">
    </div>`
);

fs.writeFileSync('index.html', content);
