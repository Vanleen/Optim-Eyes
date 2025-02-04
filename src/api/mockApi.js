import homme1 from "../assets/images/homme1.png";
import homme2 from "../assets/images/homme2.png";
import homme3 from "../assets/images/homme3.png";
import homme4 from "../assets/images/homme4.png";

import femme1 from "../assets/images/femme1.png";
import femme2 from "../assets/images/femme2.png";
import femme3 from "../assets/images/femme3.png";
import femme4 from "../assets/images/femme4.png";

import enfant1 from "../assets/images/enfant1.png";
import enfant2 from "../assets/images/enfant2.png";
import enfant3 from "../assets/images/enfant3.png";
import enfant4 from "../assets/images/enfant4.png";

import solaire1 from "../assets/images/solaire1.png";
import solaire2 from "../assets/images/solaire2.png";
import solaire3 from "../assets/images/solaire3.png";
import solaire4 from "../assets/images/solaire4.png";

import ecolo1 from "../assets/images/ecolo1.png";
import ecolo2 from "../assets/images/ecolo2.png";
import ecolo3 from "../assets/images/ecolo3.png";
import ecolo4 from "../assets/images/ecolo4.png";

const mockProducts = [
  // 🟢 4 produits Homme
  { id: 1, name: "Lunettes Homme 1", category: "Homme", price: 79.99, image: homme1 },
  { id: 2, name: "Lunettes Homme 2", category: "Homme", price: 85.99, image: homme2 },
  { id: 3, name: "Lunettes Homme 3", category: "Homme", price: 90.00, image: homme3 },
  { id: 4, name: "Lunettes Homme 4", category: "Homme", price: 72.50, image: homme4 },

  // 🟣 4 produits Femme
  { id: 5, name: "Lunettes Femme 1", category: "Femme", price: 89.99, image: femme1 },
  { id: 6, name: "Lunettes Femme 2", category: "Femme", price: 95.99, image: femme2 },
  { id: 7, name: "Lunettes Femme 3", category: "Femme", price: 100.00, image: femme3 },
  { id: 8, name: "Lunettes Femme 4", category: "Femme", price: 78.50, image: femme4 },

  // 🔵 4 produits Enfant
  { id: 9, name: "Lunettes Enfant 1", category: "Enfant", price: 49.99, image: enfant1 },
  { id: 10, name: "Lunettes Enfant 2", category: "Enfant", price: 55.99, image: enfant2 },
  { id: 11, name: "Lunettes Enfant 3", category: "Enfant", price: 60.00, image: enfant3 },
  { id: 12, name: "Lunettes Enfant 4", category: "Enfant", price: 52.50, image: enfant4 },

  // 🟠 4 produits Solaire
  { id: 13, name: "Lunettes de Soleil 1", category: "Solaire", price: 99.99, image: solaire1 },
  { id: 14, name: "Lunettes de Soleil 2", category: "Solaire", price: 105.99, image: solaire2 },
  { id: 15, name: "Lunettes de Soleil 3", category: "Solaire", price: 110.00, image: solaire3 },
  { id: 16, name: "Lunettes de Soleil 4", category: "Solaire", price: 95.50, image: solaire4 },

  // 🟢 4 produits Ecolo
  { id: 17, name: "Lunettes Ecolo 1", category: "Ecolo", price: 69.99, image: ecolo1 },
  { id: 18, name: "Lunettes Ecolo 2", category: "Ecolo", price: 74.99, image: ecolo2 },
  { id: 19, name: "Lunettes Ecolo 3", category: "Ecolo", price: 79.99, image: ecolo3 },
  { id: 20, name: "Lunettes Ecolo 4", category: "Ecolo", price: 72.50, image: ecolo4 },
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};
