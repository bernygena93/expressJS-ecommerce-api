/** @format */

const mongoose = require("../bin/mongodb");
const validators = require("../utils/validators");
const bcrypt = require("bcrypt");

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
  shoppingCart: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "categories",
    },
  ],
  shoppingHistory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "categories",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "categories",
    },
  ],
});

UsersSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("Users", UsersSchema);
