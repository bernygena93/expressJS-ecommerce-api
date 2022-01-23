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
      const user = await UserModel.findOne({ email: req.body.email })
        .populate({
          path: "shoppingCart",
          populate: {
            path: "product",
            model: "products",
          },
        })
        .populate({
          path: "favorites",
          populate: {
            path: "product",
            model: "products",
          },
        });
      if (!user) {
        res.json({ error: true, message: "Email incorrecto" });
        return;
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, req.app.get("secretKey"), {
          expiresIn: "1h",
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
  update: async function (req, res, next) {
    try {
      console.log(req.body);
      const user = await UserModel.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json(req.body);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
