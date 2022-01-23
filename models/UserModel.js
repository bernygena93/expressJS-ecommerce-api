/** @format */

const mongoose = require("../bin/mongodb");
const validators = require("../utils/validators");
const bcrypt = require("bcrypt");
const productSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "products" },
  amount: Number,
});

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "el campo es obligatorio"],
  },
  lastname: {
    type: String,
    required: [true, "el campo es obligatorio"],
  },
  username: {
    type: String,
    required: [true, "el campo es obligatorio"],
  },
  email: {
    type: String,
    unique: true,

    required: [true, "el campo es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "el campo es obligatorio"],
    validate: {
      validator: function (v) {
        return validators.isGoodPassword(v);
      },
      message: "password incorrecto",
    },
  },
  shoppingCart: [productSchema],
  shoppingHistory: [productSchema],
  favorites: [productSchema],
});

UsersSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("users", UsersSchema);
