const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const headerOld = `header {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%; max-width: 1200px;
    z-index: 1000;
    background: #1f1f1f57;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid #333;
    border-radius: 50px;
    padding: 0.75rem 1.5rem;
    transition: border-radius 0.3s ease;
}`;

const headerNew = `header {
    position: fixed;
    top: 20px;
    left: 0;
    width: 100%;
    z-index: 1000;
    pointer-events: none; /* Allows clicking through the empty space */
}`;

const hcOld = `.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}`;

const hcNew = `.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px; /* Distance from screen edge for Logo & Nav */
    pointer-events: auto; /* Restores clicking on Logo & Nav */
}`;

if (css.includes(headerOld) && css.includes(hcOld)) {
    css = css.replace(headerOld, headerNew);
    css = css.replace(hcOld, hcNew);
} else {
    console.log("Could not find exact old blocks. Proceeding anyway.");
}

// Add the new Pill styling for Nav and Mobile fixes
const newStyles = `

/* --- New Responsive Nav Pill Styles --- */
@media (min-width: 769px) {
    nav#nav-menu {
        background: #1f1f1f57;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid #333;
        border-radius: 50px;
        padding: 0.7rem 1.5rem;
        
        /* Enable scrolling if screen is too small */
        overflow-x: auto;
        overflow-y: hidden;
        -ms-overflow-style: none;
        scrollbar-width: none;
        max-width: calc(100vw - 250px);
    }
    nav#nav-menu::-webkit-scrollbar {
        display: none;
    }
    nav#nav-menu ul {
        flex-wrap: nowrap;
        white-space: nowrap;
        padding-right: 15px; /* Ensures last item isn't clipped by pill boundary */
    }
}

/* --- Mobile Pill for Hamburger --- */
@media (max-width: 768px) {
    .header-content {
        padding: 0 20px !important; /* Mobile edge padding */
    }
    .mobile-menu-btn {
        background: #1f1f1f57;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid #333;
        padding: 0.5rem 1rem;
        border-radius: 12px;
        pointer-events: auto;
    }
}
`;

if (!css.includes('/* --- New Responsive Nav Pill Styles --- */')) {
    css += newStyles;
}

fs.writeFileSync('css/style.css', css);
console.log('CSS transformed successfully!');
