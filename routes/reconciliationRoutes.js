import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getReconciliation } from "../controllers/reconciliationController.js";

const router = express.Router();

router.get("/", authMiddleware, getReconciliation);

export default router;


