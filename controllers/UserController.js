/** @format */

const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async function (req, res, next) {
    try {
      const user = new UserModel({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const document = await user.save();
      res.status(200).json(document);
    } catch (e) {
      res.status(500).json(e);
      console.log(e, "error al crear el usuario");
    }
  },
  signIn: async function (req, res, next) {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        res.json({ error: true, message: "Email incorrecto" });
        return;
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, req.app.get("secretKey"), {
          expiresIn: 7600,
        });
        res.status(200).json({
          error: false,
          message: "Login Ok",
          token: token,
          user: user,
        });
        return;
      } else {
        res.json({ error: true, message: "Contraseña incorrecto" });
        return;
      }
    } catch (e) {
      if (e.message) {
        res.status(500).json({ status: "error", mensaje: e.message });
        return;
      }
      next(e);
    }
  },
  addToCart: async function (req, res, next) {
    try {
      const user = await UserModel.updateOne(
        { _id: req.params.id },
        user.shoppingCart.push(req.body.shoppingCart)
      );
      res.status(200).json(req.body.shoppingCart);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  addToShopHistory: async function (req, res, next) {
    try {
      const user = await UserModel.updateOne(
        { _id: req.params.id },
        user.shoppingHistory.push(req.body.shoppingHistory)
      );
      res.status(200).json(req.body.shoppingHistory);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  addToFavourites: async function (req, res, next) {
    try {
      const user = await UserModel.updateOne(
        { _id: req.params.id },
        user.favourites.push(req.body.favourites)
      );
      res.status(200).json(req.body.favourites);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
