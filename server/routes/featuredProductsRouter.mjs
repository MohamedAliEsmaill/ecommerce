import express from "express";
import { getFeaturedProducts } from "../controllers/featuredProductsController.mjs";

const router = express.Router();

router.get("/", getFeaturedProducts);

export default router;