const router = require("express").Router();
const adminAuthentication = require("../middlewares/adminAuthentication");
const { dashboardData, allOrders, allUsers } = require("../controllers/admin.controller");


router.get("/dashboard-data", adminAuthentication, dashboardData);
router.get("/getAllOrders", adminAuthentication, allOrders);
router.patch("/updateOrderStatus", adminAuthentication, allOrders);
router.get("/getAllUsers", adminAuthentication, allUsers);

module.exports = router;
