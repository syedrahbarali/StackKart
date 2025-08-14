const router = require("express").Router();
const adminAuthentication = require("../middlewares/adminAuthentication");
const { dashboardData } = require("../controllers/admin.controller");


router.get("/dashboard-data", adminAuthentication, dashboardData);

module.exports = router;
