import homme1 from "../assets/images/homme1.png";
import femme1 from "../assets/images/femme1.png";
import enfant1 from "../assets/images/enfant1.png";
import solaire1 from "../assets/images/solaire1.png";

const mockProducts = [
  {
    id: 1,
    name: "Lunettes Classiques Homme",
    category: "Homme",
    price: 79.99,
    image: homme1,
    description: "Monture élégante et robuste pour un style intemporel."
  },
  {
    id: 2,
    name: "Lunettes Femme Chic",
    category: "Femme",
    price: 89.99,
    image: femme1,
    description: "Une monture fine et tendance pour un look sophistiqué."
  },
  {
    id: 3,
    name: "Lunettes Enfant Colorées",
    category: "Enfant",
    price: 49.99,
    image: enfant1,
    description: "Lunettes légères et confortables adaptées aux enfants."
  },
  {
    id: 4,
    name: "Lunettes de Soleil Sport",
    category: "Solaire",
    price: 99.99,
    image: solaire1,
    description: "Protection UV et design sportif pour un été parfait."
  }
];

// ✅ Vérifie bien que l'export est EXACTEMENT comme ça :
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};
