// =============================================
// 🎯 ALLOWED DOMAIN CONFIGURATION — CHANGE HERE
// =============================================
// To change the allowed email domain later, simply update this value:
const ALLOWED_EMAIL_DOMAIN = '@glbajajgroup.org';
// =============================================

// Firebase Configuration — GL Bajaj Login System Project (Loaded strictly from .env)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_GLBAJAJ_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_GLBAJAJ_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_GLBAJAJ_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_GLBAJAJ_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_GLBAJAJ_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_GLBAJAJ_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_GLBAJAJ_FIREBASE_MEASUREMENT_ID
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    sendEmailVerification,
    fetchSignInMethodsForEmail,
    signInAnonymously,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    where,
    limit
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let analytics;
try {
    analytics = getAnalytics(app);
} catch (e) {
    analytics = null;
}

// 🔒 Persistent Login: Session survives browser restarts
setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.error("Failed to set auth persistence:", err);
});

/**
 * Validates that an email ends with the allowed domain.
 * Used on both sign-in and finishSignUp pages BEFORE any Firebase call.
 * @param {string} email
 * @returns {boolean}
 */
function isAllowedEmailDomain(email) {
    if (!email || typeof email !== 'string') return false;
    return email.trim().toLowerCase().endsWith(ALLOWED_EMAIL_DOMAIN);
}

/**
 * Basic email regex syntax check (RFC-lite).
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmailSyntax(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export {
    app,
    db,
    auth,
    analytics,
    ALLOWED_EMAIL_DOMAIN,
    isAllowedEmailDomain,
    isValidEmailSyntax,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    where,
    limit,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    sendEmailVerification,
    fetchSignInMethodsForEmail,
    signInAnonymously,
    onAuthStateChanged,
    signOut
};
