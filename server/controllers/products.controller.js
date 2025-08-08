const Product = require("../models/product.model");
const deleteImage = require("../utils/deleteImage");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock } = req.body;
    const images = req.files;
    console.log(images);

    if (
      !name.trim() ||
      !description.trim() ||
      !price ||
      !category.trim() ||
      !brand.trim() ||
      !stock ||
      !images.length
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
    });
    const newProduct = await product.save();

    if (newProduct?._id) {
      return res
        .status(201)
        .json({ message: "Product created successfully", newProduct });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProduct };
