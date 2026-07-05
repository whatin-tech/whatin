const fs = require('fs');
const path = require('path');

const firebaseScript = `
    <!-- Firebase Analytics SDK -->
    <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-database-compat.js"></script>

    <script>
      const firebaseAnalyticsConfig = {
        apiKey: "AIzaSyAQFEioBcwIrhDzOcPf7lMleVKGHHjba_8",
        authDomain: "whatin-analytic-dabfa.firebaseapp.com",
        databaseURL: "https://whatin-analytic-dabfa-default-rtdb.firebaseio.com",
        projectId: "whatin-analytic-dabfa",
        storageBucket: "whatin-analytic-dabfa.firebasestorage.app",
        messagingSenderId: "649111328567",
        appId: "1:649111328567:web:acdf7d5f9a52b76526ecb2"
      };

      // Ensure we don't initialize twice if another script initializes a different firebase app
      let analyticsApp;
      if (!firebase.apps.length) {
          analyticsApp = firebase.initializeApp(firebaseAnalyticsConfig);
      } else {
          analyticsApp = firebase.initializeApp(firebaseAnalyticsConfig, 'AnalyticsApp');
      }
      
      const db = analyticsApp.database();

      // ---- 1. Total Visitors Count (har page load par +1) ----
      const visitorsRef = db.ref('stats/totalVisitors');
      visitorsRef.transaction((current) => (current || 0) + 1).catch(err => console.error("Firebase Visitor Track Error:", err));

      // ---- 2. Live Visitor Count page par dikhana (if elements exist) ----
      visitorsRef.on('value', (snapshot) => {
        const el = document.getElementById('visitorCount');
        if (el) el.innerText = snapshot.val() || 0;
      });

      // ---- 3. Total Clicks Count (har click par +1) ----
      const clicksRef = db.ref('stats/totalClicks');
      document.addEventListener('click', () => {
        clicksRef.transaction((current) => (current || 0) + 1).catch(err => console.error("Firebase Click Track Error:", err));
      });

      // ---- 4. Live Click Count page par dikhana (if elements exist) ----
      clicksRef.on('value', (snapshot) => {
        const el = document.getElementById('clickCount');
        if (el) el.innerText = snapshot.val() || 0;
      });
    </script>
</body>`;

function walkDir(dir) {
    let htmlFiles = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        if (file === 'node_modules' || file === '.git') continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            htmlFiles = htmlFiles.concat(walkDir(fullPath));
        } else if (file.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    }
    return htmlFiles;
}

const rootDir = 'e:\\origin of whatin\\whatin';
const allHtml = walkDir(rootDir);
let updated = 0;

for (const file of allHtml) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it already has the analytics script
    if (content.includes('whatin-analytic-dabfa.firebaseapp.com')) {
        console.log(`Skipping (already injected): ${file}`);
        continue;
    }
    
    // Check for </body>
    if (content.includes('</body>')) {
        content = content.replace('</body>', firebaseScript);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Injected analytics into: ${file}`);
        updated++;
    } else {
        console.log(`Warning: No </body> tag found in ${file}`);
    }
}

console.log(`\nSuccessfully updated ${updated} HTML files with the Firebase Analytics tracker!`);
