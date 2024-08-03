require("dotenv").config();
const path = require("path");

module.exports = {
  FACEBOOK_EMAIL: process.env.FACEBOOK_EMAIL,
  FACEBOOK_PASSWORD: process.env.FACEBOOK_PASSWORD,
  CHROME_EXECUTABLE_PATH: process.env.CHROME_EXECUTABLE_PATH,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  MONGO: process.env.MONGO,
  TELEGRAM_CHAT_IDS: [
    process.env.CHAT_ID_1,
    process.env.CHAT_ID_2,
    process.env.CHAT_ID_3,
    process.env.CHAT_ID_4,
  ],
  DATA_FILE_PATH: path.join(__dirname, "../data/data.json"),
  URLS: [
    process.env.URL_1,
    process.env.URL_2,
    process.env.URL_3,
    process.env.URL_4,
    process.env.URL_5,
  ],
};

// ,process.env.URL_19,process.env.URL_20,process.env.URL_21,process.env.URL_22,process.env.URL_23,process.env.URL_24
