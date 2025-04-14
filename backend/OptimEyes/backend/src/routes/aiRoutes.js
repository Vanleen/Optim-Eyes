import express from 'express';
import multer from 'multer';
import { getAIRecommendations } from '../controllers/aiRecommenderController.js';
import { diagnoseEyeHealth } from '../controllers/visionDiagnosisController.js';
import { detectFaceShape } from '../controllers/faceShapeController.js';

const router = express.Router();

// Corrige le chemin d’upload selon ton projet
const upload = multer({ dest: 'uploads/' }); // ✅ corrige ici si tu avais 'src/uploads/'

// ✅ Doit correspondre exactement au nom de champ attendu côté frontend : "image"
router.post('/diagnosis', upload.single('image'), diagnoseEyeHealth);

// ✅ Utilisation du même champ pour la détection de forme
router.post('/detect-face-shape', upload.single('image'), detectFaceShape);

router.post('/recommendations', getAIRecommendations);

export default router;
