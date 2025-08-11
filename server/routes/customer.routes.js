const { addToCart, removeFromCart, updateItemInCart } = require("../controllers/cart.controller");
const { createOrder, updateOrder, cancelOrder } = require("../controllers/order.controller");
const authentication = require("../middlewares/authentication");

const routes = require("express").Router();

routes.post("/createOrder", authentication, createOrder);
routes.patch("/updateOrder", authentication, updateOrder);
routes.patch("/cancelOrder/:orderId", authentication, cancelOrder);

routes.patch("/addToCart", authentication, addToCart);
routes.patch("/removeFromCart/:_id", authentication, removeFromCart); // Not working
routes.patch("/updateItemInCart/:itemId", authentication, updateItemInCart);

module.exports = routes;