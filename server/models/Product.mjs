import mongoose from "mongoose";
// Define your schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"], // Custom error message
    unique: true,
    trim: true, // Trim whitespace from beginning and end
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Product price must be 0 or greater"], // Ensure non-negative price
  },
  desc: {
    type: String,
    default: "No description provided",
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Product stock must be 0 or greater"], // Ensure non-negative stock
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    }, // Ensure stock is an integer
  },
  images: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: "Please provide at least one image URL",
    }, // Ensure at least one image URL is provided
  },
  brand: {
    type: String,
    required: [true, "Product brand is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true,
  },
  size: {
    type: [String],
    required: [true, "Product size is required"],
    validate: {
      validator: (v) => Array.isArray(v) && v.every((size) => ["S", "M", "L", "XL", "XXL"].includes(size)),
      message: "Invalid size(s) provided. Allowed values: S, M, L, XL, XXL",
    },
  },
  colors: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: "Please provide at least one color",
    },
  },
});

// Create a model
const Product = mongoose.model("Product", ProductSchema);
export default Product;
