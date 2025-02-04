import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/mockApi";
import { FiCamera } from "react-icons/fi"; // 📷 Icône caméra

const categories = [
  { name: "Optique", filter: ["Homme", "Femme"] },
  { name: "Solaire", filter: ["Solaire"] },
  { name: "Enfant", filter: ["Enfant"] },
  { name: "Écolo", filter: ["Ecolo"] }
];

const CoupDeCoeur = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      if (!selectedCategory) {
        // 🟢 Par défaut : 1 produit par catégorie
        const defaultProducts = [
          data.find((p) => p.category === "Femme"),
          data.find((p) => p.category === "Solaire"),
          data.find((p) => p.category === "Enfant"),
          data.find((p) => p.category === "Ecolo")
        ].filter(Boolean);
        setDisplayedProducts(defaultProducts);
      } else {
        // 🔹 Sélectionner 2 modèles Femme + 2 modèles Homme pour Optique
        if (selectedCategory === "Optique") {
          const hommes = data.filter((p) => p.category === "Homme").slice(0, 2);
          const femmes = data.filter((p) => p.category === "Femme").slice(0, 2);
          setDisplayedProducts([...hommes, ...femmes]);
        } else {
          // 🔹 Sinon, prendre 4 produits de la catégorie sélectionnée
          const filteredProducts = data
            .filter((p) => categories.find((c) => c.name === selectedCategory)?.filter.includes(p.category))
            .slice(0, 4);
          setDisplayedProducts(filteredProducts);
        }
      }
    });
  }, [selectedCategory]);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Nos Coups de Cœur ❤️</h2>

        {/* 🟡 Menu des catégories */}
        <div className="flex justify-center space-x-6 mb-8">
          {categories.map(({ name }) => (
            <button
              key={name}
              className={`text-lg font-medium ${
                selectedCategory === name ? "underline text-[#ffaf50]" : "text-black hover:text-[#ffaf50]"
              }`}
              onClick={() => setSelectedCategory(name === selectedCategory ? null : name)}
            >
              {name}
            </button>
          ))}
        </div>

        {/* 🟢 Affichage des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {displayedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/produit/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 relative"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />

              {/* 🔹 Icône Caméra + Texte ESSAYER au survol */}
              <div className="absolute top-2 left-2 flex items-center group">
                <FiCamera className="text-gray-700 text-xl group-hover:text-gray-900" />
                <span className="ml-2 text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  ESSAYER
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price} €</p>
              </div>
            </Link>
          ))}
        </div>

        {/* 🔹 Bouton Voir toutes les montures */}
        <Link
          to="/catalogue"
          className="mt-10 inline-block px-6 py-3 bg-[#ffaf50] text-white font-semibold rounded-md hover:bg-[#b3a693] transition"
        >
          Découvrir toutes nos montures
        </Link>
      </div>
    </section>
  );
};

export default CoupDeCoeur;
