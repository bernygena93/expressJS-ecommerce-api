/** @format */

var express = require("express");
var router = express.Router();

const UserController = require("../controllers/UserController");

/* Users Functions */
router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.put("/:id", UserController.update);

module.exports = router;
