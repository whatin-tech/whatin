const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const dotsOld = `<div class="hero-carousel-dots pop-scale" style="animation-delay: 0.5s">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>`;

const dotsNew = `<div class="hero-carousel-dots pop-scale" style="animation-delay: 0.5s" id="hero-carousel-dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                    </div>`;

if (html.includes(dotsOld)) {
    html = html.replace(dotsOld, dotsNew);
} else {
    console.log("Could not find exact dots block. Proceeding anyway or already updated.");
}

const imgOld = `<img src="images/user_w_logo.png" alt="WHATIN Emblem" class="float-animate-slow glowing-emblem">`;
const imgNew = `<img src="images/user_w_logo.png" alt="WHATIN Emblem" class="float-animate-slow glowing-emblem" id="hero-carousel-image">`;

if (html.includes(imgOld)) {
    html = html.replace(imgOld, imgNew);
}

fs.writeFileSync('index.html', html);
console.log('HTML updated.');

// 2. Update js/script.js
let js = fs.readFileSync('js/script.js', 'utf8');

const carouselLogic = `
/* --- Hero Image Carousel --- */
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
});
`;

if (!js.includes('/* --- Hero Image Carousel --- */')) {
    js += '\n' + carouselLogic;
    fs.writeFileSync('js/script.js', js);
    console.log('JS updated.');
} else {
    console.log('JS already has carousel logic.');
}
