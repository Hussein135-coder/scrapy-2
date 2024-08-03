const { URLS } = require("./config");
const login = require("./login");
const { scrapeAllPages } = require("./scraper");
const { delay } = require("./utils");

async function cronScrape(browser, bot, pagesSelected) {
  console.log("Croning... || Open Page...", pagesSelected);
  const page = await browser.newPage();
  try {
    await page.goto(URLS[0], { waitUntil: "networkidle2", timeout: 60000 });
    if (page.url().includes("login")) {
      console.log("Session expired, logging in again...");
      await login(page, browser);
    }
    await page.close();
    scrapeAllPages(browser, bot, pagesSelected);
  } catch (error) {
    console.error("Error during scraping Cron:", error);
    console.log("Retrying Cron...");
    await delay(3000); // Delay before retrying
    await page.close();
    return cronScrape(browser, bot, pagesSelected); // Retry main function
  }
}

module.exports = cronScrape;
