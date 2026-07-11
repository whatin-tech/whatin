const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');

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
