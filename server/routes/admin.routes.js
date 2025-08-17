const router = require("express").Router();
const adminAuthentication = require("../middlewares/adminAuthentication");
const { dashboardData, allOrders, allUsers } = require("../controllers/admin.controller");
const { uploader } = require("../utils/cloudinary");
const upload = require("../middlewares/upload");
const { updateProduct, deleteProductImage } = require("../controllers/products.controller");


router.get("/dashboard-data", adminAuthentication, dashboardData);
router.get("/getAllOrders", adminAuthentication, allOrders);
router.patch("/updateOrderStatus", adminAuthentication, allOrders);
router.get("/getAllUsers", adminAuthentication, allUsers);
router.patch("/updateProduct", adminAuthentication, upload.array("gallery", 5), updateProduct);
router.patch("/deleteProductImage", adminAuthentication, deleteProductImage);

module.exports = router;
