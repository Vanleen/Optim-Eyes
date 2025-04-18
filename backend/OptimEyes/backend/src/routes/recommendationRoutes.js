import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPreferences,
  getPreferences
} from '../controllers/recommendationController.js';

const router = express.Router();

// Toutes les routes ci‑dessous nécessitent un JWT valide
router.use(protect);

// Enregistrer ou mettre à jour les préférences
//   POST /api/recommendations
router.post('/', createPreferences);

// Récupérer les recommandations
//   GET  /api/recommendations
router.get('/', getPreferences);

export default router;
