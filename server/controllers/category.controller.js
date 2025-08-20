const Category = require("../models/categories.model");

const createCategory = async(req,res) => {
    try {
        // TODO: Add image of Category

        const {name} = req.body;

        const category = await Category.create({name, ok: true});
        const newCategory = await category.save();

        if(newCategory?._id) {
            return res.status(201).json({message: "Category created successfully", newCategory, ok: true});
        } else {
            throw new Error("Failed to create category");
        }
    } catch (err) {
        //console.log(err.message);
        res.status(500).json({message: err.message, ok: false});
    }
}

const deleteCategory = async(req,res) => {
    try {
        const {id} = req.params;

        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }

        const deletedCategory = await category.deleteOne();
        if(deletedCategory.deletedCount) {
            return res.status(200).json({message: "Category deleted successfully"});
        }
    } catch (err) {
        //console.log(err.message);
        res.status(500).json({message: err.message});
    }
}

const renameCategory = async(req,res) => {
    try {
        const {id} = req.params;

        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }

        const {name} = req.body;
        const updatedCategory = await category.updateOne({name});
        if(updatedCategory.modifiedCount) {
            return res.status(200).json({message: "Category updated successfully"});
        }        
    } catch (err) {
        //console.log(err.message);
        res.status(500).json({message: err.message});
    }
}

const getAllCategories = async(req,res) => {
    try {
        const categories = await Category.find({}).sort({createdAt: -1});
        if(categories.length) {
            return res.status(200).json({ message: "Categories found", categories, ok: true});
        } else {
            throw new Error("No categories found");
        }
    } catch (err) {
        //(err.message);
        return res.status(500).json({message: err.message, ok: false});
    }
}

module.exports = {createCategory, deleteCategory, renameCategory, getAllCategories};