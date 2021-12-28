/** @format */

var express = require("express");
var router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/", CategoryController.getAll);
router.post("/", CategoryController.create);
module.exports = router;
