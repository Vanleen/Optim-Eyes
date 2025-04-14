// backend/src/routes/aiRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import { getAIRecommendations } from '../controllers/aiRecommenderController.js';
import { diagnoseEyeHealth } from '../controllers/visionDiagnosisController.js';
import { detectFaceShape } from '../controllers/faceShapeController.js';

const router = express.Router();

// ✅ Résout le bon chemin d'upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.resolve(__dirname, '../../uploads');

// ✅ Multer configuré avec le bon dossier
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post('/recommendations', getAIRecommendations);
router.post('/diagnosis', upload.single('image'), diagnoseEyeHealth);
router.post('/detect-face-shape', upload.single('image'), detectFaceShape);

export default router;
