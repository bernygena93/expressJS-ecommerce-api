/** @format */

const express = require("express");
const { validateUser } = require("../app");
var router = express.Router();

const ProductController = require("../controllers/ProductController");

/* Products Functions */
router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.get("/category/:id", ProductController.getByCategory);
router.get("/brand/:id", ProductController.getByBrand);
router.get("/shipping/:id", ProductController.getByShippingFree);
router.get("/user/:id", ProductController.getByUser);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.deleteById);
module.exports = router;
