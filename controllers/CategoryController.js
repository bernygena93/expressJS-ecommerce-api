/** @format */

const Category = require("../models/CategoryModel");
module.exports = {
  create: async function (req, res, next) {
    try {
      console.log(req.body);
      console.log(req.body.name);
      const document = new Category({
        name: req.body.name,
      });

      const response = await document.save();

      res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e);
      console.log("error", e);
      next(e);
    }
  },

  getAll: async function (req, res, next) {
    try {
      const categories = await categoryModel.find();
      res.status(200).json(categories);
    } catch (e) {
      res.status(500).json(e);
      console.log("error", e);
      next(e);
    }
  },
};
