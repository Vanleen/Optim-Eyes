// frontend/src/pages/CoupDeCoeur.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCamera, FiHeart } from "react-icons/fi";
import { fetchAllGlasses } from "../api/glassesApi";

const categories = [
  { name: "Optique", filters: ["Femme", "Homme", "Enfant", "Mixte"] },
  { name: "Solaire", filters: ["Femme", "Homme", "Enfant", "Mixte"] },
  { name: "Ecolo", filters: ["Mixte", "Mixte", "Mixte", "Mixte"] },
];

const CoupDeCoeur = () => {
  const [selectedCategory, setSelectedCategory] = useState("Optique");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetchAllGlasses()
      .then((data) => {
        const normalized = selectedCategory.toLowerCase();
        const filtered = data.filter((product) =>
          product.category?.toLowerCase() === normalized
        );

        const subFilters = categories.find((cat) => cat.name === selectedCategory).filters;
        const used = new Set();
        const samples = subFilters
          .map((type) => {
            const product = filtered.find((p) => {
              const sub = (p.subcategory || p.gender)?.toLowerCase();
              return sub === type.toLowerCase() && !used.has(p._id);
            });
            if (product) used.add(product._id);
            return product;
          })
          .filter(Boolean);

        setDisplayedProducts(samples);
      })
      .catch(console.error);
  }, [selectedCategory]);

  const toggleLike = (product) => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = storedFavorites.some((fav) => fav._id === product._id);
    if (exists) {
      storedFavorites = storedFavorites.filter((fav) => fav._id !== product._id);
    } else {
      storedFavorites.push(product);
    }
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setLikedProducts(storedFavorites.map((fav) => fav._id));
  };

  const formatImageUrl = (url) => {
    if (!url) return "/images/default-glass.jpg";
    if (url.startsWith("http")) return url;
    return `https://optim-eyes.onrender.com${url}`;
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Nos Coups de Cœur ❤️</h2>

        <div className="flex justify-center space-x-6 mb-8">
          {categories.map(({ name }) => (
            <button
              key={name}
              className={`text-lg font-medium ${
                selectedCategory === name ? "underline text-[#ffaf50]" : "text-black hover:text-[#ffaf50]"}`
              }
              onClick={() => setSelectedCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <Link
                key={product._id}
                to={`/produit/${product._id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 relative"
              >
                <img
                  src={formatImageUrl(product.imageUrl)}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center group">
                  <FiCamera className="text-gray-700 text-xl group-hover:text-gray-900" />
                  <span className="ml-2 text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    ESSAYER
                  </span>
                </div>
                <button
                  className={`absolute bottom-3 right-3 text-xl ${
                    likedProducts.includes(product._id) ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(product);
                  }}
                >
                  <FiHeart className={likedProducts.includes(product._id) ? "fill-current text-red-500" : ""} />
                </button>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price} €</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">Aucun produit à afficher.</p>
          )}
        </div>

        <Link
          to={`/catalogue/${selectedCategory.toLowerCase()}`}
          className="mt-8 inline-block px-6 py-3 bg-[#ffaf50] text-white font-semibold rounded-md hover:bg-[#e69940] transition"
        >
          Découvrir toutes nos montures
        </Link>
      </div>
    </section>
  );
};

export default CoupDeCoeur;
