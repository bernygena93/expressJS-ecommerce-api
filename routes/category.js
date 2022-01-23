/** @format */

var express = require("express");
var router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/", CategoryController.getAll);
router.post(
  "/",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  CategoryController.create
);
module.exports = router;
