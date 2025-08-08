const { createProduct } = require("../controllers/products.controller");
const multer = require("multer");
// const upload =  multer({dest: "uploads/"});
const upload = require("../utils/upload");
const routes = require("express").Router();

routes.post("/createProduct", upload.array("gallery", 5), createProduct);

module.exports = routes