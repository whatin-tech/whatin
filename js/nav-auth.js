import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

document.addEventListener("DOMContentLoaded", () => {
    const navMenu = document.querySelector("#nav-menu ul");
    if (!navMenu) return;

    // Create Logout Button Element
    const logoutLi = document.createElement("li");
    const logoutBtn = document.createElement("a");
    logoutBtn.href = "#";
    logoutBtn.textContent = "Logout";
    // Match the standard nav link styles, but perhaps a slight accent
    logoutBtn.style.color = "#ef4444";
    logoutBtn.style.fontWeight = "600";
    logoutBtn.style.cursor = "pointer";

    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            // Redirect to home page or login
            const isRoot = !window.location.pathname.includes('/pages/');
            window.location.href = isRoot ? 'index.html' : '../index.html';
        } catch (error) {
            console.error("Logout Error:", error);
        }
    });

    logoutLi.appendChild(logoutBtn);
    logoutLi.style.display = "none"; // Hidden by default
    navMenu.appendChild(logoutLi);

    // Listen to Firebase Auth State
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in, show logout
            logoutLi.style.display = "block";
        } else {
            // User is not logged in, hide logout
            logoutLi.style.display = "none";
        }
    });
});
