const routes = require("express").Router();
const {
    createPaymentIntent,
    getPaymentIntent,
} = require("../controllers/stripe.controller");

routes.get("/test", (req,res) => res.send("test"));
routes.post("/create-payment-intent", createPaymentIntent);
routes.get("/get-payment-intent/:paymentIntentId", getPaymentIntent); 

module.exports = routes;