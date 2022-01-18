/** @format */

const mongoose = require("../bin/mongodb");
const imageSchema = new mongoose.Schema({ url: String });
const logoSchema = new mongoose.Schema({ url: String });

const BrandSchema = new mongoose.Schema({
  name: String,
  logo: [logoSchema],
  image: [imageSchema],
});

BrandSchema.statics.findBydIdAndValidate = async function (id) {
  const document = await this.findById(id);
  if (!document) {
    return {
      error: true,
      message: "No existe esa Marca",
    };
  }
  return document;
};
module.exports = mongoose.model("brands", BrandSchema);
