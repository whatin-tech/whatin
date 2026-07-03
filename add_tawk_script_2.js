const fs = require('fs');

const file = 'pages/unitwise.html';

const tawkScript = `
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a36052da259a01d4cf75f83/1jrhg8fhi';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
`;

try {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('Tawk_API')) {
        content = content.replace('</body>', tawkScript + '\n</body>');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Added Tawk.to to ' + file);
    } else {
        console.log('Tawk.to already exists in ' + file);
    }
} catch (err) {
    console.error('Could not process ' + file + ':', err.message);
}
