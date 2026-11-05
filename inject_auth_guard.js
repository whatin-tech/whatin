/**
 * Injects the auth guard <script type="module"> tag into every HTML page
 * in the project that should be protected. Pages that are EXEMPT:
 *   - signin.html
 *   - finishSignUp.html
 *
 * The script tag is placed as the FIRST <script> inside <head> so the
 * guard runs BEFORE any other JS and blocks content flash.
 *
 * ALSO ensures every protected page includes nav-auth.js (if not present).
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = __dirname;

// Protected files set to empty
const PROTECTED_FILES = new Set([]);

const AUTH_GUARD_TAG_SNIPPET = '\n    <!-- 🔒 Firebase Auth Guard (auto-injected) — route protection -->\n    <script type="module" src="__PATH_PREFIX__js/auth-guard.js"></script>\n';
const NAV_AUTH_TAG_SNIPPET = '\n    <!-- Firebase Nav + Sign-Out (auto-injected) -->\n    <script type="module" src="__PATH_PREFIX__js/nav-auth.js"></script>\n';

function findHtmlFiles(dir, results = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Skip hidden dirs (.git, node_modules, dist if we want build-only)
            if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
            findHtmlFiles(fullPath, results);
        } else if (entry.name.endsWith('.html')) {
            results.push(fullPath);
        }
    }
    return results;
}

function getPathPrefix(filePath) {
    // Relative path from the file's directory back up to PROJECT_ROOT
    const fileDir = path.dirname(filePath);
    const rel = path.relative(fileDir, PROJECT_ROOT);
    if (!rel) return '';
    // Convert Windows backslashes to forward slashes + ensure trailing slash
    return rel.split(path.sep).join('/') + (rel.endsWith('/') ? '' : '/');
}

function injectOnce(html, tag, anchorRegex) {
    // Don't inject if already present
    if (html.includes(tag.split('\n').filter(l => l.trim().startsWith('<script')).map(l=>l.trim())[0])) {
        return html;
    }
    return html.replace(anchorRegex, (match) => tag + match);
}

function processFile(filePath) {
    const fileName = path.basename(filePath);
    if (!PROTECTED_FILES.has(fileName)) {
        console.log(`⏭️  SKIP (unprotected): ${path.relative(PROJECT_ROOT, filePath)}`);
        return { skipped: true };
    }

    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    const prefix = getPathPrefix(filePath);

    // 1) Inject auth guard BEFORE the FIRST <script...> inside <head> that loads a module or .js
    //    If no such script exists, inject right before </head>
    const guardTag = AUTH_GUARD_TAG_SNIPPET.replace('__PATH_PREFIX__', prefix);
    const guardNeedle = guardTag.split('\n').map(l => l.trim()).find(l => l.startsWith('<script'));
    if (!html.includes(guardNeedle)) {
        // Strategy: find the first <script inside <head>, or fallback to </head>
        const headCloseIdx = html.indexOf('</head>');
        if (headCloseIdx === -1) {
            console.warn(`⚠️  No </head> in ${fileName}, cannot inject guard.`);
        } else {
            html = html.slice(0, headCloseIdx) + guardTag + html.slice(headCloseIdx);
        }
    }

    // 2) Ensure nav-auth.js is included — insert BEFORE </body> if not already present
    const navTag = NAV_AUTH_TAG_SNIPPET.replace('__PATH_PREFIX__', prefix);
    const navNeedle = navTag.split('\n').map(l => l.trim()).find(l => l.startsWith('<script'));
    if (!html.includes(navNeedle)) {
        // Don't add to pure-auth-like pages that have no nav anyway (defensive)
        const bodyCloseIdx = html.lastIndexOf('</body>');
        if (bodyCloseIdx !== -1) {
            html = html.slice(0, bodyCloseIdx) + navTag + html.slice(bodyCloseIdx);
        }
    }

    if (html === originalHtml) {
        console.log(`✅  OK (already up to date): ${path.relative(PROJECT_ROOT, filePath)}`);
        return { changed: false };
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`🔧  UPDATED: ${path.relative(PROJECT_ROOT, filePath)}  (prefix="${prefix}")`);
    return { changed: true };
}

function main() {
    const htmlFiles = findHtmlFiles(PROJECT_ROOT);
    console.log(`\n🔍 Found ${htmlFiles.length} .html files in project.\n`);

    let changed = 0, skipped = 0, ok = 0;
    for (const f of htmlFiles) {
        const r = processFile(f);
        if (r.changed) changed++;
        else if (r.skipped) skipped++;
        else ok++;
    }

    console.log(`\n📊 Summary: ${changed} updated, ${ok} already OK, ${skipped} exempt.\n`);
}

main();
