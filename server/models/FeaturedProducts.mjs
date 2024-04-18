import mongoose from 'mongoose';


const featuredProductsSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const FeaturedProducts = mongoose.model('FeaturedProducts', featuredProductsSchema);
export default FeaturedProducts;