import express from "express";
import {
  addCart,
  getCart,
  deleteCart,
} from "../controllers/userController.mjs";
// import { verifyToken } from "../middleware/authJWT.mjs";
import { protect } from "../controllers/authController.mjs";
import {
  getAllProfiles,
  getProfile,
  updatePassword,
  updateProfile,
} from "../controllers/profileController.mjs";

const router = express.Router();

router.post("/view", protect, getProfile);
router.patch("/edit", protect, updateProfile);
router.patch("/password", protect, updatePassword);
router.get("/all", protect, getAllProfiles);

router.get("/cart", protect, getCart);
router.post("/cart", protect, addCart);
router.post("/cart/delete", protect, deleteCart);
export default router;
