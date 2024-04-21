import express from "express";
import { addCart, getCart } from "../controllers/userController.mjs";
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
router.post("/all", protect, getAllProfiles);

router.get("/cart", protect, getCart);
router.post("/cart", protect, addCart);
// router.put("/cart", (req, res) => {
//   res.send("Hello User!");
// });
export default router;
