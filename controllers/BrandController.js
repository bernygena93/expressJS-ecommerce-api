/** @format */

const BrandModel = require("../models/BrandModel");
module.exports = {
  create: async function (req, res, next) {
    try {
      const document = new BrandModel({
        name: req.body.name,
        logo: req.body.logo,
        image: req.body.image,
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
      const brands = await BrandModel.find();
      res.status(200).json(brands);
    } catch (e) {
      res.status(500).json(e);
      console.log("error", e);
      next(e);
    }
  },
};
