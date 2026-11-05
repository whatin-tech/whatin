// =============================================
// 🔒 ADMIN PANEL FIREBASE CONFIGURATION
// Project: whatin-98232 (Admin Portal & Firestore Resources)
// =============================================

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
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

const env = (typeof import.meta !== 'undefined' && import.meta && import.meta.env) ? import.meta.env : {};

const adminFirebaseConfig = {
    apiKey: env.VITE_ADMIN_FIREBASE_API_KEY || "AIzaSyAI-_MmGMULmM0qsZK5SoQ4fOaSREbJStw",
    authDomain: env.VITE_ADMIN_FIREBASE_AUTH_DOMAIN || "whatin-98232.firebaseapp.com",
    projectId: env.VITE_ADMIN_FIREBASE_PROJECT_ID || "whatin-98232",
    storageBucket: env.VITE_ADMIN_FIREBASE_STORAGE_BUCKET || "whatin-98232.firebasestorage.app",
    messagingSenderId: env.VITE_ADMIN_FIREBASE_MESSAGING_SENDER_ID || "773750592727",
    appId: env.VITE_ADMIN_FIREBASE_APP_ID || "1:773750592727:web:f87f02cc5edad550fccc92",
    measurementId: env.VITE_ADMIN_FIREBASE_MEASUREMENT_ID || "G-5VQBV2928T"
};

const adminApp = getApps().find(a => a.name === 'AdminApp') || initializeApp(adminFirebaseConfig, 'AdminApp');
const db = getFirestore(adminApp);
const auth = getAuth(adminApp);

let analytics = null;
try {
    analytics = getAnalytics(adminApp);
} catch (e) {
    analytics = null;
}

// Session persistence for admin
setPersistence(auth, browserLocalPersistence).catch((err) => {
    // Non-blocking
});

export {
    adminApp,
    db,
    auth,
    analytics,
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
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
};
