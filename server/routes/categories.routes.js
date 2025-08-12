const { createCategory, deleteCategory, renameCategory, getAllCategories } = require("../controllers/category.controller");
const adminAuthentication = require("../middlewares/adminAuthentication");

const routes = require("express").Router();

routes.get("/getAllCategories", getAllCategories);
routes.post("/createCategory", adminAuthentication, createCategory);
routes.delete("/deleteCategory/:id", adminAuthentication, deleteCategory);
routes.patch("/renameCategory/:id", adminAuthentication, renameCategory);

module.exports = routes;