import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: {
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
    },
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
