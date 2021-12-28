/** @format */

const express = require("express");
const { validateUser } = require("../app");
var router = express.Router();

const ProductController = require("../controllers/ProductController");

/* Products Functions */
router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.deleteById);
module.exports = router;
