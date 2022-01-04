/** @format */

const mongoose = require("../bin/mongodb");
const imageSchema = new mongoose.Schema({ url: String });
const raitingSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.ObjectId, ref: "users" },
  score: Number,
});

const ProductsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  make: String,
  model: String,
  price: Number,
  shipping: Boolean,
  description: String,
  stock: Number,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "categories",
  },
  warranty: Number,
  rating: Number,
  ratings: [raitingSchema],
  images: [imageSchema],
});

module.exports = mongoose.model("Products", ProductsSchema);
