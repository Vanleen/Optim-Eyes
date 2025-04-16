// backend/src/routes/formRoutes.js
import express from "express";
import { createForm, getFormById, getAllForms } from "../controllers/formController.js";

const router = express.Router();

router.post("/", createForm);
router.get("/all", getAllForms); // 👉 Cette ligne DOIT être avant `/:id`
router.get("/:id", getFormById);

export default router;
