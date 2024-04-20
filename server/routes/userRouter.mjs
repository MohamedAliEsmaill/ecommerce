import express from "express";
import { addCart , getCart } from "../controllers/userController.mjs";
import { verifyToken } from "../middleware/authJWT.mjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello User!");
});

router.get("/cart", verifyToken, getCart)
router.post("/cart", verifyToken, addCart);
// router.put("/cart", (req, res) => {
//   res.send("Hello User!");
// });
export default router;
