const fs = require('fs');

let content = fs.readFileSync('pages/collegepyp.html', 'utf8');

// Remove Monetag, popunders, and any other adsterra variants in the head
content = content.replace(/<!-- Monetag Ads -->[\s\S]*?<!-- Adsterra Popunder \(Removed\) -->/i, '');

// Failsafe: Remove any remaining specific tags just in case
content = content.replace(/<script>\(function \(s\) \{ s\.dataset\.zone = '10929540'.*?<\/script>\n*/gi, '');
content = content.replace(/<script>\(function \(s\) \{ s\.dataset\.zone = '10929560'.*?<\/script>\n*/gi, '');
content = content.replace(/<script src="https:\/\/5gvci\.com\/act\/files\/tag\.min\.js\?z=10929563".*?<\/script>\n*/gi, '');
content = content.replace(/<script src="https:\/\/omg10\.com\/4\/10929571".*?<\/script>\n*/gi, '');

fs.writeFileSync('pages/collegepyp.html', content);
console.log('Removed head popunder ads successfully.');
