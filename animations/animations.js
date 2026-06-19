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

    // Saku Monsters Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const floatItems = document.querySelectorAll('.saku-float-item');
        
        floatItems.forEach((item, index) => {
            // Alternate speeds based on index
            const speed = (index % 2 === 0) ? 0.3 : 0.15;
            // Apply a subtle Y translation on top of the CSS animation by setting a CSS variable or direct transform.
            // Since they already have CSS keyframe animations, modifying transform directly might conflict.
            // Instead, we can adjust margin-top to achieve parallax without breaking the bobbing transform.
            item.style.marginTop = `${scrolled * speed}px`;
        });
    });
});
