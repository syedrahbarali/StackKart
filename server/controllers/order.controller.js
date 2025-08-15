const Order = require("../models/order.model");
const User = require("../models/user.model");

const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const { items, shippingAddress, paymentMethod } = req.body;

    const totalAmount = items.reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0);

    const newOrder = new Order({
      userId: _id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    const order = await newOrder.save();
    console.log("Created order: ", order);

    if (order?._id) {
      const user = await User.findById(_id);
      user.orders.push(order._id);

      await user.save().then((modifiedUser) => {
        console.log("Modified user: ", modifiedUser);
        return res
          .status(201)
          .json({ message: "Order created successfully", order });
      });
    } else {
      return res.status(400).json({ message: "Order creation failed" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async(req, res) => {
  try {
    const {orderId,items, shippingAddress} = req.body;

    await Order.updateOne({_id: orderId}, {$set: {items, shippingAddress}}).then((updatedOrder) => {
      return res.status(200).json({message: "Order updated successfully", updatedOrder, ok: true});
    })
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
}

const cancelOrder = async(req, res) => {
  try {
    const {orderId} = req.params;
    await Order.updateOne({_id: orderId}, {$set: {deliveryStatus: "Cancelled"}}).then(cancelledOrder => {
      return res.status(200).json({message: "Order cancelled successfully", cancelledOrder, ok: true});
    })
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
}

module.exports = { createOrder, updateOrder, cancelOrder };
