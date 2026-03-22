// Intersection Observer for Animations
document.addEventListener("DOMContentLoaded", () => {
    const animationSelectors = [
        '.pop-in', '.pop-left', '.pop-right', 
        '.pop-scale', '.pop-flip', '.pop-word', '.pop-num'
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fired');
                // Optional: Stop observing after it fires once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    animationSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));
    });

    // Handle ripple effect on buttons
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('rpl');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});


// Global "Click Anywhere" Lightning Strike Logic
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("lightning-intro-wrapper");
    if(!wrapper) return;

    const flash = document.getElementById("flash-screen");
    const bolt = document.getElementById("lightning-bolt");
    const audio = document.getElementById("thunder-blast-audio");
    const h2Text = wrapper.querySelector('h2');

    document.body.style.overflow = "hidden"; // Prevent scrolling behind intro

    let isFired = false;

    // Single interaction anywhere on the page triggers it
    const igniteSystem = (e) => {
        if(isFired) return;
        isFired = true;

        // Remove listeners instantly 
        document.removeEventListener("pointerdown", igniteSystem);
        document.removeEventListener("keydown", igniteSystem);
        
        if(h2Text) h2Text.style.display = "none";
        
        // Creating a NEW audio object inside the user's click stack is the "Gold Standard" for mobile.
        const strikeSound = new Audio('thundersound.mp3');
        strikeSound.volume = 1.0;
        strikeSound.play().catch(err => console.error("SFX Error:", err));
        
        // Lightning Strike Visuals
        flash.classList.add("super-flash");
        bolt.classList.add("super-bolt");
        
        setTimeout(() => {
            const viewportWidth = window.innerWidth;
            const spreadX = viewportWidth > 600 ? 1200 : viewportWidth; 
            const halfX = spreadX / 2;
            
            const elementsToScatter = document.querySelectorAll('.pop-in, .pop-scale, .pop-left, h1, h2, .btn, .project-card, .guide-card, nav, .footer-content');
            
            elementsToScatter.forEach(el => {
                const randomX = (Math.random() * spreadX) - halfX; 
                const randomY = (Math.random() * 600) + 50; 
                const randomRot = (Math.random() * 720) - 360; 
                
                el.style.setProperty('--tx', randomX + 'px');
                el.style.setProperty('--ty', randomY + 'px');
                el.style.setProperty('--rot', randomRot + 'deg');
                
                el.classList.add('super-scatter');
            });
            
            // Turn black background transparent so we see the scattered elements clearly
            wrapper.style.background = "transparent";
            
            setTimeout(() => {
                 elementsToScatter.forEach(el => {
                     el.classList.remove('super-scatter');
                     void el.offsetWidth;
                 });
                 wrapper.remove();
                 document.body.style.overflow = ""; // restore scrolling!
                 window.dispatchEvent(new Event('scroll'));
            }, 2500);

        }, 100); 
    };

    // Attach listener to entire document so ANY interaction fires the effect perfectly
    document.addEventListener("pointerdown", igniteSystem);
    document.addEventListener("keydown", igniteSystem);
});
