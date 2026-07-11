const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('index.html', 'utf8');

const htmlOld = `<section id="home" class="hero-section">
            <div class="container">
                <h1 class="hero-title pop-left">Nexus of <span class="gradient-text">Academic</span> & <br>Technical
                    Excellence
                </h1>
                <p class="hero-subtitle pop-in" style="animation-delay: 0.2s">The WHATIN Ecosystem provides a
                    high-performance environment for students and
                    developers to research, build, and succeed with curated, verified, and high-quality educational
                    resources.</p>

                <div id="react-hero-widget"></div>
                
                
                <div class="hero-cta pop-scale cin-container" style="animation-delay: 0.4s">
                    <a href="#projects" class="btn btn-primary btn-ripple shimmer">Explore Resources</a>
                    <a href="pages/about.html" class="btn btn-secondary btn-ripple">Learn Our Story</a>
                </div>
                <div class="hero-image-container" style="display: flex; justify-content: center; margin-top: 4rem; width: 100%;">
                    <img src="images/hero-new.png" alt="Meditate" class="float-animate" style="max-width: 60%; height: auto; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3)); border-radius: 20px;">
                </div>
            </div>
        </section>`;

const htmlNew = `<section id="home" class="hero-section hero-split-layout">
            <div class="container hero-grid">
                <div class="hero-text-content">
                    <span class="hero-overline pop-left">Premium Technology</span>
                    <h1 class="hero-title pop-left" style="animation-delay: 0.1s">Nexus of <span class="gradient-text-teal">Academic</span> & <br>Technical Excellence
                    </h1>
                    <p class="hero-subtitle pop-in" style="animation-delay: 0.2s">The WHATIN Ecosystem provides a high-performance environment for students and developers to research, build, and succeed with curated, verified, and high-quality educational resources.</p>

                    <div id="react-hero-widget"></div>
                    
                    <div class="hero-cta pop-scale cin-container" style="animation-delay: 0.4s">
                        <a href="#projects" class="btn btn-gradient-teal btn-ripple shimmer">Explore Resources</a>
                        <a href="pages/about.html" class="btn btn-gradient-blue btn-ripple">Learn Our Story</a>
                    </div>
                    
                    <div class="hero-carousel-dots pop-scale" style="animation-delay: 0.5s">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
                
                <div class="hero-image-content pop-scale" style="animation-delay: 0.3s">
                    <img src="images/whatin_3d_emblem.png" alt="WHATIN 3D Emblem" class="float-animate-slow glowing-emblem">
                </div>
            </div>
        </section>`;

if (html.includes(htmlOld)) {
    html = html.replace(htmlOld, htmlNew);
    fs.writeFileSync('index.html', html);
    console.log('HTML updated.');
} else {
    console.log('Could not find the exact HTML block to replace.');
}

// 2. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');

const newStyles = `
/* --- Premium 3D Hero Redesign --- */
.hero-split-layout {
    padding-top: 180px;
    padding-bottom: 80px;
    position: relative;
    z-index: 2;
}

.hero-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
    gap: 4rem;
}

.hero-text-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
}

.hero-overline {
    font-size: 1.1rem;
    font-weight: 600;
    color: #a0a5b0;
    letter-spacing: 1.5px;
    margin-bottom: 1.5rem;
    display: inline-block;
    text-transform: uppercase;
}

.hero-text-content .hero-title {
    font-size: 4.5rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    text-align: left;
    margin-left: 0;
}

.gradient-text-teal {
    background: linear-gradient(135deg, #4ade80, #2dd4bf);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.hero-text-content .hero-subtitle {
    text-align: left;
    margin: 0 0 2.5rem 0;
    font-size: 1.15rem;
    color: #9ca3af;
    max-width: 600px;
    line-height: 1.7;
}

.hero-cta {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-start;
    margin-bottom: 4rem;
}

.btn-gradient-teal {
    background: linear-gradient(135deg, #2dd4bf, #14b8a6) !important;
    color: #fff !important;
    border: none !important;
    box-shadow: 0 10px 20px rgba(45, 212, 191, 0.3) !important;
    padding: 1rem 2.5rem;
    font-weight: 600;
    font-size: 1.1rem;
}
.btn-gradient-teal:hover {
    box-shadow: 0 15px 30px rgba(45, 212, 191, 0.5) !important;
    transform: translateY(-2px);
}

.btn-gradient-blue {
    background: linear-gradient(135deg, #60a5fa, #3b82f6) !important;
    color: #fff !important;
    border: none !important;
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3) !important;
    padding: 1rem 2.5rem;
    font-weight: 600;
    font-size: 1.1rem;
}
.btn-gradient-blue:hover {
    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.5) !important;
    transform: translateY(-2px);
}

.hero-carousel-dots {
    display: flex;
    gap: 10px;
}
.hero-carousel-dots .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
}
.hero-carousel-dots .dot:hover {
    background: rgba(255, 255, 255, 0.5);
}
.hero-carousel-dots .dot.active {
    background: #3b82f6;
    width: 28px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.hero-image-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.glowing-emblem {
    width: 100%;
    max-width: 500px;
    height: auto;
    filter: drop-shadow(0 0 50px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 100px rgba(45, 212, 191, 0.2));
    animation: emblemPulse 4s ease-in-out infinite alternate, floatSlow 8s ease-in-out infinite;
}

@keyframes emblemPulse {
    0% { filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 60px rgba(45, 212, 191, 0.1)); }
    100% { filter: drop-shadow(0 0 60px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 120px rgba(45, 212, 191, 0.4)); }
}

@keyframes floatSlow {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-25px) rotate(2deg); }
}

@media (max-width: 1024px) {
    .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
    }
    .hero-text-content {
        align-items: center;
        text-align: center;
    }
    .hero-text-content .hero-title, .hero-text-content .hero-subtitle {
        text-align: center;
    }
    .hero-cta {
        justify-content: center;
        margin-bottom: 2rem;
    }
    .hero-carousel-dots {
        justify-content: center;
        margin-bottom: 2rem;
    }
    .hero-split-layout {
        padding-top: 150px;
    }
}
@media (max-width: 768px) {
    .hero-text-content .hero-title {
        font-size: 2.8rem;
    }
    .hero-cta {
        flex-direction: column;
        width: 100%;
        max-width: 300px;
    }
    .hero-cta .btn {
        width: 100%;
        margin-bottom: 0.5rem;
    }
}
`;

if (!css.includes('/* --- Premium 3D Hero Redesign --- */')) {
    css += newStyles;
    fs.writeFileSync('css/style.css', css);
    console.log('CSS updated.');
}
