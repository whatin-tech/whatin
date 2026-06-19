const fs = require('fs');
const path = require('path');

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

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const isRoot = !filePath.replace(/\\/g, '/').includes('/pages/');
    const relativePrefix = isRoot ? 'pages/' : '';

    // 1. Inject or update Meta Tags & JSON-LD
    // Remove old meta tags to avoid duplication
    content = content.replace(/<meta name="description"[^>]*>/i, '');
    content = content.replace(/<meta name="keywords"[^>]*>/i, '');
    content = content.replace(/<meta name="author"[^>]*>/i, '');
    // Insert new block before </head>
    if (!content.includes('<!-- Comprehensive SEO Tags -->')) {
        content = content.replace('</head>', seoMetaTags + '\n</head>');
    }

    // 2. Add Admin to Navbar if not already there
    if (!content.includes('Admin</a>')) {
        // Find Contributors link and insert Admin right before it
        const contributorsLinkRegex = /<li><a href="[^"]*contributors\.html"[^>]*>Contributors<\/a><\/li>/i;
        content = content.replace(contributorsLinkRegex, `<li><a href="${relativePrefix}admin.html">Admin</a></li>\n                    $&`);
    }

    fs.writeFileSync(filePath, content);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                walkDir(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            processFile(fullPath);
            console.log('Processed SEO & Nav:', fullPath);
        }
    }
}

walkDir('.');
