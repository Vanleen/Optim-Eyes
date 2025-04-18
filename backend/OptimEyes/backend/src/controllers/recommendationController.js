import asyncHandler from 'express-async-handler';
import Recommendation from '../models/Recommendation.js';
import Glass from '../models/Glass.js';

// POST /api/recommendations
// Enregistre les préférences utilisateur
export const createPreferences = asyncHandler(async (req, res) => {
  const { userId, budget, correction, style, marquesPreferees } = req.body;

  // Supprimer d'éventuelles anciennes prefs pour cet user
  await Recommendation.deleteMany({ userId });

  const prefs = await Recommendation.create({
    userId, budget, correction, style, marquesPreferees
  });

  res.status(201).json({ message: 'Préférences enregistrées' });
});

// GET /api/recommendations/:userId
// Retourne les lunettes compatibles selon les prefs
export const getPreferences = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const prefs = await Recommendation.findOne({ userId });
  if (!prefs) {
    return res.status(404).json({ message: 'Aucune préférence trouvée' });
  }

  // Exemple de logique simplifiée : filtrer les Glass par budget et style
  // (à adapter selon ton modèle Glass)
  const query = {
    price: prefs.budget.includes('moins') 
      ? { $lt: parseInt(prefs.budget.match(/\d+/)[0], 10) }
      : {},
    style: prefs.style
  };

  let glasses = await Glass.find(query).select('name brand price description imageUrl');

  // Optionnel : filtrer par marquesPreferees
  if (prefs.marquesPreferees.length) {
    glasses = glasses.filter(g => prefs.marquesPreferees.includes(g.brand));
  }

  res.json(glasses);
});
