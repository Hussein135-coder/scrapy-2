const puppeteer = require("puppeteer");

let browserInstance;
const initBrowser = async () => {
  console.log("browser");
  if (!browserInstance) {
    console.log("browser in");
    browserInstance = await puppeteer.launch({
      headless: true,
      timeout: 60000,
    });
  }
  return browserInstance;
};

module.exports = initBrowser;
