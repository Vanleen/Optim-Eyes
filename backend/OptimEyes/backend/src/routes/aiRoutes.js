import express from 'express';
import multer from 'multer';

import { getAIRecommendations } from '../controllers/aiRecommenderController.js';
import { diagnoseEyeHealth } from '../controllers/visionDiagnosisController.js';
import { detectFaceShape } from '../controllers/faceShapeController.js';

const router = express.Router();
const upload = multer({ dest: 'src/uploads/' });

router.post('/recommendations', getAIRecommendations);
router.post('/diagnosis', upload.single('image'), diagnoseEyeHealth);
router.post('/detect-face-shape', upload.single('image'), detectFaceShape);

export default router;
