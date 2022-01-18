/** @format */

const ProductModel = require("../models/ProductModel");

module.exports = {
  // -- Get ------------------------------------------------

  getAll: async function (req, res, next) {
    try {
      const products = await ProductModel.find();
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al consultar la lista de productos");
    }
  },
  getById: async function (req, res, next) {
    try {
      const product = await ProductModel.findById(req.params.id).populate(
        "category"
      );
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al consultar el producto");
    }
  },
  getByCategory: async function (req, res, next) {
    try {
      const products = await ProductModel.find({ category: req.params.id });
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al consultar el producto");
    }
  },
  getByBrand: async function (req, res, next) {
    try {
      const products = await ProductModel.find({ brand: req.params.id });
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al consultar la lista de productos");
    }
  },
  getByUser: async function (req, res, next) {
    try {
      const products = await ProductModel.find({ user: req.params.id });
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al consultar la lista de productos");
    }
  },
  getByShippingFree: async function (req, res, next) {
    try {
      const products = await ProductModel.find({ shipping: true });
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al consultar la lista de productos");
    }
  },
  // --------------------------------------------------
  // -- Create ------------------------------------------------

  create: async function (req, res, next) {
    try {
      const product = new ProductModel({
        make: req.body.make,
        model: req.body.model,
        user: req.body.user,
        price: req.body.price,
        shipping: req.body.shipping,
        stock: req.body.stock,
        category: req.body.category,
        warranty: req.body.warranty,
        rating: req.body.rating,
        description: req.body.description,
      });

      req.body.images.map((image) => {
        product.images.push(image);
      });
      const document = await product.save();
      res.status(200).json(document);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al crear el nuevo producto");
    }
  },
  // --------------------------------------------------
  // -- Update ------------------------------------------------

  update: async function (req, res, next) {
    try {
      const product = await ProductModel.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al actualizar el producto");
    }
  },

  updateRaiting: async function (req, res, next) {
    try {
      const product = await ProductModel.updateOne({ _id: req.params.id });
      const totalScore = 0;
      product.ratings.map((rating) => (totalScore += rating.score));
      product.rating =
        product.ratings.length > 0 ? totalScore / product.ratings.length : 0;
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al actualizar el producto");
    }
  },
  // --------------------------------------------------
  // -- Delete ------------------------------------------------

  deleteById: async function (req, res, next) {
    try {
      const product = await ProductModel.deleteOne({ _id: req.params.id });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al eliminar el producto");
    }
  },
};
