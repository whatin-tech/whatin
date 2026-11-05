// =============================================
// 🔒 ADMIN PANEL FIREBASE CONFIGURATION
// Project: whatin-98232 (Admin Portal & Firestore Resources)
// =============================================

const adminFirebaseConfig = {
    apiKey: import.meta.env.VITE_ADMIN_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_ADMIN_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_ADMIN_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_ADMIN_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_ADMIN_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_ADMIN_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_ADMIN_FIREBASE_MEASUREMENT_ID
};

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

const adminApp = getApps().find(a => a.name === 'AdminApp') || initializeApp(adminFirebaseConfig, 'AdminApp');
const db = getFirestore(adminApp);
const auth = getAuth(adminApp);

let analytics;
try {
    analytics = getAnalytics(adminApp);
} catch (e) {
    analytics = null;
}

// Session persistence for admin
setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.error("Failed to set admin auth persistence:", err);
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
