const { delay, loadData, saveData } = require("./utils");
const { TELEGRAM_CHAT_IDS, URLS } = require("./config");
const aiPost = require("../ai");

async function scrapePage(page, url) {
  console.log("Scraping Page...:", url);

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    await delay(500);
    //  const elements = await page.$$('div[role="button"]');
    //  for (const element of elements) {
    //    const text = await page.evaluate((el) => el.innerText, element);
    //    if (text.includes("Show more") || text.includes("عرض المزيد")) {
    //      await element.click();
    //      await delay(500);
    //    }
    //  }

    const LINK = url.includes("profile.php") ? "permalink" : "post";

    // const screenshotPath = "scrape-7000/screen/" + url.slice(-3) + "t.png";
    // await page.screenshot({ path: screenshotPath });

    const latestPost = await page.evaluate((LINK) => {
      const page = document.querySelector("div[role='main'] h1");
      const post = document.querySelector(
        'div[data-pagelet="ProfileTimeline"] div[role="article"]'
      );
      let content = "",
        link = "",
        name = "";

      if (post) {
        link = post.querySelector(`a[href*="/${LINK}"]`);
        content = post.querySelector('div[dir="auto"]');
        name = page.innerText;
      }

      return {
        content: content ? content.innerText : "No post found",
        link: link ? link.href : "https://facebook.com",
        name: name,
      };
    }, LINK);

    //await page.close();
    return latestPost;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    console.log("Retrying scrape...");
    await delay(3000); // Delay before retrying
    //await page.close();
    return scrapePage(browser, url); // Retry scraping
  }
}
// Function to escape special characters for Markdown
function escapeMarkdown(text) {
  return text.replace(/(\*|_|`|\[|\])/g, "\\$1");
}

let errorsCount = 0;
async function scrapeAllPages(browser, bot, pagesSelected) {
  console.log("Scraping All Pages...");
  const data = loadData();
  const newData = { ...data };

  const page = await browser.newPage();

  for (let i = pagesSelected[0]; i < pagesSelected[0] + 5; i++) {
    try {
      await delay(5000);
      const post = await scrapePage(page, URLS[i]);
      console.log(
        `Latest post from ${URLS[i]}: ${post.content} || Url: ${post.link} || PageName: ${post.name}`
      );

      if (
        post.content == "No post found" &&
        post.link == "https://facebook.com"
      ) {
        //bot.sendMessage(TELEGRAM_CHAT_IDS[1], 'Error: ' + URLS[i] );
        errorsCount++;
        console.log("Error: " + URLS[i], " || ", errorsCount);
        if (errorsCount == 5 || errorsCount == 10) {
          bot.sendMessage(
            TELEGRAM_CHAT_IDS[1],
            "Error: " + errorsCount + " sym3"
          );
        }
        continue;
      }
      newData[URLS[i]] = post;

      if (data[URLS[i]]?.content !== post.content) {
        const refactoredPost = await aiPost(post.content);

        console.log(refactoredPost, "refactoredPost");

        if (refactoredPost == "fail") {
          bot.sendMessage(
            TELEGRAM_CHAT_IDS[1],
            "Ai Failed: " + URLS[i] + post.content
          );
          saveData(newData);
          continue;
        }
        const content = escapeMarkdown(post.content);

        const message = `🔥 اسم الصفحة: ${post.name} 🔥\n\nالمنشور: ${content}\n\n[رابط المنشور](${post.link})`;

        if (refactoredPost.includes("غير تعليمي")) {
          try {
            await bot.sendMessage(
              TELEGRAM_CHAT_IDS[1],
              "❌ غير تعليمي ❌ " + message,
              {
                parse_mode: "Markdown",
              }
            );
          } catch {
            console.log("Telegram Error");
          }
        } else {
          console.log(refactoredPost, "refactoredPost Else");

          TELEGRAM_CHAT_IDS.forEach(async (TELEGRAM_CHAT_ID) => {
            if (TELEGRAM_CHAT_ID) {
              console.log("Sending Post...");
              try {
                await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
                  parse_mode: "Markdown",
                });
              } catch {
                console.log("Telegram Error");
              }
            }
          });
        }

        saveData(newData);
      }
    } catch (error) {
      console.error(`Error All scraping ${URLS[i]}:`, error);
      await delay(3000);
      return true;
      //return scrapeAllPages(browser, bot); // Retry scraping
    }
  }
}

module.exports = {
  scrapeAllPages,
};
