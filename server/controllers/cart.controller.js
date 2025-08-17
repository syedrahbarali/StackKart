const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { product, quantity } = req.body;

    if (!product) {
      return res
        .status(400)
        .json({ message: "Product and quantity are required", ok: false });
    }

    const existingCartItem = await Cart.findOne({
      $and: [
        { userId: new mongoose.Types.ObjectId(`${_id}`) },
        { product: new mongoose.Types.ObjectId(`${product}`) },
      ],
    });

    if (existingCartItem?._id) {
      await Cart.updateOne(
        { _id: new mongoose.Types.ObjectId(`${existingCartItem._id}`) },
        { $inc: { quantity: quantity } },
        { new: true }
      );

      return res.status(200).json({ message: "Added", ok: true });
    }

    // if product not in cart, add it
    const cartItem = new Cart({
      userId: new mongoose.Types.ObjectId(`${_id}`),
      product: new mongoose.Types.ObjectId(`${product}`),
      quantity,
    });
    const savedItemToCart = await cartItem.save();

    await User.updateOne(
      { _id: new mongoose.Types.ObjectId(`${_id}`) },
      { $push: { cart: new mongoose.Types.ObjectId(`${savedItemToCart._id}`) } }
    );

    return res
      .status(201)
      .json({ message: "Product Added", newItem: savedItemToCart, ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, ok: false });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { itemId } = req.params;

    // check if item exists in cart
    const itemDoesExist = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(`${_id}`),
      product: new mongoose.Types.ObjectId(`${itemId}`),
    });

    if (!itemDoesExist?._id) {
      return res.status(400).json({ message: "Item not found", ok: false });
    }

    // delete item from cart
    await Cart.deleteOne({ _id: itemDoesExist._id });

    // remove item from user's cart array
    await User.updateOne(
      { _id: new mongoose.Types.ObjectId(`${_id}`) },
      { $pull: { cart: new mongoose.Types.ObjectId(`${itemDoesExist._id}`) } }
    );

    return res.status(200).json({ message: "Item removed", ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateItemInCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { item } = req.body;

    await Cart.updateOne({ _id: itemId }, { $set: { item } }).then(
      (updatedCartItem) => {
        return res.status(200).json({
          message: "Item updated successfully",
          updatedCartItem,
          ok: true,
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addToCart, deleteFromCart, updateItemInCart };
