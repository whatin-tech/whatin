import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        await page.goto('https://www.whatin.in/pages/team.html', { waitUntil: 'networkidle2' });
        
        const scripts = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('script')).map(s => ({
                src: s.src,
                type: s.type
            }));
        });
        console.log("Scripts:", scripts);
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer error:", e);
    }
})();
