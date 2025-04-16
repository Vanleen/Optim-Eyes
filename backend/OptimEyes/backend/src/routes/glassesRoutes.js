// backend/src/routes/glassesRoutes.js
import express from 'express';
import Glass from '../models/Glass.js';
import {
  addGlass,
  getAllGlasses,
  getGlassById,
  updateGlass,
  deleteGlass,
  getRecommendations,
  getRandomRecommendations, // ✅ Import ajouté
} from '../controllers/glassController.js';

const router = express.Router();

// Ajouter une nouvelle lunette
router.post('/', addGlass);

// Récupérer toutes les lunettes
router.get('/', getAllGlasses);

// Obtenir des recommandations de lunettes en fonction du profil utilisateur
router.post('/recommendations', getRecommendations);

// ✅ Récupérer 3 suggestions aléatoires pour la page /recommandations
router.get('/recommendations', getRandomRecommendations);

// Récupérer une seule lunette par ID
router.get('/:id', getGlassById);

// Mettre à jour une lunette
router.put('/:id', updateGlass);

// Supprimer une lunette
router.delete('/:id', deleteGlass);

// ➕ Récupérer toutes les catégories distinctes de lunettes
router.get('/check/categories', async (req, res) => {
  try {
    const categories = await Glass.distinct('category');
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error });
  }
});

export default router;
