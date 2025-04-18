import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPreferences,
  getPreferences
} from '../controllers/recommendationController.js';

const router = express.Router();

// Protéger ces routes par JWT
router.use(protect);

// Enregistrer les préférences
router.post('/', createPreferences);

// Récupérer les recommandations pour un user
router.get('/:userId', getPreferences);

export default router;
