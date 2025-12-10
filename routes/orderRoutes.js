import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", authMiddleware, getOrders);

export default router;


