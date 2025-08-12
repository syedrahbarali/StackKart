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

const updateProduct = async(req, res) => {
  try {
    
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product) {
        return res.status(404).json({message: "Product not found"});
    }

    const { name, description, price, category, brand, stock } = req.body;
    const images = req.files;

    const updatedProduct = await product.updateOne({
        name: name ? name : product.name,
        description: description ? description : product.description,
        price: price ? price : product.price,
        category: category ? category : product.category,
        brand: brand ? brand : product.brand,
        stock: stock ? stock : product.stock,
        images: images.length ? images : product.images
    });
    console.log(updatedProduct)

    if(updatedProduct.modifiedCount) {
        return res.status(200).json({message: "Product updated successfully", updatedProduct});
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }   
}

const deleteProduct = async(req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product) {
        return res.status(404).json({message: "Product not found"});
    }

    for (let i = 0; i < product.images.length; i++) {
        const result = await deleteImage(product.images[i].path);
        console.log(result);
    }

    const deletedProduct = await product.deleteOne();
    if(deletedProduct.deletedCount) {
        return res.status(200).json({message: "Product deleted successfully"});
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
}

const getProductById = async(req, res) => {
  try {
    const { productId } = req.params;
    console.log("Fetching from server")
    const product = await Product.findById(productId);

    if(!product) {
        return res.status(404).json({message: "Product not found"});
    }
    return res.status(200).json({product, ok: true});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
}

const getProductByCategory = async(req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({category});
    return res.status(200).json({products, ok: true});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
}

const getAllProducts = async(req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({products, ok: true});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
}


module.exports = { createProduct , updateProduct , deleteProduct, getProductById, getAllProducts, getProductByCategory };
