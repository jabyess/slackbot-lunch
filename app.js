require('dotenv').config()
const { App } = require("@slack/bolt");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_BOT_SOCKET_TOKEN,
  socketMode: true,
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
doc.useApiKey(process.env.GOOGLE_API_KEY);

const shuffleRows = (arr) => {
  const rand = Math.floor(Math.random() * arr.length)
  for (let i = 0; i < arr.length; i++) {
    let tmp = arr[i]
    arr[i] = arr[rand]
    arr[rand] = tmp
  }
  return arr
}

const getNumberOfRestaurants = (msg) => {
  let re = new RegExp(/\d/gi)
  let nums = msg.match(re)
  let int = Number(nums.join(""))
  if (int > 5) {
    return 5
  }
  else return int
}

(async () => {
  await app.start(process.env.PORT || 3333);

  console.log(`⚡️ Bolt app is running on ${process.env.port}`);
  app.message(/^(lunchpicker|lunchpicker help)$/, async ({ say }) => {
    say(`I'll pick an assortment of random restaurants for you.\nSimply type "Lunchpicker lunch 3" and I will pick 3 restaurants at random from the google sheet https://docs.google.com/spreadsheets/d/1hp8ghkSsM_H-qrG2Rlpd6RauxJ425EiJqdpuG7e4Pq8/\nYou can then vote on them using the number emoji.\nA maximum of 5 restaurants is supported for sanity's sake.
    `)
  })

  app.message("lunchpicker lunch", async ({ message, say }) => {
    let nums = getNumberOfRestaurants(message.text)

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const allRows = await sheet.getRows()
    let shuffled = shuffleRows(allRows).slice(0, nums)
    let output = shuffled.map((row, i) => {
      return `${i + 1}: Restaurant: *${row.Restaurant}* Cuisine: *${row.Cuisine}* \n`
    })
    output.unshift(`Vote for your preferred by reacting to this message with the number emojis:\n`)

    let response = output.join("")

    await say(response)
  })

})();
