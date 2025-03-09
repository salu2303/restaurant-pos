import express from "express";
import {
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} from "../controllers/menuController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMenuItems);
router.post("/", protect, authorize(["admin", "cashier"]), addMenuItem);
router.put("/:id", protect, authorize(["admin", "cashier"]), updateMenuItem);
router.delete("/:id", protect, authorize(["admin"]), deleteMenuItem);

export default router;
