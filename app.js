require('dotenv').config()
const { App } = require("@slack/bolt");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3333);
  console.log('⚡️ Bolt app is running!');

})();
