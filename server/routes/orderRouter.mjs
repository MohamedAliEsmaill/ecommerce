import express from "express";
import orderController from "../controllers/orderController.mjs";

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.put("/:id/accept", orderController.updateOrderToAccepted);
router.put("/:id/reject", orderController.updateOrderToRejected);
router.delete("/:id/cancel", orderController.cancelOrder);

export default router;
