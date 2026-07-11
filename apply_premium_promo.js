const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
const cssFile = path.join(__dirname, 'css', 'style.css');

// --- UPDATE HTML ---
let htmlContent = fs.readFileSync(indexFile, 'utf8');

const htmlStartStr = '<div class="promo-box">';
const htmlEndStr = '</div>\n                    </div>\n                </div>';

const htmlStartIndex = htmlContent.indexOf(htmlStartStr);
const htmlEndIndex = htmlContent.indexOf(htmlEndStr, htmlStartIndex) + htmlEndStr.length;

if (htmlStartIndex === -1 || htmlEndIndex === -1) {
    console.error("Could not find HTML block in index.html");
} else {
    const newHtml = `<div class="promo-box-premium pop-scale">
                            <div class="promo-header">
                                <span class="premium-badge-cyan"><i class="fas fa-bolt"></i> MEGA UPDATE</span>
                                <h2 class="promo-title-white">ALL AFFIDAVITS <span class="text-cyan">LIVE</span></h2>
                                <p class="promo-desc">Essential college documents now available with 100% legal validity.</p>
                            </div>
                            
                            <div class="promo-grid-premium">
                                <!-- Card 1: Cyan -->
                                <div class="premium-card cyan-card">
                                    <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
                                    <div class="card-content">
                                        <span class="card-category"><i class="fas fa-circle"></i> ANTI-RAGGING</span>
                                        <h4>UGC Compliance</h4>
                                        <p>Mandatory for all students.</p>
                                    </div>
                                </div>
                                <!-- Card 2: Purple -->
                                <div class="premium-card purple-card">
                                    <div class="card-icon"><i class="fas fa-history"></i></div>
                                    <div class="card-content">
                                        <span class="card-category"><i class="fas fa-circle"></i> GAP CERTIFICATE</span>
                                        <h4>Study Break</h4>
                                        <p>Validates academic gaps.</p>
                                    </div>
                                </div>
                                <!-- Card 3: Blue -->
                                <div class="premium-card blue-card">
                                    <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
                                    <div class="card-content">
                                        <span class="card-category"><i class="fas fa-circle"></i> SCHOLARSHIP</span>
                                        <h4>Govt. Schemes</h4>
                                        <p>Income declaration proof.</p>
                                    </div>
                                </div>
                                <!-- Card 4: Pink -->
                                <div class="premium-card pink-card">
                                    <div class="card-icon"><i class="fas fa-user-edit"></i></div>
                                    <div class="card-content">
                                        <span class="card-category"><i class="fas fa-circle"></i> CORRECTION</span>
                                        <h4>Name Update</h4>
                                        <p>Legal father/mother name.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="promo-footer-premium">
                                <a href="pages/affidavit.html" class="premium-cta-btn">
                                    Apply Now <i class="fas fa-arrow-right"></i>
                                </a>
                                <div class="promo-trust-premium">
                                    <span><i class="fas fa-check-circle" style="color:#38bdf8"></i> 100% Reliable</span>
                                    <span><i class="fas fa-shield-alt" style="color:#c084fc"></i> Legally Valid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

    htmlContent = htmlContent.substring(0, htmlStartIndex) + newHtml + htmlContent.substring(htmlEndIndex);
    fs.writeFileSync(indexFile, htmlContent, 'utf8');
    console.log("Updated index.html HTML block.");
}

// --- UPDATE CSS ---
let cssContent = fs.readFileSync(cssFile, 'utf8');

const cssStartStr = '.promo-box {';
const cssEndStr = '/* Testimonials */';

const cssStartIndex = cssContent.indexOf(cssStartStr);
let cssEndIndex = cssContent.indexOf(cssEndStr, cssStartIndex);

if (cssStartIndex === -1 || cssEndIndex === -1) {
    console.error("Could not find CSS block in style.css");
} else {
    
    const newCss = `/* NEW PREMIUM PROMO BOX (Guidance Style, No Green/Yellow) */
.promo-box-premium {
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    padding: 2.5rem;
    width: 100%;
    max-width: 580px;
    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(255, 255, 255, 0.02);
    position: relative;
    overflow: hidden;
    text-align: left;
    margin: 0 auto;
}

.promo-header {
    text-align: center;
    margin-bottom: 2rem;
}

.premium-badge-cyan {
    background: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 0.4rem 1rem;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
}

.promo-title-white {
    font-size: 2.2rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
}
.text-cyan {
    color: #38bdf8;
    text-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
}

.promo-desc {
    color: #94a3b8;
    font-size: 0.95rem;
    max-width: 90%;
    margin: 0 auto;
}

.promo-grid-premium {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    margin-bottom: 2rem;
}

.premium-card {
    background: #000000;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 1.8rem 1.2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.premium-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.15);
}

.card-icon {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.premium-card:hover .card-icon {
    transform: scale(1.18) translateY(-3px);
}

.card-category {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
    margin-bottom: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}
.card-category i {
    font-size: 0.4rem;
}

.premium-card h4 {
    color: #f8fafc;
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    transition: color 0.3s;
}
.premium-card p {
    color: #94a3b8;
    font-size: 0.8rem;
    line-height: 1.5;
    margin: 0;
}

/* Specific Card Colors */
/* Card 1: Cyan */
.cyan-card:hover { box-shadow: 0 10px 30px rgba(56, 189, 248, 0.15); }
.cyan-card .card-icon { color: #38bdf8; filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.6)); }
.cyan-card .card-category { color: #38bdf8; }
.cyan-card:hover h4 { color: #38bdf8; }

/* Card 2: Purple */
.purple-card:hover { box-shadow: 0 10px 30px rgba(192, 132, 252, 0.15); }
.purple-card .card-icon { color: #c084fc; filter: drop-shadow(0 0 15px rgba(192, 132, 252, 0.6)); }
.purple-card .card-category { color: #c084fc; }
.purple-card:hover h4 { color: #c084fc; }

/* Card 3: Blue */
.blue-card:hover { box-shadow: 0 10px 30px rgba(96, 165, 250, 0.15); }
.blue-card .card-icon { color: #60a5fa; filter: drop-shadow(0 0 15px rgba(96, 165, 250, 0.6)); }
.blue-card .card-category { color: #60a5fa; }
.blue-card:hover h4 { color: #60a5fa; }

/* Card 4: Pink */
.pink-card:hover { box-shadow: 0 10px 30px rgba(244, 114, 182, 0.15); }
.pink-card .card-icon { color: #f472b6; filter: drop-shadow(0 0 15px rgba(244, 114, 182, 0.6)); }
.pink-card .card-category { color: #f472b6; }
.pink-card:hover h4 { color: #f472b6; }

.promo-footer-premium {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
}

.premium-cta-btn {
    background: #ffffff;
    color: #000000 !important;
    font-weight: 800;
    font-size: 1.1rem;
    padding: 0.8rem 2.5rem;
    border-radius: 100px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}
.premium-cta-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
    gap: 1.2rem;
}
.premium-cta-btn:active {
    transform: translateY(1px) scale(0.98);
}

.promo-trust-premium {
    display: flex;
    gap: 1.5rem;
    color: #cbd5e1;
    font-size: 0.85rem;
    font-weight: 600;
}
.promo-trust-premium span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

@media (max-width: 480px) {
    .promo-grid-premium {
        grid-template-columns: 1fr;
    }
    .promo-box-premium {
        padding: 1.5rem;
    }
    .promo-title-white {
        font-size: 1.8rem;
    }
}

`;

    cssContent = cssContent.substring(0, cssStartIndex) + newCss + cssContent.substring(cssEndIndex);
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log("Updated style.css");
}
