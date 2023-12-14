const { google } = require("googleapis");
const credentials = require("../credentials.json");

const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/spreadsheets"],
});

console.log("Authorize this app by visiting this URL:", authUrl);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from the browser: ", (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    console.log(token);
    oAuth2Client.setCredentials(token);
  });
});

const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

module.exports = sheets;
