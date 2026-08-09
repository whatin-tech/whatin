import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

        console.log("Navigating to https://whatin.in/ ...");
        await page.goto('https://whatin.in/', { waitUntil: 'networkidle2' });
        
        const title = await page.title();
        console.log("Title:", title);
        
        const bodyHtml = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
        console.log("Body starts with:", bodyHtml);
        
        // check if scripts have type module
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
