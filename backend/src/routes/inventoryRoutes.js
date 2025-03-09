import express from "express";
import {
    getInventoryItems,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
} from "../controllers/inventoryController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize(["Admin", "chef"]), getInventoryItems);
router.post("/", protect, authorize(["Admin"]), addInventoryItem);
router.put("/:id", protect, authorize(["Admin", "chef"]), updateInventoryItem);
router.delete("/:id", protect, authorize(["Admin"]), deleteInventoryItem);

export default router;
