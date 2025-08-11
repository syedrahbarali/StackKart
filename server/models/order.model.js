const mongoose = require("mongoose");

const orderModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity:{
            type: Number,
            default: 1
        }
    },
    shippingAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Card", "UPI"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending"
    },
    deliveryStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing"
    },
    orderedAt: {
        type: Date,
        default: Date.now
    },
    deliveryAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Order", orderModel);