/** @format */

var express = require("express");
var router = express.Router();

const UserController = require("../controllers/UserController");

/* Users Functions */
router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.put("/add-cart", UserController.addToCart);

module.exports = router;
