const {
  addToCart,
  updateItemInCart,
  deleteFromCart,
  clearCart,
} = require("../controllers/cart.controller");
const {
  createOrder,
  updateOrder,
  cancelOrder,
  getAllOrders,
} = require("../controllers/order.controller");
const authentication = require("../middlewares/authentication");

const routes = require("express").Router();

routes.get("/getAllOrders", authentication, getAllOrders);
routes.post("/createOrder", authentication, createOrder);
routes.patch("/updateOrder", authentication, updateOrder);
routes.patch("/cancelOrder/:orderId", authentication, cancelOrder);

routes.patch("/addToCart", authentication, addToCart);
routes.delete("/deleteFromCart/:itemId", authentication, deleteFromCart);
routes.patch("/updateItemInCart/:itemId", authentication, updateItemInCart);
routes.patch("/clearCart", authentication,clearCart);

module.exports = routes;
