import express from "express";
import {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrderToAccepted,
  updateOrderToRejected,
  deleteOrder,
} from "../controllers/ordersController.mjs";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.put("/:id/accept", updateOrderToAccepted);
router.put("/:id/reject", updateOrderToRejected);
router.delete("/:id/cancel", deleteOrder);

export default router;
