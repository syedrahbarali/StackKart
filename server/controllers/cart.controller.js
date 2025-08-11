const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    const { item } = req.body;
    const cartItem = new Cart({ userId: _id, item });

    await cartItem.save().then(async (savedItemToCart) => {
      user.cart.push(savedItemToCart._id);

      await user
        .save()
        .then((updatedUser) => {
          return res
            .status(201)
            .json({ message: "Item added to cart successfully", ok: true });
        })

        .catch(async (err) => {
          await cartItem.remove().then(() => {
            return res.status(500).json({ message: err.message });
          });
        });
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error: " + err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { itemId } = req.params;

    // FIX: removing from cart is not working
    await Cart.updateOne({_id}, {$pull: {cart: new mongoose.Types.ObjectId(itemId)}}).then(resp => {
      return res.status(200).json({message: "Item removed from cart successfully", ok: true});
    })
    

    
  } catch (err) {
    return res.status(500).json({ message: "Server Error: " + err.message });
  }
};

const updateItemInCart = async(req, res) => {
  try {
    const {itemId} = req.params;
    const {item} = req.body;

    await Cart.updateOne({_id: itemId}, {$set: {item}}).then(updatedCartItem => {
      return res.status(200).json({message: "Item updated successfully", updatedCartItem, ok: true});
    })

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
}

module.exports = { addToCart, removeFromCart, updateItemInCart };
