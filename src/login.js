const {
  FACEBOOK_EMAIL,
  FACEBOOK_PASSWORD,
  TELEGRAM_CHAT_IDS,
} = require("./config");
const { delay } = require("./utils");

async function login(page, browser) {
  try {
    console.log("Loging...");
    await page.goto("https://www.facebook.com/login", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    if (page.url().includes("login")) {
      await page.type("#email", FACEBOOK_EMAIL);
      await page.type("#pass", FACEBOOK_PASSWORD);
      await page.click("button[name=login]");
      await page.waitForNavigation({
        waitUntil: "networkidle2",
        timeout: 60000,
      });
    }

    const screenshotPath = "loginScrape2.png";
    await page.screenshot({ path: screenshotPath });
    console.log("Login Done...");

    try {
      bot.sendPhoto(TELEGRAM_CHAT_IDS[1], "loginScrape2.png");
    } catch (error) {
      console.log("Error in sending photo");
    }

    const cookies = await page.cookies();
    return cookies;
  } catch (error) {
    console.error("Login failed:", error);
    console.log("Retrying login...");
    await delay(3000);
    return login(page);
  }
}

module.exports = login;
