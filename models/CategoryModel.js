/** @format */

const mongoose = require("../bin/mongodb");

const CategorySchema = new mongoose.Schema({
  name: String,
});
CategorySchema.statics.findBydIdAndValidate = async function (id) {
  const document = await this.findById(id);
  if (!document) {
    return {
      error: true,
      message: "No existe categoria",
    };
  }
  return document;
};
module.exports = mongoose.model("categories", CategorySchema);
