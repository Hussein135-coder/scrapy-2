const { TELEGRAM_BOT_TOKEN } = require("./src/config");
const express = require("express");
const cors = require("cors");
const initBrowser = require("./browser");
const path = require("path");
const main = require("./src/main");

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ hi: "Hi" });
});

app.get("/posts", function (req, res) {
  const options = {
    root: path.join(__dirname + "/data/"),
  };

  const fileName = "data.json";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

(async () => {
  console.log("start");
  const browser = await initBrowser();
  main(browser, bot);
})();

module.exports = app;
