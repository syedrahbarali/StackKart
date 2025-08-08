const { createCategory, deleteCategory, renameCategory } = require("../controllers/category.controller");
const adminAuthentication = require("../middlewares/adminAuthentication");

const routes = require("express").Router();

routes.post("/createCategory", adminAuthentication, createCategory);
routes.delete("/deleteCategory/:id", adminAuthentication, deleteCategory);
routes.patch("/renameCategory/:id", adminAuthentication, renameCategory);

module.exports = routes;