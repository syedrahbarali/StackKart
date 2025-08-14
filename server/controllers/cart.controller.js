const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    // TODO: if same product added again, increment quantity count
    const { _id } = req.user;
    const { product, quantity } = req.body;

    if (!product) {
      console.log("Product and quantity are required");
      return res.status(400).json({ message: "Product and quantity are required", ok:false });
    }

    const user = await User.findById({_id});
    console.log(user);
    if (!user?._id) {
      return res.status(404).json({ message: "User not found", ok:false });
    }

    const cartItem = new Cart({ userId: _id, product, quantity });
    const savedItemToCart = await cartItem.save();

    user.cart.push(savedItemToCart._id);
    await user.save();

    return res.status(201).json({ message: "Product Added", newItem: savedItemToCart, ok: true });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server Error: " + err.message, ok: false });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { itemId } = req.params;

    // FIX: removing from cart is not working
    await Cart.updateOne(
      { _id },
      { $pull: { cart: new mongoose.Types.ObjectId(itemId) } }
    ).then((resp) => {
      return res
        .status(200)
        .json({ message: "Item removed from cart successfully", ok: true });
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error: " + err.message });
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

module.exports = { addToCart, removeFromCart, updateItemInCart };
