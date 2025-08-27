const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  console.log('page.$x is', typeof page.$x); // Should print "function"
  await browser.close();
})();