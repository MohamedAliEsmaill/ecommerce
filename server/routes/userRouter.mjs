import express from "express";
import { addCart, getCart, deleteCart } from "../controllers/userController.mjs";
// import { verifyToken } from "../middleware/authJWT.mjs";
import { protect } from "../controllers/authController.mjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello User!");
});

router.get("/cart", protect, getCart);
router.post("/cart", protect, addCart);
router.post("/cart/delete", protect, deleteCart);
export default router;
