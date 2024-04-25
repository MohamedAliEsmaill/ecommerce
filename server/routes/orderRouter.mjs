import express from "express";
import {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrderToAccepted,
  updateOrderToRejected,
  deleteOrder,
} from "../controllers/ordersController.mjs";
import { restrictTo } from "../controllers/authController.mjs";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.put("/:id/accept", restrictTo("admin"), updateOrderToAccepted);
router.put("/:id/reject", restrictTo("admin"), updateOrderToRejected);
router.delete("/:id/cancel", restrictTo("admin"), deleteOrder);

export default router;
