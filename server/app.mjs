import express from 'express';
import mongoose from 'mongoose';
import orderRouter from './routes/orderRouter.mjs';
import productRouter from './routes/productRouter.mjs';
import userRouter from './routes/userRouter.mjs';
import featuredProductsRouter from './routes/featuredProductsRouter.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    mongoose.connection.close();
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/featuredproducts", featuredProductsRouter);

app.listen(PORT, () => {
    console.log(`Listening on 127.0.0.1:${PORT}`);
});







