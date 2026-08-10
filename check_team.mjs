import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
        page.on('response', response => {
            if (response.status() >= 400 && response.url().includes('images/')) {
                console.log('IMAGE 404:', response.url(), response.status());
            }
        });

        console.log("Navigating to https://whatin.in/pages/team.html ...");
        await page.goto('https://whatin.in/pages/team.html', { waitUntil: 'networkidle2' });
        
        const title = await page.title();
        console.log("Title:", title);
        
        // Evaluate the DOM to see what the image src is
        const images = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.card-image-box img')).map(img => img.src);
        });
        console.log("Image sources found in DOM:", images);
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer error:", e);
    }
})();
