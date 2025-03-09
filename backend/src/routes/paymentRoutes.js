import express from "express";
import {
    getPayments,
    addPayment,
    getPaymentByOrder
} from "../controllers/paymentController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.get("/", getPayments);
router.get("/", protect,authorize(["Admin", "cashier"]), getPayments);
router.post("/", protect, authorize(["Admin","cashier"]), addPayment);
router.get("/:order_id", protect, authorize(["Admin", "cashier"]), getPaymentByOrder);

export default router;
