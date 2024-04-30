import express from "express";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, decreaseProductStock, getProductCountByBrand, uploadProductImage } from '../controllers/productController.mjs';
import multer from "multer";
import { protect } from "../controllers/authController.mjs";

const router = express.Router();

const uploadStructure = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

router.get("/", getAllProducts);
router.post("/", protect, createProduct);
router.get('/product-counts-by-brand', getProductCountByBrand);
router.get("/:id", getProductById);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.post("/decrease-stock", decreaseProductStock);

router.patch(
    "/updateImage",
    protect,
    uploadStructure.fields([{ name: "images", maxCount: 5 }]),
    uploadProductImage
);

export default router;