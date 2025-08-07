const mongoose = require("mongoose");

const reviewModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  productId: {
    ref: "Product",
    type: mongoose.Schema.Types.ObjectId,
  },
  rating: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
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

module.exports = mongoose.model("Review", reviewModel);