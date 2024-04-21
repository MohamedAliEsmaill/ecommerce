import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.mjs";
import appError from "./utils/appError.mjs";
import { protect } from "./controllers/authController.mjs";
import { faker } from "@faker-js/faker";
import Product from "./models/Product.mjs";
import FeaturedProducts from "./models/FeaturedProducts.mjs";
import User from "./models/User.mjs";
import Order from "./models/Order.mjs";
import userRouter from "./routes/userRouter.mjs";
import orderRouter from "./routes/orderRouter.mjs";
import productRouter from "./routes/productRouter.mjs";
import featuredProductsRouter from "./routes/featuredProductsRouter.mjs";

process.on("uncaughtException", (err) => {
  console.log("uncaught exception ... shutting down");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", authRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", protect, orderRouter);
app.use("/api/products", productRouter);
app.use("/api/featuredproducts", featuredProductsRouter);

app.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});

app.all("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`));
});

// HANDLE UNHANDLED REJECTED PROMISES
process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection ... shutting down");
  console.log(err.name, err.message);
  // 0 : success , 1 : uncaught exception
  server.close(() => {
    process.exit(1);
  });
});
