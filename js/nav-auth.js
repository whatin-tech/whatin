import { auth, onAuthStateChanged, signOut, ALLOWED_EMAIL_DOMAIN } from './firebase-config.js';

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const isGLBajajPage = path.includes('collegepyp.html') || path.includes('signin.html') || path.includes('finishSignUp.html');
    if (!isGLBajajPage) return;

    const navMenu = document.querySelector("#nav-menu ul");
    if (!navMenu) return;

    // Figure out relative path prefix (root vs /pages/)
    const isInPages = path.startsWith('/pages/') || path.includes('/pages/');
    const prefix = isInPages ? '../' : '';
    const signInHref = isInPages ? 'signin.html' : 'pages/signin.html';

    // =============================================
    // 1. Remove the old "Admin" link (we now gate the whole site)
    //    — only keep it if it points to /pages/admin.html specifically
    //    and user can access via the gate
    // =============================================
    const adminLinks = navMenu.querySelectorAll('a[href*="login.html"]');
    adminLinks.forEach(link => link.parentElement && link.parentElement.remove());

    // =============================================
    // 2. Create User Info + Sign Out container
    // =============================================
    const authLi = document.createElement("li");
    authLi.id = "nav-auth-item";
    authLi.style.display = "none"; // Hidden until we know state

    const authContainer = document.createElement("div");
    authContainer.style.display = "inline-flex";
    authContainer.style.alignItems = "center";
    authContainer.style.gap = "0.75rem";

    // User email chip
    const userChip = document.createElement("span");
    userChip.id = "nav-user-chip";
    userChip.style.display = "inline-flex";
    userChip.style.alignItems = "center";
    userChip.style.gap = "0.5rem";
    userChip.style.padding = "0.4rem 0.85rem";
    userChip.style.background = "rgba(31, 31, 31, 0.62)";
    userChip.style.border = "1px solid rgba(255, 255, 255, 0.1)";
    userChip.style.borderRadius = "50px";
    userChip.style.fontSize = "0.85rem";
    userChip.style.fontWeight = "500";
    userChip.style.color = "rgba(255, 255, 255, 0.88)";
    userChip.style.fontFamily = "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif";
    userChip.style.maxWidth = "260px";
    userChip.style.overflow = "hidden";
    userChip.style.textOverflow = "ellipsis";
    userChip.style.whiteSpace = "nowrap";
    userChip.style.backdropFilter = "blur(20px)";
    userChip.style.webkitBackdropFilter = "blur(20px)";

    const avatarIcon = document.createElement("i");
    avatarIcon.className = "fas fa-user-circle";
    avatarIcon.style.fontSize = "1rem";
    userChip.appendChild(avatarIcon);

    const emailSpan = document.createElement("span");
    emailSpan.id = "nav-user-email";
    emailSpan.textContent = `user${ALLOWED_EMAIL_DOMAIN}`;
    userChip.appendChild(emailSpan);

    // Sign Out button
    const signOutBtn = document.createElement("a");
    signOutBtn.href = "#";
    signOutBtn.id = "nav-signout-btn";
    signOutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Sign Out';
    signOutBtn.style.display = "inline-flex";
    signOutBtn.style.alignItems = "center";
    signOutBtn.style.gap = "0.4rem";
    signOutBtn.style.color = "#f87171";
    signOutBtn.style.fontWeight = "600";
    signOutBtn.style.fontSize = "0.875rem";
    signOutBtn.style.cursor = "pointer";
    signOutBtn.style.padding = "0.4rem 0.6rem";
    signOutBtn.style.borderRadius = "8px";
    signOutBtn.style.transition = "all 0.2s ease";
    signOutBtn.title = "Sign out of your account";

    signOutBtn.addEventListener("mouseenter", () => {
        signOutBtn.style.background = "rgba(239, 68, 68, 0.12)";
        signOutBtn.style.color = "#ef4444";
    });
    signOutBtn.addEventListener("mouseleave", () => {
        signOutBtn.style.background = "transparent";
        signOutBtn.style.color = "#f87171";
    });

    signOutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        signOutBtn.disabled = true;
        signOutBtn.style.opacity = "0.5";
        signOutBtn.style.pointerEvents = "none";

        try {
            await signOut(auth);
            // Clear any stored redirect so user doesn't bounce back after logout
            try { sessionStorage.removeItem('postLoginRedirect'); } catch (_) {}
            // Redirect to sign-in page
            window.location.replace(signInHref);
        } catch (error) {
            console.error("Sign Out Error:", error);
            signOutBtn.disabled = false;
            signOutBtn.style.opacity = "1";
            signOutBtn.style.pointerEvents = "auto";
            alert("Failed to sign out. Please try again.");
        }
    });

    authContainer.appendChild(userChip);
    authContainer.appendChild(signOutBtn);
    authLi.appendChild(authContainer);
    navMenu.appendChild(authLi);

    // =============================================
    // 3. Mobile menu — also add sign-out inside the mobile drawer
    //    (if it exists separately)
    // =============================================
    // Note: If the mobile menu clones #nav-menu ul, it will pick up the
    // authLi automatically. Otherwise hook into mobile container here.

    // =============================================
    // 4. Listen to Firebase Auth State
    // =============================================
    onAuthStateChanged(auth, (user) => {
        if (user && user.email) {
            // User is logged in — show chip + sign-out
            authLi.style.display = "block";
            const emailEl = document.getElementById("nav-user-email");
            if (emailEl) {
                emailEl.textContent = user.email;
                // Truncate long emails in the nav with a tooltip
                userChip.title = user.email;
            }
        } else {
            // User is NOT logged in — hide (auth guard will redirect them
            // to sign-in anyway, but this is defensive)
            authLi.style.display = "none";
        }
    });
});
