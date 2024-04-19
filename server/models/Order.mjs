import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true,
    },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;