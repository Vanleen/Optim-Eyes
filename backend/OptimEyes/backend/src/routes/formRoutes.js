// backend/src/routes/formRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import { createForm, getFormById, getAllForms } from "../controllers/formController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 📂 Configuration Multer pour stocker le fichier
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // dossier relatif à la racine du projet
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 Mo
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error("Type de fichier non supporté (PDF, JPG, PNG uniquement)"));
  },
});

// 🛠 Route POST avec gestion de fichier
router.post("/", upload.single("prescriptionFile"), createForm);

// GET routes
router.get("/all", protect, isAdmin, getAllForms);
router.get("/:id", getFormById);

export default router;
