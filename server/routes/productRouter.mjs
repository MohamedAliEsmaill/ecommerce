import express from "express";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, decreaseProductStock, getProductCountByBrand } from '../controllers/productController.mjs';

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get('/product-counts-by-brand', getProductCountByBrand);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/decrease-stock", decreaseProductStock);


export default router;