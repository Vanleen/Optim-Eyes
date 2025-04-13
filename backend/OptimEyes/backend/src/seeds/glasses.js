// backend/src/seeds/glasses.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Glass from '../models/Glass.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => {
    console.error('❌ Erreur MongoDB : ', err);
    process.exit(1);
  });

const glasses = [
  // Optique Homme
  {
    name: "Lunettes Homme 1",
    brand: "MarqueH",
    price: 79.99,
    description: "Design moderne pour homme.",
    stock: 10,
    imageUrl: "/uploads/homme1.png",
    frameType: "Carré",
    material: "Acétate",
    category: "Optique",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes Homme 2",
    brand: "MarqueH",
    price: 81.99,
    description: "Design moderne pour homme.",
    stock: 10,
    imageUrl: "/uploads/homme2.png",
    frameType: "Carré",
    material: "Acétate",
    category: "Optique",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes Homme 3",
    brand: "MarqueH",
    price: 83.99,
    description: "Design moderne pour homme.",
    stock: 10,
    imageUrl: "/uploads/homme3.png",
    frameType: "Carré",
    material: "Acétate",
    category: "Optique",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes Homme 4",
    brand: "MarqueH",
    price: 85.99,
    description: "Design moderne pour homme.",
    stock: 10,
    imageUrl: "/uploads/homme4.png",
    frameType: "Carré",
    material: "Acétate",
    category: "Optique",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes Homme 5",
    brand: "MarqueH",
    price: 87.99,
    description: "Design moderne pour homme.",
    stock: 10,
    imageUrl: "/uploads/homme5.png",
    frameType: "Carré",
    material: "Acétate",
    category: "Optique",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes Homme 6",
    brand: "MarqueH",
    price: 89.99,
    description: "Design moderne pour homme.",
    stock: 10,
    imageUrl: "/uploads/homme6.png",
    frameType: "Carré",
    material: "Acétate",
    category: "Optique",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes Homme 7",
    brand: "MarqueH",
    price: 91.99,
    description: "Design moderne pour homme.",
    stock: 10,
    imageUrl: "/uploads/homme7.png",
    frameType: "Carré",
    material: "Acétate",
    category: "Optique",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes Homme 8",
    brand: "MarqueH",
    price: 93.99,
    description: "Design moderne pour homme.",
    stock: 10,
    imageUrl: "/uploads/homme8.png",
    frameType: "Carré",
    material: "Acétate",
    category: "Optique",
    gender: "Homme",
    recommendedAge: 30
  },
  
  // Optique Femme
  {
    name: "Lunettes Femme 1",
    brand: "MarqueF",
    price: 89.99,
    description: "Élégance et confort.",
    stock: 10,
    imageUrl: "/uploads/femme1.png",
    frameType: "Papillon",
    material: "Métal",
    category: "Optique",
    gender: "Femme",
    recommendedAge: 28
  },
  {
    name: "Lunettes Femme 2",
    brand: "MarqueF",
    price: 91.99,
    description: "Élégance et confort.",
    stock: 10,
    imageUrl: "/uploads/femme2.png",
    frameType: "Papillon",
    material: "Métal",
    category: "Optique",
    gender: "Femme",
    recommendedAge: 28
  },
  {
    name: "Lunettes Femme 3",
    brand: "MarqueF",
    price: 93.99,
    description: "Élégance et confort.",
    stock: 10,
    imageUrl: "/uploads/femme3.png",
    frameType: "Papillon",
    material: "Métal",
    category: "Optique",
    gender: "Femme",
    recommendedAge: 28
  },
  {
    name: "Lunettes Femme 4",
    brand: "MarqueF",
    price: 95.99,
    description: "Élégance et confort.",
    stock: 10,
    imageUrl: "/uploads/femme4.png",
    frameType: "Papillon",
    material: "Métal",
    category: "Optique",
    gender: "Femme",
    recommendedAge: 28
  },
  {
    name: "Lunettes Femme 5",
    brand: "MarqueF",
    price: 97.99,
    description: "Élégance et confort.",
    stock: 10,
    imageUrl: "/uploads/femme5.png",
    frameType: "Papillon",
    material: "Métal",
    category: "Optique",
    gender: "Femme",
    recommendedAge: 28
  },
  {
    name: "Lunettes Femme 6",
    brand: "MarqueF",
    price: 99.99,
    description: "Élégance et confort.",
    stock: 10,
    imageUrl: "/uploads/femme6.png",
    frameType: "Papillon",
    material: "Métal",
    category: "Optique",
    gender: "Femme",
    recommendedAge: 28
  },
  {
    name: "Lunettes Femme 7",
    brand: "MarqueF",
    price: 101.99,
    description: "Élégance et confort.",
    stock: 10,
    imageUrl: "/uploads/femme7.png",
    frameType: "Papillon",
    material: "Métal",
    category: "Optique",
    gender: "Femme",
    recommendedAge: 28
  },
  {
    name: "Lunettes Femme 8",
    brand: "MarqueF",
    price: 103.99,
    description: "Élégance et confort.",
    stock: 10,
    imageUrl: "/uploads/femme8.png",
    frameType: "Papillon",
    material: "Métal",
    category: "Optique",
    gender: "Femme",
    recommendedAge: 28
  },
  
  // Optique Enfant
  {
    name: "Lunettes Enfant 1",
    brand: "MarqueE",
    price: 49.99,
    description: "Résistantes pour enfants.",
    stock: 15,
    imageUrl: "/uploads/enfant1.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Optique",
    gender: "Enfant",
    recommendedAge: 10
  },
  {
    name: "Lunettes Enfant 2",
    brand: "MarqueE",
    price: 50.99,
    description: "Résistantes pour enfants.",
    stock: 15,
    imageUrl: "/uploads/enfant2.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Optique",
    gender: "Enfant",
    recommendedAge: 10
  },
  {
    name: "Lunettes Enfant 3",
    brand: "MarqueE",
    price: 51.99,
    description: "Résistantes pour enfants.",
    stock: 15,
    imageUrl: "/uploads/enfant3.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Optique",
    gender: "Enfant",
    recommendedAge: 10
  },
  {
    name: "Lunettes Enfant 4",
    brand: "MarqueE",
    price: 52.99,
    description: "Résistantes pour enfants.",
    stock: 15,
    imageUrl: "/uploads/enfant4.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Optique",
    gender: "Enfant",
    recommendedAge: 10
  },
  {
    name: "Lunettes Enfant 5",
    brand: "MarqueE",
    price: 53.99,
    description: "Résistantes pour enfants.",
    stock: 15,
    imageUrl: "/uploads/enfant5.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Optique",
    gender: "Enfant",
    recommendedAge: 10
  },
  {
    name: "Lunettes Enfant 6",
    brand: "MarqueE",
    price: 54.99,
    description: "Résistantes pour enfants.",
    stock: 15,
    imageUrl: "/uploads/enfant6.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Optique",
    gender: "Enfant",
    recommendedAge: 10
  },
  {
    name: "Lunettes Enfant 7",
    brand: "MarqueE",
    price: 55.99,
    description: "Résistantes pour enfants.",
    stock: 15,
    imageUrl: "/uploads/enfant7.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Optique",
    gender: "Enfant",
    recommendedAge: 10
  },
  {
    name: "Lunettes Enfant 8",
    brand: "MarqueE",
    price: 56.99,
    description: "Résistantes pour enfants.",
    stock: 15,
    imageUrl: "/uploads/enfant8.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Optique",
    gender: "Enfant",
    recommendedAge: 10
  },
  
  // Solaire Femme
  {
    name: "Lunettes de Soleil Femme 1",
    brand: "SolaireF",
    price: 99.99,
    description: "Protection UV avec style.",
    stock: 12,
    imageUrl: "/uploads/solaireF1.png",
    frameType: "Oversize",
    material: "Plastique",
    category: "Solaire",
    gender: "Femme",
    recommendedAge: 25
  },
  {
    name: "Lunettes de Soleil Femme 2",
    brand: "SolaireF",
    price: 104.99,
    description: "Protection UV avec style.",
    stock: 12,
    imageUrl: "/uploads/solaireF2.png",
    frameType: "Oversize",
    material: "Plastique",
    category: "Solaire",
    gender: "Femme",
    recommendedAge: 25
  },
  {
    name: "Lunettes de Soleil Femme 3",
    brand: "SolaireF",
    price: 109.99,
    description: "Protection UV avec style.",
    stock: 12,
    imageUrl: "/uploads/solaireF3.png",
    frameType: "Oversize",
    material: "Plastique",
    category: "Solaire",
    gender: "Femme",
    recommendedAge: 25
  },
  {
    name: "Lunettes de Soleil Femme 4",
    brand: "SolaireF",
    price: 114.99,
    description: "Protection UV avec style.",
    stock: 12,
    imageUrl: "/uploads/solaireF4.png",
    frameType: "Oversize",
    material: "Plastique",
    category: "Solaire",
    gender: "Femme",
    recommendedAge: 25
  },
  {
    name: "Lunettes de Soleil Femme 5",
    brand: "SolaireF",
    price: 119.99,
    description: "Protection UV avec style.",
    stock: 12,
    imageUrl: "/uploads/solaireF5.png",
    frameType: "Oversize",
    material: "Plastique",
    category: "Solaire",
    gender: "Femme",
    recommendedAge: 25
  },
  {
    name: "Lunettes de Soleil Femme 6",
    brand: "SolaireF",
    price: 124.99,
    description: "Protection UV avec style.",
    stock: 12,
    imageUrl: "/uploads/solaireF6.png",
    frameType: "Oversize",
    material: "Plastique",
    category: "Solaire",
    gender: "Femme",
    recommendedAge: 25
  },
  
  // Solaire Homme
  {
    name: "Lunettes de Soleil Homme 1",
    brand: "SolaireH",
    price: 105.99,
    description: "Style et protection pour homme.",
    stock: 12,
    imageUrl: "/uploads/solaire1.png",
    frameType: "Sport",
    material: "Métal",
    category: "Solaire",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes de Soleil Homme 2",
    brand: "SolaireH",
    price: 110.99,
    description: "Style et protection pour homme.",
    stock: 12,
    imageUrl: "/uploads/solaire2.png",
    frameType: "Sport",
    material: "Métal",
    category: "Solaire",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes de Soleil Homme 3",
    brand: "SolaireH",
    price: 115.99,
    description: "Style et protection pour homme.",
    stock: 12,
    imageUrl: "/uploads/solaire3.png",
    frameType: "Sport",
    material: "Métal",
    category: "Solaire",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes de Soleil Homme 4",
    brand: "SolaireH",
    price: 120.99,
    description: "Style et protection pour homme.",
    stock: 12,
    imageUrl: "/uploads/solaire4.png",
    frameType: "Sport",
    material: "Métal",
    category: "Solaire",
    gender: "Homme",
    recommendedAge: 30
  },
  {
    name: "Lunettes de Soleil Homme 5",
    brand: "SolaireH",
    price: 125.99,
    description: "Style et protection pour homme.",
    stock: 12,
    imageUrl: "/uploads/solaire5.png",
    frameType: "Sport",
    material: "Métal",
    category: "Solaire",
    gender: "Homme",
    recommendedAge: 30
  },
  
  // Solaire Enfant
  {
    name: "Lunettes de Soleil Enfant 1",
    brand: "SolaireE",
    price: 79.99,
    description: "Solaires ludiques pour enfants.",
    stock: 10,
    imageUrl: "/uploads/solaireE1.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Solaire",
    gender: "Enfant",
    recommendedAge: 8
  },
  {
    name: "Lunettes de Soleil Enfant 2",
    brand: "SolaireE",
    price: 81.99,
    description: "Solaires ludiques pour enfants.",
    stock: 10,
    imageUrl: "/uploads/solaireE2.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Solaire",
    gender: "Enfant",
    recommendedAge: 8
  },
  {
    name: "Lunettes de Soleil Enfant 3",
    brand: "SolaireE",
    price: 83.99,
    description: "Solaires ludiques pour enfants.",
    stock: 10,
    imageUrl: "/uploads/solaireE3.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Solaire",
    gender: "Enfant",
    recommendedAge: 8
  },
  {
    name: "Lunettes de Soleil Enfant 4",
    brand: "SolaireE",
    price: 85.99,
    description: "Solaires ludiques pour enfants.",
    stock: 10,
    imageUrl: "/uploads/solaireE4.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Solaire",
    gender: "Enfant",
    recommendedAge: 8
  },
  {
    name: "Lunettes de Soleil Enfant 5",
    brand: "SolaireE",
    price: 87.99,
    description: "Solaires ludiques pour enfants.",
    stock: 10,
    imageUrl: "/uploads/solaireE5.png",
    frameType: "Ronde",
    material: "Plastique",
    category: "Solaire",
    gender: "Enfant",
    recommendedAge: 8
  },
  
  // Ecolo
  {
    name: "Lunettes Ecolo 1",
    brand: "EcoVision",
    price: 69.99,
    description: "Lunettes écoresponsables.",
    stock: 10,
    imageUrl: "/uploads/ecolo1.png",
    frameType: "Naturel",
    material: "Bois recyclé",
    category: "Ecolo",
    gender: "Mixte",
    subcategory: "Ecologique",
    recommendedAge: 20
  },
  {
    name: "Lunettes Ecolo 2",
    brand: "EcoVision",
    price: 71.99,
    description: "Lunettes écoresponsables.",
    stock: 10,
    imageUrl: "/uploads/ecolo2.png",
    frameType: "Naturel",
    material: "Bois recyclé",
    category: "Ecolo",
    gender: "Mixte",
    subcategory: "Ecologique",
    recommendedAge: 20
  },
  {
    name: "Lunettes Ecolo 3",
    brand: "EcoVision",
    price: 73.99,
    description: "Lunettes écoresponsables.",
    stock: 10,
    imageUrl: "/uploads/ecolo3.png",
    frameType: "Naturel",
    material: "Bois recyclé",
    category: "Ecolo",
    gender: "Mixte",
    subcategory: "Ecologique",
    recommendedAge: 20
  },
  {
    name: "Lunettes Ecolo 4",
    brand: "EcoVision",
    price: 75.99,
    description: "Lunettes écoresponsables.",
    stock: 10,
    imageUrl: "/uploads/ecolo4.png",
    frameType: "Naturel",
    material: "Bois recyclé",
    category: "Ecolo",
    gender: "Mixte",
    subcategory: "Ecologique",
    recommendedAge: 20
  },
  {
    name: "Lunettes Ecolo 5",
    brand: "EcoVision",
    price: 77.99,
    description: "Lunettes écoresponsables.",
    stock: 10,
    imageUrl: "/uploads/ecolo5.png",
    frameType: "Naturel",
    material: "Bois recyclé",
    category: "Ecolo",
    gender: "Mixte",
    subcategory: "Ecologique",
    recommendedAge: 20
  },
  {
    name: "Lunettes Ecolo 6",
    brand: "EcoVision",
    price: 79.99,
    description: "Lunettes écoresponsables.",
    stock: 10,
    imageUrl: "/uploads/ecolo6.png",
    frameType: "Naturel",
    material: "Bois recyclé",
    category: "Ecolo",
    gender: "Mixte",
    subcategory: "Ecologique",
    recommendedAge: 20
  },
  
  // Mixte
  {
    name: "Lunettes Mixte 1",
    brand: "MixOptic",
    price: 79.99,
    description: "Style universel et moderne.",
    stock: 10,
    imageUrl: "/uploads/mixte1.png",
    frameType: "Rectangle",
    material: "Acétate",
    category: "Optique",
    gender: "Mixte",
    recommendedAge: 35
  },
  {
    name: "Lunettes Mixte 2",
    brand: "MixOptic",
    price: 81.99,
    description: "Style universel et moderne.",
    stock: 10,
    imageUrl: "/uploads/mixte2.png",
    frameType: "Rectangle",
    material: "Acétate",
    category: "Optique",
    gender: "Mixte",
    recommendedAge: 35
  },
  {
    name: "Lunettes Mixte 3",
    brand: "MixOptic",
    price: 83.99,
    description: "Style universel et moderne.",
    stock: 10,
    imageUrl: "/uploads/mixte3.png",
    frameType: "Rectangle",
    material: "Acétate",
    category: "Optique",
    gender: "Mixte",
    recommendedAge: 35
  },
  {
    name: "Lunettes Mixte 4",
    brand: "MixOptic",
    price: 85.99,
    description: "Style universel et moderne.",
    stock: 10,
    imageUrl: "/uploads/mixte4.png",
    frameType: "Rectangle",
    material: "Acétate",
    category: "Optique",
    gender: "Mixte",
    recommendedAge: 35
  }
  
];

const seedDatabase = async () => {
  try {
    await Glass.deleteMany();
    await Glass.insertMany(glasses);
    console.log('🎉 Données insérées avec succès !');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur lors du seed :', err);
    process.exit(1);
  }
};

seedDatabase();
