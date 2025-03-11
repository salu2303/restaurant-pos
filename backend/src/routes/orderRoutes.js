import express from "express";
import {
    getOrders,
    createOrder,
    updateOrderStatus,
    getOrdersBy
} from "../controllers/orderController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Ensure role names match those in the `roles` table
router.get("/", protect, authorize(["Admin", "Cashier", "Waiter"]), getOrdersBy);
// router.get("/", protect, authorize(["Admin", "Cashier", "Waiter"]), getOrders);
router.post("/", protect, authorize(["Waiter"]), createOrder);
router.put("/:id", protect, authorize(["Admin", "Cashier", "Waiter"]), updateOrderStatus);


export default router;
