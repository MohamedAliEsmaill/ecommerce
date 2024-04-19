import mongoose from 'mongoose';
// Define your schema
const ProductSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        default: "No description provided",
    },
    stock: {
        type: Number,
        required: true,
    },
    images: {
        type: [String], // Define images as an array of strings
    },
});

// Create a model
const Product = mongoose.model('Product', ProductSchema);
export default Product;



