// backend/src/routes/formRoutes.js
import express from "express";
import { createForm, getFormById, getAllForms } from "../controllers/formController.js";
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post("/", createForm);
router.get("/all", getAllForms); // 👉 Cette ligne DOIT être avant `/:id`
router.get("/:id", getFormById);
router.get('/all', protect, isAdmin, getAllForms);

export default router;
