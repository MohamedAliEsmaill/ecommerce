import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "fullname not provided "],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  phone: { type: String, required: true },
  address: { type: String },
  isAdmin: { type: Boolean, required: true, default: false },
  // TODO - todo note orders and carts logic
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  image: {
    type: String,
    default:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png",
  },
  gender: { type: String, enum: ["male", "female"] },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
