const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Use string replace to safely append a version query without messing up regex
content = content.replace('href="css/style.css"', 'href="css/style.css?v=3.0"');
content = content.replace('src="js/script.js"', 'src="js/script.js?v=3.0"');
content = content.replace('src="js/nav-auth.js"', 'src="js/nav-auth.js?v=3.0"');

fs.writeFileSync('index.html', content);
console.log("Cache busters added to index.html");
