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
    getDoc,
    setDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    where,
    limit
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

// Additional imports for sub-admin creation without logging current user out
import { initializeApp as initSecondaryApp, deleteApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth as getSecondaryAuth, createUserWithEmailAndPassword as createSecondaryUser, signOut as signOutSecondary } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

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

// Super Admin definition
const SUPER_ADMINS = ['dushyant@whatin.in', 'dushyantsaini.whatin@gmail.com', 'sainidushyant756@gmail.com'];

function isSuperAdmin(email) {
    if (!email) return false;
    return SUPER_ADMINS.includes(email.trim().toLowerCase());
}

/**
 * Creates a new Sub-Admin in Firebase Auth and records their profile in Firestore.
 * Uses an isolated secondary Firebase app instance to ensure the Super Admin stays logged in.
 */
async function createSubAdminUser(name, email, password, creatorEmail) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const tempAppName = 'SubAdminCreator_' + Date.now();
    const tempApp = initSecondaryApp(adminFirebaseConfig, tempAppName);
    try {
        const tempAuth = getSecondaryAuth(tempApp);
        const userCred = await createSecondaryUser(tempAuth, cleanEmail, password);
        const uid = userCred.user.uid;

        // Save admin profile in Firestore
        await setDoc(doc(db, "admins", uid), {
            uid: uid,
            name: cleanName,
            email: cleanEmail,
            role: 'subadmin',
            createdBy: creatorEmail,
            createdAt: new Date()
        });

        await signOutSecondary(tempAuth);
        await deleteApp(tempApp);
        return { success: true, uid, name: cleanName, email: cleanEmail };
    } catch (err) {
        try { await deleteApp(tempApp); } catch (e) {}
        throw err;
    }
}

export {
    adminApp,
    adminFirebaseConfig,
    db,
    auth,
    analytics,
    collection,
    addDoc,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    where,
    limit,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    SUPER_ADMINS,
    isSuperAdmin,
    createSubAdminUser
};
