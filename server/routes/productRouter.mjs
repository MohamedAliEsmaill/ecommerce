import express from "express";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers/productController.mjs';

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;