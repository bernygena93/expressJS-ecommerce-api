/** @format */

const mongoose = require("mongoose");

// Local DB
const urlDB = "mongodb://localhost/React-Ecommerce-DB";

// Cloud DB
const urlDB =
  // "**************************";

  mongoose.connect(urlDB, { useNewUrlParser: true }, function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conectado a MongoDB");
    }
  });
module.exports = mongoose;
