import asyncHandler from 'express-async-handler';
import Glass from '../models/Glass.js';

export const getAIRecommendations = asyncHandler(async (req, res) => {
  const { age, gender, category, faceShape } = req.body;

  const allGlasses = await Glass.find();

  const scored = allGlasses.map(glass => {
    let score = 0;

    // 1. Âge : +1 si proche
    if (typeof age === 'number' && typeof glass.recommendedAge === 'number') {
      const ageDiff = Math.abs(glass.recommendedAge - age);
      if (ageDiff <= 5) score += 3;
      else if (ageDiff <= 10) score += 2;
      else if (ageDiff <= 15) score += 1;
    }

    // 2. Genre : +2 si exact, +1 si mixte
    if (gender && glass.gender) {
      if (glass.gender === gender) score += 2;
      else if (glass.gender === 'Mixte') score += 1;
    }

    // 3. Catégorie : +3 si exacte
    if (category && glass.category === category) {
      score += 3;
    }

    // 4. Forme de visage : match intelligent avec frameType
    if (faceShape && glass.frameType) {
      const shapeMatch = {
        'ovale': ['Carré', 'Rectangle'],
        'ronde': ['Carré', 'Rectangle'],
        'carré': ['Ronde', 'Aviator'],
        'longue': ['Ronde', 'Papillon'],
        'cœur': ['Aviator', 'Papillon']
      };

      if (shapeMatch[faceShape]?.includes(glass.frameType)) {
        score += 2;
      }
    }

    return { ...glass._doc, score };
  });

  const sorted = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (sorted.length === 0) {
    return res.status(200).json({ message: 'Aucune recommandation trouvée.' });
  }

  res.status(200).json(sorted);
});
