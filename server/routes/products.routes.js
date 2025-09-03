const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getAllProducts,
  getProductById,
  getRelatedProducts,
  updateStocks,
} = require("../controllers/products.controller");
const upload = require("../middlewares/upload");
const adminAuthentication = require("../middlewares/adminAuthentication");
const authentication = require("../middlewares/authentication");
const routes = require("express").Router();

routes.get("/getAllProducts", getAllProducts);
routes.get("/getRelatedProduct/:productId", getRelatedProducts);
routes.get("/getProductById/:productId", getProductById);
routes.get("/getProductByCategory/:category", getProductByCategory);
routes.patch("/updateStocks", authentication, updateStocks);

routes.post(
  "/createProduct",
  adminAuthentication,
  upload.array("gallery", 5),
  createProduct
);

routes.patch(
  "/updateProduct/:id",
  adminAuthentication,
  upload.array("gallery", 5),
  updateProduct
);

routes.delete("/deleteProduct/:id", adminAuthentication, deleteProduct);

module.exports = routes;
