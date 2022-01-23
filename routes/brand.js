/** @format */

var express = require("express");
var router = express.Router();
const BrandController = require("../controllers/BrandController");

router.post(
  "/",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  BrandController.create
);
router.get("/", BrandController.getAll);
module.exports = router;
