const conf = require("../conf/conf");
const mongoose = require("mongoose");
require("dotenv").config();

function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => {
      console.log("DB CONNECTED");
    })
    .catch((err) => {
      console.log("ERROR IN DB CONNECTION");
    });
}

module.exports = connectToDb;
