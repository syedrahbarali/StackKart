const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    country: String,
    state: String,
    city: String,
    street: String,
    zip: String,
  },
  orders: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    default: [],
  },
  cart: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      }
    ],
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userModel);
