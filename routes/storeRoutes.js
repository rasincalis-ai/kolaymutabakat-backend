import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getStores, addStore, updateStore, deleteStore } from "../controllers/storeController.js";

const router = express.Router();

router.get("/", authMiddleware, getStores);
router.post("/", authMiddleware, addStore);
router.put("/:id", authMiddleware, updateStore);
router.delete("/:id", authMiddleware, deleteStore);

export default router;

