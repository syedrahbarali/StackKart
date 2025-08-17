const mongoose = require("mongoose");
const slugify = require("slugify");

const categoryModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

categoryModel.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Category", categoryModel);
