const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Fonts and Roots
css = css.replace(/@import url[^;]+;/, "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&family=Poppins:wght@400;600;800&display=swap');");

const newRoot = `:root.light-mode {
    --bg-primary: #000000;
    --bg-secondary: #0a0a0a;
    --accent-primary: #ffffff;
    --accent-secondary: #a1a1aa;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --glass-bg: rgba(31, 31, 31, 0.62);
    --glass-border: rgba(255, 255, 255, 0.1);
    --card-hover-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    --accent-gradient: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
    --surface-light: #111111;
}

:root {
    --bg-primary: #000000;
    --bg-secondary: #0a0a0a;
    --accent-primary: #ffffff;
    --accent-secondary: #a1a1aa;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --glass-bg: rgba(31, 31, 31, 0.62);
    --glass-border: rgba(255, 255, 255, 0.1);
    --card-hover-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    --accent-gradient: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
    --surface-light: #111111;
}`;

css = css.replace(/:root\.light-mode\s*\{[^}]+\}\s*:root\s*\{[^}]+\}/, newRoot);

// 2. Body background image
css = css.replace(/background-image:\s*url\([^)]+\);/, 'background-image: radial-gradient(circle at center, rgba(31,31,31,0.5) 0%, transparent 100%);');

// 3. Headings font
css = css.replace(/font-family:\s*'Fredoka One',\s*cursive;/g, "font-family: 'Inter', sans-serif;");
css = css.replace(/letter-spacing:\s*1px;/g, "letter-spacing: -1px;");

// 4. Header
css = css.replace(/header\s*\{[^}]+\}/, `header {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    z-index: 1000;
    background: #1f1f1f57;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid #333;
    border-radius: 50px;
    padding: 0.75rem 1.5rem;
    transition: border-radius 0.3s ease;
}`);

// 5. Buttons
css = css.replace(/\.cta-btn-header\s*\{[^}]+\}/, `.cta-btn-header {
    background: rgba(31,31,31,0.62);
    color: #d1d5db !important;
    border: 1px solid #333;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}`);
css = css.replace(/\.cta-btn-header:hover\s*\{[^}]+\}/, `.cta-btn-header:hover {
    border-color: rgba(255, 255, 255, 0.5);
    color: #ffffff !important;
}`);

css = css.replace(/\.btn\s*\{[^}]+\}/, `.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}`);

css = css.replace(/\.btn-primary\s*\{[^}]+\}/, `.btn-primary {
    background: #ffffff;
    color: #000000;
}`);
css = css.replace(/\.btn-primary:hover\s*\{[^}]+\}/, `.btn-primary:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: scale(0.98);
}`);

css = css.replace(/\.btn-secondary\s*\{[^}]+\}/, `.btn-secondary {
    background: rgba(31,31,31,0.62);
    color: #d1d5db;
    border: 1px solid #333;
}`);
css = css.replace(/\.btn-secondary:hover\s*\{[^}]+\}/, `.btn-secondary:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.5);
}`);

// Replace all blue gradients and shadows to white/gray
css = css.replaceAll('rgba(56, 189, 248', 'rgba(255, 255, 255');
css = css.replaceAll('rgba(99, 102, 241', 'rgba(255, 255, 255');

fs.writeFileSync('css/style.css', css);
console.log('Applied script replacements');
