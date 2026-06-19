const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace('href="css/style.css?v=3.0"', 'href="css/style.css?v=3.1"');
fs.writeFileSync('index.html', content);
