// ================================================================
// 🔥 Firebase Cloud Functions — GL Bajaj Group Auth
// ================================================================
//
// DEPLOYMENT INSTRUCTIONS:
// ------------------------
// Prerequisites:
//   1. Install Node.js 20+
//   2. Install Firebase CLI:  npm install -g firebase-tools
//   3. Login:                firebase login
//   4. Initialize project:   firebase init functions  (choose gl-bajaj-login-system,
//                                                     pick "use existing functions folder"
//                                                     if prompted, JavaScript, ESLint optional)
//
// TO DEPLOY THESE BLOCKING FUNCTIONS:
//   cd functions
//   npm install
//   cd ..
//   firebase deploy --only functions:beforeCreate,functions:beforeSignIn
//
// IMPORTANT — BLOCKING TRIGGERS REQUIRE IDENTITY PLATFORM:
//   1. Go to Firebase Console → Authentication → Settings → Providers
//   2. Ensure "Email link (passwordless sign-in)" is ENABLED.
//   3. Go to the "Blocking functions" tab and register these functions:
//        - Before create (beforeCreate) → beforeCreate
//        - Before sign in  (beforeSignIn) → beforeSignIn
//      (or they auto-register after first deploy in modern Firebase; if not,
//       register them manually in the Identity Platform console.)
//
// ================================================================
// 🎯 ALLOWED DOMAIN CONFIGURATION — CHANGE HERE
// ================================================================
// To change the allowed email domain later, simply update this value.
// KEEP THIS IN SYNC with ALLOWED_EMAIL_DOMAIN in:
//   - js/firebase-config.js   (client)
// ================================================================
const ALLOWED_EMAIL_DOMAIN = '@glbajajgroup.org';
// ================================================================

const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');
const { HttpsError } = require('firebase-functions/v2/identity');

admin.initializeApp();

const logger = functions.logger;

/**
 * Checks whether an email ends with the allowed organizational domain.
 * Performs lowercasing + trimming to avoid bypass via case / whitespace tricks.
 *
 * @param {string | undefined | null} email
 * @returns {boolean}
 */
function isAllowedDomain(email) {
    if (!email || typeof email !== 'string') return false;
    const clean = email.trim().toLowerCase();
    return clean.endsWith(ALLOWED_EMAIL_DOMAIN.toLowerCase());
}

/**
 * Normalizes email (trim + lowercase) for consistent logging / comparison.
 */
function norm(email) {
    return (email || '').trim().toLowerCase();
}

// ================================================================
// 🔴 BLOCKING TRIGGER — BEFORE CREATE
// ================================================================
// Runs **BEFORE** a new account can be created in Firebase Auth.
// Even if someone bypasses the client-side validation (e.g. calls the
// Firebase REST API / SDK directly with a random @gmail.com email),
// this function will REJECT account creation on the server side.
//
// Documentation:
//   https://firebase.google.com/docs/auth/extend-with-blocking-functions
// ================================================================
exports.beforeCreate = functions.identity.beforeUserCreated((event) => {
    const { data } = event;
    const email = data.email;

    logger.log('[beforeCreate] Processing new account creation attempt', {
        uid: data.uid,
        email: norm(email),
        signInProvider: data.providerData && data.providerData[0]
            ? data.providerData[0].providerId : 'unknown'
    });

    // 🛑 HARD STOP — Reject non-org domains
    if (!isAllowedDomain(email)) {
        logger.warn('[beforeCreate] REJECTED account creation — wrong domain', {
            email: norm(email),
            allowedDomain: ALLOWED_EMAIL_DOMAIN
        });
        // Throwing HttpsError is the only way to abort the operation.
        // Firebase surfaces this as auth/operation-not-allowed on the client
        // (or a custom error message if the SDK propagates it).
        throw new HttpsError(
            'invalid-argument',
            `Sign-up is restricted to ${ALLOWED_EMAIL_DOMAIN} email addresses only.`
        );
    }

    // ✅ All good — allow the account to be created.
    // (Optional) here you could seed Firestore with a user document, e.g.:
    //   admin.firestore().collection('users').doc(data.uid).set({...})
    logger.log('[beforeCreate] ALLOWED account creation for', norm(email));
});

// ================================================================
// 🔴 BLOCKING TRIGGER — BEFORE SIGN IN
// ================================================================
// Second layer of defense. Runs **BEFORE** every sign-in (not just
// sign-up) — catches edge cases like:
//   • Pre-existing accounts created before the domain restriction.
//   • Accounts that were created directly via Firebase Admin SDK.
//   • Sign-in attempts on accounts whose email was later changed.
// ================================================================
exports.beforeSignIn = functions.identity.beforeUserSignedIn((event) => {
    const { data } = event;
    const email = data.email;

    logger.log('[beforeSignIn] Processing sign-in attempt', {
        uid: data.uid,
        email: norm(email),
        signInProvider: data.providerData && data.providerData[0]
            ? data.providerData[0].providerId : 'unknown',
        signInMethod: data.signInMethod
    });

    // If user is disabled, Firebase itself blocks it — but we can also
    // explicitly check here and log.
    if (data.disabled) {
        logger.warn('[beforeSignIn] REJECTED — disabled account', { uid: data.uid });
        throw new HttpsError('permission-denied', 'This account has been disabled.');
    }

    // 🛑 HARD STOP — Reject sign-in for wrong domains (defense-in-depth)
    if (!isAllowedDomain(email)) {
        logger.warn('[beforeSignIn] REJECTED sign-in — wrong domain', {
            uid: data.uid,
            email: norm(email),
            allowedDomain: ALLOWED_EMAIL_DOMAIN
        });
        throw new HttpsError(
            'permission-denied',
            `Access is restricted to ${ALLOWED_EMAIL_DOMAIN} email addresses only.`
        );
    }

    logger.log('[beforeSignIn] ALLOWED sign-in for', norm(email));

    // Optional: record lastSignIn timestamp in Firestore
    // return admin.firestore().collection('users').doc(data.uid).set({
    //     lastSignInAt: admin.firestore.FieldValue.serverTimestamp()
    // }, { merge: true });
});
