/** @format */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");

var app = express();
app.set("secretKey", "react-ecommerce-api");

app.use(cors());

app.get("/", cors("Access-Control-Allow-Origin"), function (req, res, next) {});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/auth", usersRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    function (err, decoded) {
      if (err) {
        res.status(401).json({ message: err.message });
      } else {
        console.log(decoded);
        req.body.tokenData = decoded;
        next();
      }
    }
  );
}
app.validateUser = validateUser;

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// set the view engine to ejs
app.set("view engine", "ejs");

module.exports = app;
