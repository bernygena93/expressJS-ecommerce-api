/** @format */

const mongoose = require("../bin/mongodb");
const imageSchema = new mongoose.Schema({ url: String });

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
  images: [imageSchema],
});

module.exports = mongoose.model("Products", ProductsSchema);
