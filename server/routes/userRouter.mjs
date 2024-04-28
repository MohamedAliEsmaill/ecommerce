import express from "express";
import {
  addCart,
  getCart,
  deleteCart,
  getCartSize,
  uploadImage,
} from "../controllers/userController.mjs";
// import { verifyToken } from "../middleware/authJWT.mjs";
import { protect } from "../controllers/authController.mjs";
import {
  getAllProfiles,
  getProfile,
  updatePassword,
  updateProfile,
} from "../controllers/profileController.mjs";
import multer from "multer";

// to upload images in folder call "uploads"
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/view", protect, getProfile);
router.patch("/edit", protect, updateProfile);
router.patch("/password", protect, updatePassword);
router.post("/all", protect, getAllProfiles);
router.post(
  "/uploadImage",
  protect,
  upload.fields([{ name: "image", maxCount: 1 }]),
  uploadImage
);
router.get("/cart", protect, getCart);
router.post("/cart", protect, addCart);
router.post("/cart/delete", protect, deleteCart);
router.get("/cart/size", protect, getCartSize);
export default router;
