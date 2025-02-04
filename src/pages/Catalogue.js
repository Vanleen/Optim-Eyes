import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api/mockApi";
import catalogueImage from "../assets/images/catalogue.jpg";
import { FiCamera, FiHeart } from "react-icons/fi"; // 📷❤️ Icônes Caméra & Coeur

const filtersByCategory = {
  optique: ["Femme", "Homme", "Enfant", "Mixte", "Écolo"],
  solaire: ["Femme", "Homme", "Enfant"],
};

const sortingOptions = ["En vedette", "Meilleures ventes", "Prix : faible à élevé", "Prix : élevé à faible"];

const Catalogue = () => {
  const { category } = useParams();
  const selectedCategory = category ? category.toLowerCase() : "";

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("En vedette");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      const filtered = data.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory)
      );
      setProducts(filtered);
    });
  }, [selectedCategory]);

  // ✅ Gérer le filtre (Femme, Homme, etc.)
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // ✅ Gérer le tri (prix, vedette, etc.)
  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
    setShowSortMenu(false);
  };

  // ✅ Gérer les favoris (icone cœur)
  const toggleLike = (id) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // ✅ Filtrer les produits selon la sélection
  const filteredProducts = filter
    ? products.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : products;

  return (
    <section className="pt-[140px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        {/* ✅ Titre de la page */}
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6 capitalize">
          {selectedCategory || "Catalogue"}
        </h1>

        {/* ✅ Image sous le bandeau promo */}
        <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-12">
          <img src={catalogueImage} alt="Catalogue" className="w-full h-full object-cover" />
        </div>

        {/* ✅ Section Filtres & Tri */}
        <div className="flex justify-between items-center mb-8">
          {/* 🟢 Filtres sur le côté gauche */}
          <div className="w-1/4">
            <h3 className="text-lg font-semibold mb-3">Filtrer par :</h3>
            <div className="space-y-2">
              {filtersByCategory[selectedCategory]?.map((f) => (
                <button
                  key={f}
                  className={`block text-lg font-medium px-4 py-2 w-full text-left ${
                    filter === f ? "underline text-[#ffaf50]" : "text-black"
                  } hover:text-[#ffaf50]`}
                  onClick={() => handleFilterChange(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* 🟡 Tri à droite */}
          <div className="relative">
            <button
              className="text-lg font-medium flex items-center space-x-2 text-black border px-4 py-2 rounded-md"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <span className="font-semibold">Trier par :</span> <span>{sort}</span>
              <span className="ml-2">▼</span>
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-48 z-50">
                {sortingOptions.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />

                {/* 🔹 Icône Caméra avec texte "ESSAYER" */}
                <div className="absolute top-1 left-3 flex items-center group">
                  <FiCamera className="text-gray-700 text-2xl group-hover:text-gray-900" />
                  <span className="ml-2 text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    ESSAYER
                  </span>
                </div>

                {/* 🔹 Icône cœur pour liker (positionné en bas à droite) */}
                <button
                  className={`absolute bottom-3 right-3 text-xl ${
                    likedProducts.includes(product.id) ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={() => toggleLike(product.id)}
                >
                  <FiHeart />
                </button>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price} €</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun produit disponible.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
