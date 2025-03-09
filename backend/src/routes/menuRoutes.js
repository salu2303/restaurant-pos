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
router.post("/", protect, authorize(["Admin", "cashier"]), addMenuItem);
// router.put("/:id", protect, authorize(["Admin", "cashier"]), updateMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", protect, authorize(["Admin"]), deleteMenuItem);

export default router;
