/** @format */

const mongoose = require("mongoose");

// Local DB
// const urlDB = "mongodb://localhost/React-Ecommerce-DB";

// Cloud DB
const urlDB =
  "mongodb+srv://bernygena:Bernygena93@db-heroku.xjwq6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
  // "mongodb://localhost/NodeJSCurso",
  urlDB,
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
