// backend/src/controllers/recommendationController.js
import asyncHandler from 'express-async-handler';
import Preference   from '../models/Preference.js';
import Glass        from '../models/Glass.js';

// POST /api/recommendations
// Crée ou met à jour les préférences de l’utilisateur connecté
export const createPreferences = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { budget, correction, style, category, gender, marquesPreferees } = req.body;

  if (!budget || !correction || !style) {
    res.status(400);
    throw new Error('Budget, correction et style sont obligatoires.');
  }

  // Upsert des préférences
  const prefs = await Preference.findOneAndUpdate(
    { userId },
    { budget, correction, style, category, gender, marquesPreferees },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ message: 'Préférences enregistrées', prefs });
});

// GET /api/recommendations/:userId
// ou GET /api/recommendations pour l’utilisateur connecté
// Récupère les recommandations selon les prefs
export const getPreferences = asyncHandler(async (req, res) => {
  // supporte à la fois /api/recommendations/:userId et le token
  const userId = req.params.userId || req.user._id;
  const prefs  = await Preference.findOne({ userId });
  if (!prefs) {
    return res.status(404).json({ message: 'Aucune préférence trouvée' });
  }

  // Filtre budget
  const maxBudget = parseInt(prefs.budget.match(/\d+/)?.[0] || '0', 10);
  const priceFilter = prefs.budget.includes('moins')
    ? { price: { $lt: maxBudget } }
    : {};

  let glasses = await Glass.find(priceFilter).select(
    'name brand price description imageUrl'
  );

  // Filtre catégorie et genre
  if (prefs.category) {
    glasses = glasses.filter(g => g.category?.toLowerCase() === prefs.category.toLowerCase());
  }
  if (prefs.gender) {
    glasses = glasses.filter(g => g.gender?.toLowerCase() === prefs.gender.toLowerCase());
  }

  // Filtre sur les marques préférées
  if (prefs.marquesPreferees?.length) {
    glasses = glasses.filter(g => prefs.marquesPreferees.includes(g.brand));
  }

  res.json(glasses);
});
