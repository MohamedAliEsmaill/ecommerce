import express from 'express';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import Product from './models/Product.mjs';
import FeaturedProducts from './models/FeaturedProducts.mjs';
import User from './models/User.mjs';



const app = express();

const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const numFakeUsers = 5;

    const fakeUsers = Array.from({ length: numFakeUsers }, () => {
        return {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            name: faker.name.fullName(),
            phone: faker.phone.number(),
            address: faker.address.streetAddress(),
            isAdmin: faker.datatype.boolean(),
            // Orders and carts will be left empty for now as they depend on other models
            carts: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
            image: faker.image.avatar(),
            gender: ['male', 'female'][faker.datatype.number({ min: 0, max: 1 })],
            orders: [{
                date: faker.date.recent(),
                user: new mongoose.Types.ObjectId(),
                products: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
                totalPrice: faker.commerce.price(),
                status: ['pending', 'accepted', 'rejected'][faker.datatype.number({ min: 0, max: 2 })]
            }],
        };
    });


    // Save the fake user to the database
    await User.insertMany(fakeUsers);
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







