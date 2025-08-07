const mongoose = require("mongoose");

const productModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    ref: "Category",
    type: mongoose.Schema.Types.ObjectId,
  },
  brand: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  images: {
    type: Array,
    require: true,
  },
  ratings: {
    ref: "Reviews",
    type: [mongoose.Schema.Types.ObjectId],
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productModel);