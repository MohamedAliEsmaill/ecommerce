import express from "express";
import {
  addCart,
  getCart,
  deleteCart,
  getCartSize
} from "../controllers/userController.mjs";
// import { verifyToken } from "../middleware/authJWT.mjs";
import { protect } from "../controllers/authController.mjs";
import {
  getAllProfiles,
  getProfile,
  updatePassword,
  updateProfile,
  uploadImage,
  getUsersCharts,
} from "../controllers/profileController.mjs";
import multer from "multer";

const uploadStructure = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const router = express.Router();

router.get("/view", protect, getProfile);
router.patch("/edit", protect, updateProfile);
router.patch("/password", protect, updatePassword);
router.get("/all", protect, getAllProfiles);
router.patch(
  "/updateImage",
  protect,
  uploadStructure.fields([{ name: "image", maxCount: 1 }]),
  uploadImage
);
router.get('/charts', protect, getUsersCharts);

router.get("/cart", protect, getCart);
router.post("/cart", protect, addCart);
router.post("/cart/delete", protect, deleteCart);
router.get("/cart/size", protect, getCartSize);
export default router;
