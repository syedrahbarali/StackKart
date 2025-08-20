const { default: mongoose } = require("mongoose");
const Order = require("../models/order.model");
const User = require("../models/user.model");

const getAllOrders = async (req, res) => {
  try {
    const { _id } = req.user;
    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(`${_id}`),
    }).populate({ path: "items.productId" });
    //console.log("Orders: ", orders);
    return res.status(200).json({ orders, ok: true });
  } catch (err) {
    //console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const { items, shippingDetails, stripePaymentIntentId, totalAmount } =
      req.body;

    const newOrder = new Order({
      userId: _id,
      items,
      totalAmount,
      shippingDetails,
      stripePaymentIntentId,
    });

    const order = await newOrder.save();

    if (order?._id) {
      await User.updateOne(
        { _id: new mongoose.Types.ObjectId(`${_id}`) },
        { $push: { orders: order._id } },
        { upsert: true }
      );

      return res.status(201).json({
        message: "Order Created",
        newOrder: order,
        ok: true,
      });
    } else {
      return res.status(400).json({ message: "Order creation failed", ok: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const {
      orderId,
      paymentStatus,
      paymentMethod,
      stripeChargeId = "",
    } = req.body;

    console.log("orderId: ", orderId);
    console.log("Type of paymentStatus: ", typeof paymentStatus, paymentStatus);
    console.log("Type of paymentMethod: ", typeof paymentMethod, paymentMethod);
    console.log(
      "Type of stripeChargeId: ",
      typeof stripeChargeId,
      stripeChargeId
    );

    return await Order.updateOne(
      { _id: new mongoose.Types.ObjectId(`${orderId}`) },
      { $set: { paymentStatus, paymentMethod, stripeChargeId } },
      { new: true }
    ).then((updatedOrder) => {
      return res.status(200).json({
        message: "Updated",
        updatedOrder,
        ok: true,
      });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    return await Order.updateOne(
      { _id: new mongoose.Types.ObjectId(`${orderId}`) },
      { $set: { deliveryStatus: "Cancelled" } }
    ).then(() => {
      return res.status(200).json({
        message: "Cancelled",
        ok: true,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllOrders, createOrder, updateOrder, cancelOrder };
