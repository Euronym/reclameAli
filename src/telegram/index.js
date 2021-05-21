const https = require("https");

const express = require("express");

const dotenv = require("dotenv");

const app = express();

dotenv.config({ path: '../.env' });

const url = "https://api.telegram.org/bot" + process.env.BOT_TOKEN + "/";


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
app.listen(3000, () => {
  console.log("connection started at 3000.");

});

https.get((url + 'getUpdates'), (res) => {

  res.on("data", (data) => {
    console.log(JSON.parse(data));

  });
});



