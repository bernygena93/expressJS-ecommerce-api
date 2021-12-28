/** @format */

const ProductModel = require("../models/ProductModel");

module.exports = {
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
      const product = await ProductModel.findById(req.params.id);
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al consultar el producto");
    }
  },
  create: async function (req, res, next) {
    try {
      const product = new ProductModel({
        make: req.body.make,
        model: req.body.model,
        user: req.body.user,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        category: req.body.category,
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

  //-------------- Actualizar Producto -------------------
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

  //-------------- Eliminar un producto por su id --------
  deleteById: async function (req, res, next) {
    try {
      const product = await ProductModel.deleteOne({ _id: req.params.id });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al eliminar el producto");
    }
  },

  getFeaturedProducts: async function (req, res, next) {
    try {
      const documents = await ProductModel.find({ featured: true });
      res.status(200).json(documents);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al consultar la lista de productos");
    }
  },
};
