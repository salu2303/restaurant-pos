const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, default: "" }
});

module.exports = mongoose.model("Menu", menuSchema);
