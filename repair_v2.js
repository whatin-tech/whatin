const fs = require('fs');
const path = require('path');

const adminPath = path.join('e:\\origin of whatin\\whatin', 'pages', 'admin.html');
let lines = fs.readFileSync(adminPath, 'utf8').split('\n');

// Find the line that says "<!-- Choice Screen -->"
let startIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<!-- Choice Screen -->')) {
        startIndex = i;
        break;
    }
}

// Find the line that says '<div class="stats-badge"'
let endIndex = -1;
for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes('<div class="stats-badge"')) {
        endIndex = i;
        break;
    }
}

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `            <!-- Choice Screen -->
            <div id="adminChoice" class="admin-header"
                style="flex-direction: column; gap: 4rem; text-align: center; display: block; padding-top: 4rem;">
                <h1 class="hero-title">Welcome, <span class="gradient-text">Admin</span></h1>
                <p class="hero-subtitle">Choose which ecosystem you want to manage today.</p>
                <div
                    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 3rem;">
                    <div id="btnAktu" class="rev-card choice-card" onclick="switchSection('aktu')"
                        style="cursor: pointer; background: rgba(56, 189, 248, 0.05); transition: 0.3s; padding: 3rem; border-radius: 30px; border: 1px solid var(--glass-border);">
                        <i class="fas fa-book-reader"
                            style="font-size: 3rem; color: var(--accent-primary); margin-bottom: 1.5rem;"></i>
                        <h3>AKTU Padhai</h3>
                        <p>Manage semester notes and AKTU global PYPs.</p>
                    </div>
                    <div id="btnCollege" class="rev-card choice-card" onclick="switchSection('college')"
                        style="cursor: pointer; background: rgba(99, 102, 241, 0.05); transition: 0.3s; padding: 3rem; border-radius: 30px; border: 1px solid var(--glass-border);">
                        <i class="fas fa-university"
                            style="font-size: 3rem; color: var(--accent-secondary); margin-bottom: 1.5rem;"></i>
                        <h3>College GL Bajaj</h3>
                        <p>Manage internal papers (ST-1, ST-2, PUT) and branch-specific resources.</p>
                    </div>
                    <div id="btnBsa" class="rev-card choice-card" onclick="switchSection('bsa')"
                        style="cursor: pointer; background: rgba(52, 211, 153, 0.05); transition: 0.3s; padding: 3rem; border-radius: 30px; border: 1px solid var(--glass-border);">
                        <i class="fas fa-school"
                            style="font-size: 3rem; color: #34d399; margin-bottom: 1.5rem;"></i>
                        <h3>BSA College</h3>
                        <p>Manage BSA PYPs (STs, PUT, UT).</p>
                    </div>
                </div>
            </div>

            <!-- AKTU Manager Section (Initially Hidden) -->
            <div id="aktuManager" style="display: none;">
                <div class="admin-header">
                    <h1 class="hero-title" style="text-align: left; font-size: 2.5rem; margin-bottom: 0;"><i
                            class="fas fa-arrow-left" onclick="showChoice()"
                            style="cursor: pointer; font-size: 1.5rem; margin-right: 1rem; opacity: 0.5;"></i> AKTU
                        <span class="gradient-text">Padhai</span>
                    </h1>`;

    // Splice the array: remove from startIndex up to (endIndex - 1) and insert replacement
    // EndIndex line is '<div class="stats-badge"', we want to keep that line and everything after it.
    lines.splice(startIndex, endIndex - startIndex, replacement);
    
    fs.writeFileSync(adminPath, lines.join('\n'), 'utf8');
    console.log('Fixed admin.html reliably via index splicing');
} else {
    console.log('Could not find markers');
}
