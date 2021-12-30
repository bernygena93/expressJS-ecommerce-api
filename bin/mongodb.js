/** @format */

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://bernygena:Bernygena93@db-heroku.xjwq6.mongodb.net/test",
  { useNewUrlParser: true },
  function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conectado a MongoDB");
    }
  }
);
module.exports = mongoose;
