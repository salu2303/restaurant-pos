import express from "express";
import {
    getOrders,
    createOrder,
    updateOrderStatus,
    getOrdersBy,
    completeOrder,
    getCompletedOrdersCount,
    fetchOrderStats 
} from "../controllers/orderController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Ensure role names match those in the `roles` table
router.get("/", getOrdersBy);
// router.get("/", protect, authorize(["Admin", "Cashier", "Waiter"]), getOrders);
router.post("/", createOrder);
router.put("/:id", protect, authorize(["Admin", "Cashier", "Waiter"]), updateOrderStatus);
router.post('/complete-payment', completeOrder); 
router.get('/completeordercount', getCompletedOrdersCount); 
router.get('/order-stats', fetchOrderStats); 
export default router;
