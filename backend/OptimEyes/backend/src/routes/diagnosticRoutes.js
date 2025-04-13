import express from 'express';
import { analyzeEyeImage } from '../controllers/diagnosticController.js';

const router = express.Router();

router.post('/visuel', analyzeEyeImage);

export default router;
