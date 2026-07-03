const fs = require('fs');

const files = [
    'pages/collegepyp.html',
    'pages/topper.html',
    'pages/unitwise.html',
    'pages/affidavit.html'
];

const tawkScript = `<!--Start of Tawk.to Script-->
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
        if (content.includes(tawkScript)) {
            // Remove the script and the trailing newline we added earlier
            content = content.replace(tawkScript + '\n', '');
            // Fallback if the newline isn't exact
            content = content.replace(tawkScript, '');
            fs.writeFileSync(file, content, 'utf8');
            console.log('Removed Tawk.to script from ' + file);
        } else {
            console.log('Tawk.to script NOT FOUND in ' + file);
        }
    } catch (err) {
        console.error('Could not process ' + file + ':', err.message);
    }
});
