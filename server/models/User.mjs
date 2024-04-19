import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});



const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String, required: true },
    address: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    // TODO - todo note orders and carts logic
    orders: [orderSchema],
    carts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    image: { type: String, default: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png' },
    gender: { type: String, enum: ['male', 'female'] }
});



const User = mongoose.model('User', userSchema);
export default User;