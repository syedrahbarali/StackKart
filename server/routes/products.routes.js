const { createProduct, updateProduct, deleteProduct } = require("../controllers/products.controller");
const multer = require("multer");
const upload = require("../middlewares/upload");
const authentication = require("../middlewares/authentication");
const adminAuthentication = require("../middlewares/adminAuthentication");
const routes = require("express").Router();

routes.post("/createProduct", adminAuthentication, upload.array("gallery", 5), createProduct);
routes.patch("/updateProduct/:id", adminAuthentication,  upload.array("gallery", 5), updateProduct);
routes.delete("/deleteProduct/:id", adminAuthentication, deleteProduct);

module.exports = routes;