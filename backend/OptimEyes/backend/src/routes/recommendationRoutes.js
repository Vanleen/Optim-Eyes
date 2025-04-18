// backend/src/routes/recommendationRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPreferences,
  getPreferences
} from '../controllers/recommendationController.js';

const router = express.Router();

router.use(protect);

// Enregistrer / upsert des prefs
// POST /api/recommendations
router.post('/', createPreferences);

// Récupérer pour l’utilisateur courant
// GET  /api/recommendations
router.get('/', getPreferences);

// (optionnel) Récupérer par userId passé en param
// GET  /api/recommendations/:userId
router.get('/:userId', getPreferences);

export default router;
