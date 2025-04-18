import asyncHandler from 'express-async-handler';
import Recommendation from '../models/Recommendation.js';
import Glass          from '../models/Glass.js';

// POST  /api/recommendations
// Crée ou met à jour les préférences de l’utilisateur connecté
export const createPreferences = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { budget, correction, style, category, gender, marquesPreferees } = req.body;

  if (!budget || !correction || !style || !category || !gender) {
    res.status(400);
    throw new Error('Budget, correction, style, catégorie et genre sont obligatoires.');
  }

  await Recommendation.findOneAndUpdate(
    { userId },
    { budget, correction, style, category, gender, marquesPreferees },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ message: 'Préférences enregistrées' });
});

// GET   /api/recommendations
// Récupère jusqu’à 5 lunettes filtrées selon les préférences de l’utilisateur
export const getPreferences = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const prefs  = await Recommendation.findOne({ userId });
  if (!prefs) {
    return res.status(404).json({ message: 'Aucune préférence trouvée' });
  }

  // 1) Budget
  const maxBudget = parseInt(prefs.budget.match(/\d+/)?.[0] || '0', 10);
  const priceFilter = prefs.budget.includes('moins')
    ? { price: { $lt: maxBudget } }
    : {};

  // 2) Récupère toutes les montures dans le budget
  let glasses = await Glass.find(priceFilter).select(
    'name brand price description imageUrl category gender'
  );

  // 3) Filtre par catégorie + genre
  glasses = glasses.filter(g =>
    g.category?.toLowerCase() === prefs.category.toLowerCase() &&
    g.gender?.toLowerCase()   === prefs.gender.toLowerCase()
  );

  // 4) Filtre marques préférées (si renseignées)
  if (prefs.marquesPreferees?.length) {
    glasses = glasses.filter(g => prefs.marquesPreferees.includes(g.brand));
  }

  // 5) Limite à 5 éléments
  const limited = glasses.slice(0, 5);

  res.json(limited);
});
