import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

        console.log("Navigating to login.html...");
        await page.goto('http://localhost:5173/pages/login.html', { waitUntil: 'networkidle2' });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log("Typing credentials...");
        await page.type('#email', 'admin@gmail.com');
        await page.type('#password', 'wrongpassword'); // Even with wrong password, we should see an error or alert
        
        console.log("Clicking sign in...");
        page.on('dialog', async dialog => {
            console.log('DIALOG:', dialog.message());
            await dialog.dismiss();
        });
        
        await page.click('.login-btn');
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log("Done checking.");
        await browser.close();
    } catch (e) {
        console.error("Puppeteer error:", e);
    }
})();
