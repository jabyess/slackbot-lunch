# lunch-bot

![lunch-bot-icon](http://files-misc.s3.amazonaws.com/lunchbot.jpg)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This is a Slack bot that parses the c1 restaurants google sheet and makes a poll.

To run the app there are several `ENV` variables that you need to set:

- GOOGLE_SHEET_ID - the portion of the URL from the spreadsheet you're trying to read
- GOOGLE_API_KEY - see below
- SLACK_BOT_TOKEN
- SLACK_SIGNING_SECRET
- SLACK_BOT_SOCKET_TOKEN

`GOOGLE_API_KEY` is a key you generate for `lunchpicker` to use in reading spreadsheets via the [Google Sheets API].

1. Go to the [GCP credentials page](https://console.cloud.google.com/apis/credentials)
1. Click `+ Create Credentials`
1. Choose API Key
1. Copy the API key

