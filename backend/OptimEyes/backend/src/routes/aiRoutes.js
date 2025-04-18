// backend/src/routes/aiRoutes.js

import express from 'express';
import multer  from 'multer';
import path    from 'path';
import { fileURLToPath } from 'url';

import { protect }            from '../middleware/authMiddleware.js';
import { getAIRecommendations } from '../controllers/aiRecommenderController.js';
import { diagnoseEyeHealth }  from '../controllers/visionDiagnosisController.js';
import { detectFaceShape }    from '../controllers/faceShapeController.js';

const router = express.Router();

// ✅ Applique d’abord la protection JWT à **toutes** les routes AI
router.use(protect);

// ✅ Configuration Multer pour image upload (pour tes endpoints image-based)
const __filename   = fileURLToPath(import.meta.url);
const __dirname    = path.dirname(__filename);
const uploadPath   = path.resolve(__dirname, '../../uploads');
const storage      = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${Math.random()*1e9}`)
});
const upload       = multer({ storage });

// ────────────────
// 1) Recommandations « LOGIQUE » (profil → scoring)
//    POST /api/ai/recommendations
router.post('/recommendations', getAIRecommendations);

// 2) Diagnostic vision (upload image)
//    POST /api/ai/diagnosis
router.post('/diagnosis', upload.single('image'), diagnoseEyeHealth);

// 3) Détection forme visage (upload image)
//    POST /api/ai/detect-face-shape
router.post('/detect-face-shape', upload.single('image'), detectFaceShape);

// Exporte le router
export default router;
