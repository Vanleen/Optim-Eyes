import asyncHandler from 'express-async-handler';
import Recommendation from '../models/Recommendation.js';
import Glass from '../models/Glass.js';

// POST /api/recommendations
// Crée ou met à jour les préférences de l’utilisateur connecté
export const createPreferences = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { budget, correction, style, marquesPreferees } = req.body;

  // Validation minimale
  if (!budget || !correction || !style) {
    res.status(400);
    throw new Error('Budget, correction et style sont obligatoires.');
  }

  // Upsert des préférences
  await Recommendation.findOneAndUpdate(
    { userId },
    { budget, correction, style, marquesPreferees },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ message: 'Préférences enregistrées' });
});

// GET /api/recommendations
// Récupère les recommandations pour l’utilisateur connecté
export const getPreferences = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const prefs = await Recommendation.findOne({ userId });
  if (!prefs) {
    return res.status(404).json({ message: 'Aucune préférence trouvée' });
  }

  // Filtre sur le budget
  const maxBudget = parseInt(prefs.budget.match(/\d+/)?.[0] || '0', 10);
  const priceFilter = prefs.budget.includes('moins')
    ? { price: { $lt: maxBudget } }
    : {};

  // Recherche des montures
  let glasses = await Glass.find(priceFilter).select(
    'name brand price description imageUrl'
  );

  // Filtre sur les marques préférées
  if (prefs.marquesPreferees?.length) {
    glasses = glasses.filter(g => prefs.marquesPreferees.includes(g.brand));
  }

  res.json(glasses);
});
