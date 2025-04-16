// backend/src/controllers/glassController.js
import Glass from '../models/Glass.js';

// ✅ Ajouter une nouvelle lunette
export const addGlass = async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      description,
      stock,
      imageUrl,
      frameType,
      material,
      category,
      gender,
      recommendedAge,
    } = req.body;

    if (!name || !brand || !price || !description || !stock || !category) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
    }

    const glass = await Glass.create({
      name,
      brand,
      price,
      description,
      stock,
      imageUrl,
      frameType,
      material,
      category,
      gender,
      recommendedAge,
    });

    res.status(201).json(glass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Récupérer toutes les lunettes
export const getAllGlasses = async (req, res) => {
  try {
    const glasses = await Glass.find();
    res.json(glasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Récupérer une seule lunette par ID
export const getGlassById = async (req, res) => {
  try {
    const glass = await Glass.findById(req.params.id);
    if (!glass) {
      return res.status(404).json({ message: 'Lunette non trouvée' });
    }
    res.json(glass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mettre à jour une lunette
export const updateGlass = async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      description,
      stock,
      imageUrl,
      frameType,
      material,
      category,
      gender,
      recommendedAge,
    } = req.body;

    const glass = await Glass.findById(req.params.id);
    if (!glass) {
      return res.status(404).json({ message: 'Lunette non trouvée' });
    }

    glass.name = name || glass.name;
    glass.brand = brand || glass.brand;
    glass.price = price || glass.price;
    glass.description = description || glass.description;
    glass.stock = stock || glass.stock;
    glass.imageUrl = imageUrl || glass.imageUrl;
    glass.frameType = frameType || glass.frameType;
    glass.material = material || glass.material;
    glass.category = category || glass.category;
    glass.gender = gender || glass.gender;
    glass.recommendedAge = recommendedAge || glass.recommendedAge;

    const updatedGlass = await glass.save();
    res.json(updatedGlass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Supprimer une lunette
export const deleteGlass = async (req, res) => {
  try {
    const glass = await Glass.findById(req.params.id);
    if (!glass) {
      return res.status(404).json({ message: 'Lunette non trouvée' });
    }

    await glass.deleteOne();
    res.json({ message: 'Lunette supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Recommandations personnalisées (via chatbot POST)
export const getRecommendations = async (req, res) => {
  try {
    const { gender, age, category } = req.body;
    let query = {};

    if (gender) {
      query.gender = { $in: ['Mixte', gender] };
    }

    if (age) {
      query.recommendedAge = { $lte: age };
    }

    if (category) {
      query.category = category;
    }

    const recommendedGlasses = await Glass.find(query).limit(5);
    res.json(recommendedGlasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Obtenir 3 lunettes aléatoires pour la page /recommandations
export const getRandomRecommendations = async (req, res) => {
  try {
    const glasses = await Glass.find().limit(50);
    const shuffled = glasses.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    res.status(200).json(selected);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des recommandations.' });
  }
};
