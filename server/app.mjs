import express from 'express';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import Product from './models/Product.mjs';
import FeaturedProducts from './models/FeaturedProducts.mjs';
import User from './models/User.mjs';
import Order from './models/Order.mjs';


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


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Listening on 127.0.0.1:${PORT}`);
});







