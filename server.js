/** @format */

var express = require("express");
var app = express();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/product");
var categoryRouter = require("./routes/category");

app.use("/", productsRouter);
app.use("/products", productsRouter);
app.use("/auth", usersRouter);
app.use("/category", categoryRouter);
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set("view engine", "ejs");

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + "/public"));

// set the home page route

app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});
