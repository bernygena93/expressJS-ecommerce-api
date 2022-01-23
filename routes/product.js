/** @format */

const express = require("express");
var router = express.Router();

const ProductController = require("../controllers/ProductController");

/* Products Functions */
router.post(
  "/",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  ProductController.create
);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.get("/category/:id", ProductController.getByCategory);
router.get("/brand/:id", ProductController.getByBrand);
router.get("/shipping/:id", ProductController.getByShippingFree);
router.get("/user/:id", ProductController.getByUser);
router.put(
  "/:id",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  ProductController.update
);
router.delete(
  "/:id",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  ProductController.deleteById
);
module.exports = router;
