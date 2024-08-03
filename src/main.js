const login = require("./login");
const cronScrape = require("./cron");
const { delay } = require("./utils");
const { TELEGRAM_CHAT_IDS } = require("./config");

let pagesSelected = [0, 5];
async function main(browser, bot) {
  const page = await browser.newPage();

  try {
    await page.goto("https://www.facebook.com/login", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    if (page.url().includes("login")) {
      await login(page, browser);
    }
    await page.close();

    try {
      bot.sendMessage(TELEGRAM_CHAT_IDS[1], "Running sym3...");
    } catch (error) {
      console.log("hussein tele Error" + error);
    }

    setInterval(() => {
      try {
        bot.sendMessage(TELEGRAM_CHAT_IDS[1], "Running sym3...");
      } catch (error) {
        console.log("hussein tele Error" + error);
      }
    }, 600000);

    setInterval(() => {
      console.log("Interval...");
      //pagesSelected = pagesSelected.length == 1 ? [0,5] : [5]
      cronScrape(browser, bot, pagesSelected);
    }, 90000);
  } catch (error) {
    console.error("Error in main process:", error);
    console.log("Retrying main process...");
    pagesSelected = pagesSelected.length == 1 ? [0, 5] : [5];
    await delay(3000);
    await page.close();
    return main(browser, bot);
  }
}

module.exports = main;
