import express from "express";
import { addCart, getCart } from "../controllers/userController.mjs";
import { protect } from "../controllers/authController.mjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello User!");
});

router.get("/cart", protect, getCart);
router.post("/cart", protect, addCart);
// router.put("/cart", (req, res) => {
//   res.send("Hello User!");
// });
export default router;
