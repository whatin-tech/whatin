const fs = require('fs');

const files = [
    'index.html',
    'pages/collegepyp.html',
    'pages/topper.html',
    'pages/unitwise.html',
    'pages/affidavit.html'
];

const oldTawkScript = `<!--Start of Tawk.to Script-->
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
<!--End of Tawk.to Script-->`;

const newTawkScript = `<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a36079e0f767c1d42224af1/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes(oldTawkScript)) {
            content = content.replace(oldTawkScript, newTawkScript);
            fs.writeFileSync(file, content, 'utf8');
            console.log('Replaced Tawk.to script in ' + file);
        } else if (content.includes(newTawkScript)) {
            console.log('New Tawk.to script already exists in ' + file);
        } else {
            console.log('Old Tawk.to script NOT FOUND in ' + file);
        }
    } catch (err) {
        console.error('Could not process ' + file + ':', err.message);
    }
});
