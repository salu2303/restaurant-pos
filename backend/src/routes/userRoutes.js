import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";
import { getServers } from "../controllers/userController.js";
import { addServer } from "../controllers/userController.js";
import { updateServer } from "../controllers/userController.js";
import { deleteServer } from "../controllers/userController.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",protect, getUserProfile);
router.get("/servers", protect, authorize(["Admin"]), getServers);
router.post("/servers", protect, authorize(["Admin"]), addServer);
router.put("/servers/:id", protect, authorize(["Admin"]), updateServer);
router.delete("/servers/:id", protect, authorize(["Admin"]), deleteServer);

export default router;
