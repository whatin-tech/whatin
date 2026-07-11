const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('index.html', 'utf8');

const htmlOld = `<div class="hero-image-content pop-scale" style="animation-delay: 0.3s">
                    <img src="images/user_w_logo.png" alt="WHATIN Emblem" class="float-animate-slow glowing-emblem" id="hero-carousel-image">
                </div>`;

const htmlNew = `<div class="hero-image-content pop-scale" style="animation-delay: 0.3s" id="hero-carousel-container">
                    <div id="carousel-slide-0" class="carousel-slide active-slide">
                        <img src="images/user_w_logo.png" alt="WHATIN Emblem" class="float-animate-slow glowing-emblem">
                    </div>
                    <div id="carousel-slide-1" class="carousel-slide">
                        <div class="promo-box">
                            <div class="promo-badge">MEGA UPDATE!</div>
                            <h2 class="promo-title">ALL AFFIDAVITS</h2>
                            <h3 class="promo-subtitle-glow">NOW LIVE!</h3>
                            
                            <div class="promo-divider">
                                <span><i class="fas fa-angle-double-right"></i> WE HAVE EXPANDED!</span>
                                <span class="promo-divider-light">ALL ESSENTIAL COLLEGE AFFIDAVITS NOW AVAILABLE.</span>
                                <span><i class="fas fa-angle-double-left"></i></span>
                            </div>
                            
                            <div class="promo-grid">
                                <div class="promo-card">
                                    <i class="fas fa-shield-alt icon-gold"></i>
                                    <h4>ANTI-RAGGING</h4>
                                    <p>MANDATORY UGC COMPLIANCE</p>
                                </div>
                                <div class="promo-card">
                                    <i class="fas fa-history icon-gold"></i>
                                    <h4>GAP CERTIFICATE</h4>
                                    <p>FOR STUDY BREAK VALIDATION</p>
                                </div>
                                <div class="promo-card">
                                    <i class="fas fa-graduation-cap icon-gold"></i>
                                    <h4>SCHOLARSHIP AFFIDAVIT</h4>
                                    <p>GOVT. SCHEME INCOME DECLARATION</p>
                                </div>
                                <div class="promo-card">
                                    <i class="fas fa-user-edit icon-gold"></i>
                                    <h4>NAME CORRECTION</h4>
                                    <p>LEGAL FATHER/MOTHER NAME UPDATE</p>
                                </div>
                            </div>
                            
                            <a href="pages/affidavit.html" class="promo-cta-btn">
                                <i class="fas fa-angle-double-right"></i> APPLY NOW! <i class="fas fa-angle-double-left"></i>
                            </a>
                            
                            <div class="promo-trust-badges">
                                <span><i class="fas fa-check-circle text-green"></i> 100% RELIABLE</span>
                                <span><i class="fas fa-balance-scale text-green"></i> LEGALLY VALID</span>
                                <span><i class="fas fa-bolt text-green"></i> FAST DELIVERY</span>
                            </div>
                            
                            <div class="promo-footer">
                                <i class="fas fa-star text-gold"></i> YOUR TRUST. OUR PROMISE. <a href="https://wa.me/910000000000" target="_blank" class="text-green-glow">WHATSAPP US NOW!</a> <i class="fas fa-star text-gold"></i>
                            </div>
                        </div>
                    </div>
                </div>`;

if (html.includes(htmlOld)) {
    html = html.replace(htmlOld, htmlNew);
    fs.writeFileSync('index.html', html);
    console.log('HTML updated.');
} else {
    console.log('Could not find HTML block. Already updated?');
}

// 2. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');

const promoCSS = `
/* --- HTML Promo Box --- */
.hero-image-content {
    position: relative;
    width: 100%;
    height: 550px;
}
.carousel-slide {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s ease, visibility 0.6s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}
.carousel-slide.active-slide {
    opacity: 1;
    visibility: visible;
}

.promo-box {
    background: linear-gradient(145deg, #0a0a0a, #151515);
    border: 2px solid #b8860b;
    border-radius: 12px;
    padding: 1.5rem;
    width: 100%;
    max-width: 550px;
    text-align: center;
    box-shadow: 0 0 30px rgba(184, 134, 11, 0.2), inset 0 0 20px rgba(184, 134, 11, 0.1);
    position: relative;
    overflow: hidden;
}
.promo-box::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: linear-gradient(rgba(184, 134, 11, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(184, 134, 11, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    z-index: 1;
    pointer-events: none;
}
.promo-box > * { position: relative; z-index: 2; }

.promo-badge {
    background: #b8860b;
    color: #000;
    display: inline-block;
    padding: 0.2rem 1.2rem;
    font-weight: 800;
    font-style: italic;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    box-shadow: 0 0 10px #b8860b;
    transform: skewX(-10deg);
}
.promo-title {
    font-size: 3rem;
    color: #fff;
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 2px 2px 0px #555, 0 0 10px rgba(255,255,255,0.3);
    line-height: 1.1;
}
.promo-subtitle-glow {
    font-size: 3.2rem;
    font-weight: 900;
    color: #00ff7f;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    text-shadow: 0 0 10px #00ff7f, 0 0 20px rgba(0,255,127,0.5);
    line-height: 1;
}

.promo-divider {
    background: rgba(184, 134, 11, 0.1);
    border-top: 1px solid #b8860b;
    border-bottom: 1px solid #b8860b;
    padding: 0.4rem;
    font-weight: 700;
    color: #b8860b;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
}
.promo-divider-light { color: #fff; font-weight: 500; }

.promo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
}
.promo-card {
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(184, 134, 11, 0.4);
    border-radius: 8px;
    padding: 0.8rem;
    transition: all 0.3s ease;
}
.promo-card:hover {
    border-color: #b8860b;
    box-shadow: 0 0 15px rgba(184, 134, 11, 0.3);
    transform: translateY(-2px);
}
.promo-card .icon-gold {
    font-size: 1.8rem;
    color: #b8860b;
    margin-bottom: 0.4rem;
}
.promo-card h4 {
    color: #00ff7f;
    margin: 0 0 0.2rem 0;
    font-size: 0.9rem;
}
.promo-card p {
    color: #ccc;
    font-size: 0.65rem;
    margin: 0;
    text-transform: uppercase;
}

.promo-cta-btn {
    display: inline-block;
    background: linear-gradient(90deg, #b8860b, #ffd700);
    color: #000 !important;
    font-weight: 900;
    font-size: 1.3rem;
    padding: 0.6rem 2rem;
    border-radius: 6px;
    text-decoration: none;
    margin-bottom: 1rem;
    box-shadow: 0 0 20px rgba(184, 134, 11, 0.5);
    transition: transform 0.2s;
}
.promo-cta-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(184, 134, 11, 0.8);
}

.promo-trust-badges {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 0.6rem 0;
    margin-bottom: 0.8rem;
}
.promo-trust-badges span { color: #fff; font-size: 0.75rem; font-weight: 600; }
.text-green { color: #00ff7f; margin-right: 4px; }
.text-gold { color: #b8860b; margin: 0 4px; }
.text-green-glow { color: #00ff7f; font-weight: bold; text-decoration: none; text-shadow: 0 0 5px #00ff7f; }

.promo-footer { font-size: 0.8rem; color: #ccc; font-weight: 600; }

@media (max-width: 600px) {
    .promo-title { font-size: 2rem; }
    .promo-subtitle-glow { font-size: 2.2rem; }
    .promo-grid { grid-template-columns: 1fr; }
    .promo-trust-badges { flex-direction: column; gap: 0.4rem; }
    .hero-image-content { height: auto; min-height: 400px; display: block; }
    .carousel-slide { position: relative; top: 0; left: 0; transform: none; display: none; margin-bottom: 2rem; }
    .carousel-slide.active-slide { display: flex; }
}
`;

if (!css.includes('/* --- HTML Promo Box --- */')) {
    css += '\n' + promoCSS;
    fs.writeFileSync('css/style.css', css);
    console.log('CSS updated.');
} else {
    console.log('CSS already updated.');
}

// 3. Update JS
let js = fs.readFileSync('js/script.js', 'utf8');

const oldJsStart = `        function changeImage(index) {
            // Fade out
            heroImage.style.opacity = 0;
            heroImage.style.transition = "opacity 0.5s ease";`;

const oldJsEnd = `                // Fade in
                heroImage.style.opacity = 1;
            }, 500); // Wait for fade out to complete
        }`;

// Let's just rewrite the whole DOMContentLoaded block for the carousel to be clean.
const fullOldCarousel = `/* --- Hero Image Carousel --- */
document.addEventListener("DOMContentLoaded", () => {
    const heroImage = document.getElementById("hero-carousel-image");
    const dotsContainer = document.getElementById("hero-carousel-dots");
    
    if (heroImage && dotsContainer) {
        const images = [
            "images/user_w_logo.png",
            "images/hero-2.png"
        ];
        const dots = dotsContainer.querySelectorAll('.dot');
        let currentIndex = 0;
        
        function changeImage(index) {
            // Fade out
            heroImage.style.opacity = 0;
            heroImage.style.transition = "opacity 0.5s ease";
            
            setTimeout(() => {
                heroImage.src = images[index];
                currentIndex = index;
                
                // Update dots
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
                
                // Adjust scale for hero-2.png
                const imgContainer = document.querySelector('.hero-image-content');
                if (imgContainer) {
                    if (images[index].includes('hero-2.png')) {
                        imgContainer.classList.add('scale-hero-2');
                    } else {
                        imgContainer.classList.remove('scale-hero-2');
                    }
                }
                
                // Fade in
                heroImage.style.opacity = 1;
            }, 500); // Wait for fade out to complete
        }
        
        // Auto change every 30 seconds (30000 ms)
        setInterval(() => {
            let nextIndex = (currentIndex + 1) % images.length;
            changeImage(nextIndex);
        }, 30000);
        
        // Make dots clickable
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                changeImage(index);
            });
        });
    }
});`;

const newCarousel = `/* --- Hero Content Carousel --- */
document.addEventListener("DOMContentLoaded", () => {
    const dotsContainer = document.getElementById("hero-carousel-dots");
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (slides.length > 0 && dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        let currentIndex = 0;
        
        function changeSlide(index) {
            // Fade out all
            slides.forEach(slide => slide.classList.remove('active-slide'));
            
            // Fade in selected
            if (slides[index]) {
                slides[index].classList.add('active-slide');
            }
            currentIndex = index;
            
            // Update dots
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto change every 30 seconds (30000 ms)
        setInterval(() => {
            let nextIndex = (currentIndex + 1) % slides.length;
            changeSlide(nextIndex);
        }, 30000);
        
        // Make dots clickable
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                changeSlide(index);
            });
        });
    }
});`;

if (js.includes('/* --- Hero Image Carousel --- */')) {
    js = js.replace(fullOldCarousel, newCarousel);
    fs.writeFileSync('js/script.js', js);
    console.log('JS updated.');
} else {
    console.log('Could not find old JS block.');
}
