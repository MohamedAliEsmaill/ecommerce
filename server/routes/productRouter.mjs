import express from "express";
import { getAllProducts, createProduct, getProductId, updateProduct, deleteProduct } from '../controllers/productController.mjs';

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductId);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;