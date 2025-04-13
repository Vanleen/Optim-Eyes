import express from 'express';
import { detectFaceShape } from '../controllers/faceController.js';

const router = express.Router();

router.post('/detect', detectFaceShape);

export default router;
