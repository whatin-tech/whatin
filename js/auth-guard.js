// ================================================================
// 🔒 AUTH GUARD — Top-level route protection for the entire site
// ================================================================
//
// Include this script AS EARLY AS POSSIBLE (preferably in <head>) on
// EVERY page of the app EXCEPT:
//   - /pages/signin.html       (user needs access while logged out)
//   - /pages/finishSignUp.html (Firebase link landing)
//
// Behavior:
//   1. Injects a glass-style loading overlay that covers the page
//      while onAuthStateChanged resolves — NO FLASH of real content.
//   2. If user is authenticated: overlay fades out, page is visible.
//   3. If user is NOT authenticated: stores current URL in
//      sessionStorage under "postLoginRedirect" and redirects to
//      /pages/signin.html — regardless of which URL was requested.
//   4. Also re-checks on every navigation (popstate / visibilitychange)
//      to catch back/forward, direct URL, and tab-swap scenarios.
// ================================================================

import { auth, onAuthStateChanged } from './firebase-config.js';

// ---------- Config ----------
const SIGN_IN_URL = (() => {
    // Figure out relative path to /pages/signin.html
    const path = window.location.pathname;
    if (path.startsWith('/pages/') || path.includes('/pages/')) {
        return 'signin.html';
    }
    return 'pages/signin.html';
})();

const STORAGE_KEY = 'postLoginRedirect';
let authResolved = false;
let overlayEl = null;

// ---------- Protected Pages ----------
const PROTECTED_PAGES = [];

function isProtectedPage() {
    const pathname = window.location.pathname;
    // Strip trailing slash for matching
    const clean = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const file = clean.split('/').pop() || 'index.html';
    return PROTECTED_PAGES.some(p => p.endsWith(file));
}

function isPublicPage() {
    return !isProtectedPage();
}

// ---------- Loading Overlay (glass style) ----------
function injectLoadingOverlay() {
    if (overlayEl || isPublicPage()) return;

    overlayEl = document.createElement('div');
    overlayEl.id = 'auth-guard-overlay';
    overlayEl.setAttribute('aria-hidden', 'true');

    // Inline styles so overlay works even if external CSS hasn't loaded.
    // We also inject a matching <style> block once so CSS isn't duplicated.
    if (!document.getElementById('auth-guard-styles')) {
        const style = document.createElement('style');
        style.id = 'auth-guard-styles';
        style.textContent = `
            #auth-guard-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.88);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                opacity: 1;
                transition: opacity 350ms ease;
            }
            #auth-guard-overlay.fade-out {
                opacity: 0;
                pointer-events: none;
            }
            #auth-guard-overlay .auth-spinner {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.25rem;
                padding: 2rem 2.5rem;
                background: rgba(31, 31, 31, 0.62);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 24px;
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5),
                            inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
            }
            #auth-guard-overlay .spinner-ring {
                width: 44px;
                height: 44px;
                border: 3px solid rgba(45, 212, 191, 0.2);
                border-top-color: #2dd4bf;
                border-right-color: #14b8a6;
                border-radius: 50%;
                animation: authGuardSpin 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            @keyframes authGuardSpin { to { transform: rotate(360deg); } }
            #auth-guard-overlay .spinner-label {
                font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 0.95rem;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.78);
                letter-spacing: 0.3px;
            }
            @media (prefers-reduced-motion: reduce) {
                #auth-guard-overlay { transition: none; }
                #auth-guard-overlay .spinner-ring { animation: none; border-top-color: rgba(45, 212, 191, 0.55); }
            }
        `;
        document.head.appendChild(style);
    }

    overlayEl.innerHTML = `
        <div class="auth-spinner" role="status" aria-live="polite">
            <div class="spinner-ring" aria-hidden="true"></div>
            <div class="spinner-label">Verifying your session...</div>
        </div>
    `;
    document.documentElement.appendChild(overlayEl);
}

function removeOverlay() {
    if (!overlayEl) return;
    overlayEl.classList.add('fade-out');
    setTimeout(() => {
        if (overlayEl && overlayEl.parentNode) {
            overlayEl.parentNode.removeChild(overlayEl);
        }
        overlayEl = null;
    }, 400);
}

// ---------- Store + redirect helpers ----------
function storeRedirectTarget() {
    // Don't store the sign-in page itself as redirect target
    const currentPath = window.location.pathname;
    const file = currentPath.split('/').pop();
    if (file === 'signin.html' || file === 'finishSignUp.html') return;

    // Preserve full path + query string (but not hash) so deep linking works
    const target = window.location.pathname + window.location.search;
    sessionStorage.setItem(STORAGE_KEY, target);
}

function redirectToSignIn() {
    storeRedirectTarget();
    // Use replace so user can't "back" into a protected page without auth
    window.location.replace(SIGN_IN_URL);
}

// ---------- Core auth check ----------
export function checkAuthNow() {
    if (isPublicPage()) return Promise.resolve(true);

    return new Promise((resolve) => {
        // If auth has already resolved and user is null, we should have
        // already redirected; but re-check defensively.
        if (authResolved) {
            const u = auth.currentUser;
            if (!u) {
                redirectToSignIn();
                resolve(false);
            } else {
                removeOverlay();
                resolve(true);
            }
            return;
        }

        // Inject overlay BEFORE subscribing so no content flashes.
        injectLoadingOverlay();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            authResolved = true;
            unsubscribe(); // only need the first emission from a cold start

            if (user) {
                // Session is valid — let them in.
                removeOverlay();
                resolve(true);
            } else {
                // No session — redirect immediately.
                // (Overlay stays in place during redirect to prevent flash.)
                redirectToSignIn();
                resolve(false);
            }
        }, (err) => {
            console.error('[auth-guard] onAuthStateChanged error:', err);
            authResolved = true;
            unsubscribe();
            // On error, treat as unauthenticated (fail-closed).
            redirectToSignIn();
            resolve(false);
        });
    });
}

// ---------- Re-checks on navigation events ----------
function setupNavigationGuards() {
    if (isPublicPage()) return;

    // back / forward button
    window.addEventListener('popstate', () => {
        authResolved = false;
        checkAuthNow();
    });

    // Tab switch + revisit — some browsers persist auth state but
    // signing out in another tab should be reflected here too.
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            checkAuthNow();
        }
    });
}

// ---------- Auto-run (for simple <script type="module" src> usage) ----------
(function autoInit() {
    if (isPublicPage()) return;
    setupNavigationGuards();
    checkAuthNow();
})();
