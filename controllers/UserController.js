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
          status: "Success",
          message: "Login Ok",
          token: token,
          user: {
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            shoppingCart: user.shoppingCart,
            shoppingHistory: user.shoppingHistory,
            favorites: user.favorites,
          },
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
        req.body.shoppingCart.map((product) => {
          shoppingCart.push(product);
        })
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
        req.body.shoppingHistory.map((product) => {
          shoppingHistory.push(product);
        })
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
        req.body.favorites.map((product) => {
          favorites.push(product);
        })
      );
      res.status(200).json(req.body.favorites);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
