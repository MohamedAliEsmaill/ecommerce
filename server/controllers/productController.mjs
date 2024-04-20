import Product from "../models/Product.mjs";

/**
 * Get all products in the database paginated.
 */
export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;// Get page number, default to 1
        const limit = parseInt(req.query.limit) || 10; // Get limit per page, default to 10

        const skip = (page - 1) * limit; // Calculate documents to skip

        const products = await Product.find({})
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(); // Get total count of products

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving products' });
    }
}

/**
 * Create a new product.
 */
export const createProduct = async (req, res) => {
    const { name, desc, price, stock, images } = req.body;

    try {
        const newProduct = new Product({ name, desc, price, stock, images });
        const result = await newProduct.save();
        res.status(201).json({ message: 'Product Added Successfully', product: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product' });
    }
}

/**
 * Get a product by its ID.
 */
export const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findOne({ _id: productId });
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }

}

/**
 * Update a product.
 */
export const updateProduct = async (req, res) => {

    const productId = req.params.id;
    const updates = req.body;

    try {
        const result = await Product.updateOne({ _id: productId }, { $set: updates });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated', result: result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }

}

/**
 * Delete a product.
 */
export const deleteProduct = async (req, res) => {

    const productId = req.params.id;
    try {
        // Delete product from database
        const result = await Product.deleteOne({ _id: productId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product' });
    }

}