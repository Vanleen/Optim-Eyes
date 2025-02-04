import { useState } from "react";
import { mockProducts } from "../api/mockApi";

const categories = ["Tout", "Homme", "Femme", "Enfant", "Solaire", "Écolo"];

const Catalogue = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tout");

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts =
    selectedCategory === "Tout"
      ? mockProducts
      : mockProducts.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Catalogue de Montures</h2>

        {/* Filtres */}
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md font-medium transition ${
                selectedCategory === category
                  ? "bg-[#C7C0AE] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price} €</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
